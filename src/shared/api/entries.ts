"use server";

import { createClient } from "@/shared/utils/supabase/server";
import { FiltrationType } from "@/shared/data/entries-table-filters.data";
import { endOfDay, parseISO, startOfDay } from "date-fns";
import { EntryRequestData } from "@/shared/types";

export async function getEntriesRequest(
  isSortAsc: boolean,
  filter: { type?: FiltrationType; value?: string },
) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user && user.id) {
    const isTagFilterActive =
      filter.type === FiltrationType.Tag && filter.value !== "none";

    let query = supabase
      .from("entries")
      .select(
        `
      id,
      created_at,
      title,
      methodology:methodologies(title),
      tags:entries_tags${isTagFilterActive ? "!inner" : ""}(
        tag:tags(id, value)
      )`,
      )
      .eq("user_id", user.id)
      .order("created_at", { ascending: isSortAsc }); // новые сверху

    if (filter.type === FiltrationType.Methodology && filter.value !== "none") {
      query = query.eq("methodology_id", filter.value);
    }

    if (isTagFilterActive) {
      query = query.eq("entries_tags.tag_id", filter.value);
    }

    if (filter.type === FiltrationType.Date && filter.value) {
      // Парсим пришедшую дату (например, '2022-08-07') в объект Date:
      const parsed = parseISO(filter.value);
      // Получаем начало и конец дня (локальное время)
      const startDate = startOfDay(parsed).toISOString();
      const endDate = endOfDay(parsed).toISOString();

      // Применяем диапазон для запроса
      query = query.gte("created_at", startDate).lte("created_at", endDate);
    }

    const { data, error } = await query.overrideTypes<
      {
        id: any;
        created_at: any;
        title: any;
        methodology: { title: any }; // перезаписываем тип возвращаемых данных из-за генерации типизации ide (думает что methodology это массив)
        tags: { tag: { value: any } }[];
      }[]
    >();

    if (error) {
      return { data: [], error };
    }

    return { data, error: null };
  }

  return { data: [], error: new Error("Пользователь не авторизован") };
}

export async function getFilterValuesRequest() {
  const supabase = await createClient();

  const [methodologies, tags] = await Promise.all([
    supabase.from("methodologies").select("id, title"),
    supabase.from("tags").select("*"),
  ]);

  return {
    methodologies: { data: methodologies.data, error: methodologies.error },
    tags: { data: tags.data, error: tags.error },
  };
}

export async function getCurrentEntryRequest(id: string) {
  const supabase = await createClient();

  let query = supabase
    .from("entries")
    .select(
      `
      id,
      title,
      methodology:methodologies(id),
      tags:entries_tags(
        tag:tags(id, value)
      ),
      steps:entries_steps(id, value, step_id)`,
    )
    .eq("id", id)
    .single()
    .overrideTypes<{
      id: any;
      title: any;
      methodology: { id: any }; // перезаписываем тип возвращаемых данных из-за генерации типизации ide (думает что methodology это массив)
      tags: { tag: { id: any; value: any } }[];
      steps: { id: any; value: any; step_id: any }[];
    }>();

  const { data, error } = await query;

  if (error) {
    return { data: null, error };
  }

  return { data, error: null };
}

export async function createEntryRequest(formData: EntryRequestData) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    // 1. Создание основной записи
    const { data: entry, error: entryError } = await supabase
      .from("entries")
      .insert([
        {
          user_id: user.id,
          title: formData.title,
          methodology_id: formData.methodologyId,
        },
      ])
      .select("id");

    if (entryError) return { data: null, error: entryError };
    const entryId = entry[0].id;

    // 2. Привязка тегов
    for (const tag of formData.tags) {
      let tagId = tag.id;

      // Если id нет, создаём тег
      if (!tagId) {
        const { data: newTag, error: newTagError } = await supabase
          .from("tags")
          .insert([{ value: tag.value }])
          .select("id");

        if (newTagError) return { data: null, error: newTagError };
        tagId = newTag[0].id;
      }

      // Вставляем связь тега с записью
      const { error: entriesTagError } = await supabase
        .from("entries_tags")
        .insert([{ entry_id: entryId, tag_id: tagId, user_id: user.id }]);

      if (entriesTagError) return { data: null, error: entriesTagError };
    }

    // 3. Добавление шагов
    const stepsData = formData.steps.map((step) => ({
      entry_id: entryId,
      value: step.value,
      step_id: step.id,
      user_id: user.id,
    }));

    const { error: entryStepsError } = await supabase
      .from("entries_steps")
      .insert(stepsData);

    if (entryStepsError) return { data: null, error: entryStepsError };

    return { data: entryId, error: entryError };
  }

  return { data: null, error: new Error("Пользователь не авторизован") };
}

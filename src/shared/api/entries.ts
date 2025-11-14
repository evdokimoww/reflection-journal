"use server";

import { createClient } from "@/shared/utils/supabase/server";
import { FiltrationType } from "@/shared/data/entries-table-filters.data";
import { endOfDay, parseISO, startOfDay } from "date-fns";
import {
  CreateEntryRequestData,
  EntryStep,
  UpdateEntryRequestData,
} from "@/shared/types";

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
        id: string;
        created_at: string;
        title: string;
        methodology: { title: string }; // перезаписываем тип возвращаемых данных из-за генерации типизации ide (думает что methodology это массив)
        tags: { tag: { value: string } }[];
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
      id: string;
      title: string;
      methodology: { id: string }; // перезаписываем тип возвращаемых данных из-за генерации типизации ide (думает что methodology это массив)
      tags: { tag: { id: string; value: string } }[];
      steps: { id: string; value: string; step_id: string }[];
    }>();

  const { data, error } = await query;

  if (error) {
    return { data: null, error };
  }

  return { data, error: null };
}

export async function createEntryRequest(formData: CreateEntryRequestData) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user)
    return { data: null, error: new Error("Пользователь не авторизован") };

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

export async function removeEntryRequest(entryId: string) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user)
    return { data: null, error: new Error("Пользователь не авторизован") };

  // 1. Удалить связи запись-теги
  const { error: tagsError } = await supabase
    .from("entries_tags")
    .delete()
    .eq("entry_id", entryId)
    .eq("user_id", user.id);

  if (tagsError) return { data: null, error: tagsError };

  // 2. Удалить шаги записи
  const { error: stepsError } = await supabase
    .from("entries_steps")
    .delete()
    .eq("entry_id", entryId)
    .eq("user_id", user.id);

  if (stepsError) return { data: null, error: stepsError };

  // 3. Удалить саму запись
  const { error: entryError } = await supabase
    .from("entries")
    .delete()
    .eq("id", entryId)
    .eq("user_id", user.id);

  if (entryError) return { data: null, error: entryError };

  return { data: true, error: null };
}

export async function updateEntryRequest(
  formData: UpdateEntryRequestData,
  currentSteps: EntryStep[],
) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user)
    return { data: null, error: new Error("Пользователь не авторизован") };

  // 1. Обновление основной записи
  const { error: entryError } = await supabase
    .from("entries")
    .update({
      title: formData.title,
    })
    .eq("id", formData.id);
  if (entryError) return { data: null, error: entryError };

  // 2. Получаем текущие связи тегов
  const { data: currentTags, error: currentTagsError } = await supabase
    .from("entries_tags")
    .select("tag_id")
    .eq("entry_id", formData.id)
    .eq("user_id", user.id);

  if (currentTagsError) return { data: null, error: currentTagsError };
  const currentTagIds: string[] = currentTags.map(
    (t: { tag_id: string }) => t.tag_id,
  );

  // 3. Формируем новые id тегов (создавая новые, если требуется)
  const newTagIds: string[] = [];
  for (const tag of formData.tags) {
    let tagId = tag.id || "";

    if (!tagId) {
      const { data: newTag, error: newTagError } = await supabase
        .from("tags")
        .insert([{ value: tag.value }])
        .select("id");

      if (newTagError) return { data: null, error: newTagError };
      tagId = newTag[0].id;
    }

    newTagIds.push(tagId);

    if (!currentTagIds.includes(tagId)) {
      const { error: entriesTagError } = await supabase
        .from("entries_tags")
        .insert([{ entry_id: formData.id, tag_id: tagId, user_id: user.id }]);
      if (entriesTagError) return { data: null, error: entriesTagError };
    }
  }

  // 4. Удаление тегов, которых нет в новом списке
  for (const oldTagId of currentTagIds) {
    if (!newTagIds.includes(oldTagId)) {
      const { error: deleteTagError } = await supabase
        .from("entries_tags")
        .delete()
        .eq("entry_id", formData.id)
        .eq("tag_id", oldTagId)
        .eq("user_id", user.id);
      if (deleteTagError) return { data: null, error: deleteTagError };
    }
  }

  // 5. Обновляем значения шагов entries_steps
  const newSteps: {
    entry_id: string;
    value: string;
    step_id: string;
    user_id: string;
  }[] = [];

  for (const step of formData.steps) {
    // проверяем существует ли связный тег с данной записью
    const stepId: string | undefined = currentSteps.find(
      (s) => s.step_id === step.id,
    )?.id;

    if (stepId) {
      const { error } = await supabase
        .from("entries_steps")
        .update({
          value: step.value, // строка, может быть пустой
        })
        .eq("id", stepId)
        .eq("entry_id", formData.id);

      if (error) return { data: null, error };
    } else {
      newSteps.push({
        entry_id: formData.id,
        value: step.value,
        step_id: step.id,
        user_id: user.id,
      });
    }
  }

  // если есть новые теги для связки с записью то создаем их
  if (newSteps.length) {
    const { error: entryStepsError } = await supabase
      .from("entries_steps")
      .insert(newSteps);

    if (entryStepsError) return { data: null, error: entryStepsError };
  }

  return { data: formData.title, error: null };
}

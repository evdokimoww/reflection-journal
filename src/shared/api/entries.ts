"use server";

import { createClient } from "@/shared/utils/supabase/server";
import { FiltrationType } from "@/shared/data/entries-table-filters.data";
import { endOfDay, parseISO, startOfDay } from "date-fns";

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
        tags: { tag: { id: any; value: any } }[];
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

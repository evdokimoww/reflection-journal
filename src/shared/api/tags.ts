"use server";

import { createClient } from "@/shared/utils/supabase/server";

export async function getTagsRequest(searchString: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("tags")
    .select(
      `
      id,
      value`,
    )
    .ilike("value", `%${searchString.trim().toLowerCase()}%`)
    .limit(5);

  if (error) {
    return { data: null, error };
  }

  return { data, error: null };
}

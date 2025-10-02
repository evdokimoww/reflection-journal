"use server";

import { createClient } from "@/shared/utils/supabase/server";

export async function getMethodologiesRequest() {
  const supabase = await createClient();

  const { data, error } = await supabase.from("methodologies").select(`
      id,
      title,
      short_description,
      description,
      theory,
      steps (*)`);

  if (error) {
    return { data: null, error };
  }

  return { data, error: null };
}

export async function getMethodologyRequest(id: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("methodologies")
    .select(
      `
      id,
      title,
      short_description,
      description,
      theory,
      steps (*)`,
    )
    .eq("id", id)
    .single();

  if (error) {
    return { data: null, error };
  }

  return { data, error: null };
}

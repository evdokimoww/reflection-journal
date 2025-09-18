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
    return { error };
  }

  return data;
}

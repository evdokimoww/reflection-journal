"use server";

import { createClient } from "@/shared/utils/supabase/server.ts";
import { UserInfo } from "@/shared/types";

export async function getUserInfoRequest() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user)
    return { data: null, error: new Error("Пользователь не авторизован") };

  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  if (error) {
    return { data: null, error };
  }

  return { data, error: null };
}

export async function updateUserInfoRequest(formData: UserInfo) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user)
    return { data: null, error: new Error("Пользователь не авторизован") };

  // 1. Обновление основной записи
  const { error: profilesError } = await supabase
    .from("profiles")
    .update({
      name: formData.name,
    })
    .eq("id", user.id);

  if (profilesError) return { data: null, error: profilesError };

  return { data: true, error: null };
}

"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { PAGES } from "@/config/pages.config";
import { IUpdatePasswordForm } from "@/app/auth/update-password/page";
import { IAuthForm, IForgotPasswordForm } from "@/shared/types/auth.types";

export async function signInRequest(formData: IAuthForm) {
  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword(formData);

  if (error) {
    return { error };
  }

  revalidatePath("/", "layout");
  redirect("/");
}

export async function signUpRequest(formData: IAuthForm) {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.signInWithPassword(formData);

  if (error) {
    return { error };
  }

  if (data.user && data.user.identities && data.user.identities.length === 0) {
    return { error: new Error("Пользователь с таким email уже существует") };
  }

  revalidatePath("/", "layout");
  redirect("/");
}

export async function forgotPasswordRequest(formData: IForgotPasswordForm) {
  const supabase = await createClient();

  const { error } = await supabase.auth.resetPasswordForEmail(formData.email, {
    redirectTo: `${location.origin}${PAGES.UPDATE_PASSWORD}`,
  });

  if (error) {
    return { error };
  }

  return { error: null };
}

export async function updatePasswordRequest(formData: IUpdatePasswordForm) {
  const supabase = await createClient();

  const { error } = await supabase.auth.updateUser(formData);
  if (error) {
    return { error };
  }

  return { error: null };
}

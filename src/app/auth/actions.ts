"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { IAuthForm } from "@/app/auth/page";
import { IForgotPasswordForm } from "@/app/auth/forgot-password/page";
import { PAGES } from "@/config/pages.config";
import { IUpdatePasswordForm } from "@/app/auth/update-password/page";

export async function signIn(formData: IAuthForm) {
  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword(formData);

  if (error) {
    return { error };
  }

  revalidatePath("/", "layout");
  redirect("/");
}

export async function signUp(formData: IAuthForm) {
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

export async function forgotPassword(formData: IForgotPasswordForm) {
  const supabase = await createClient();

  const { error } = await supabase.auth.resetPasswordForEmail(formData.email, {
    redirectTo: `${location.origin}${PAGES.UPDATE_PASSWORD}`,
  });

  if (error) {
    return { error };
  }

  return { error: null };
}

export async function updatePassword(formData: IUpdatePasswordForm) {
  const supabase = await createClient();

  const { error } = await supabase.auth.updateUser(formData);
  if (error) {
    return { error };
  }

  return { error: null };
}

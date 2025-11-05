"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/shared/utils/supabase/server";
import { PAGES } from "@/shared/constants.ts";
import {
  AuthForm,
  ForgotPasswordForm,
  UpdatePasswordForm,
} from "@/shared/types";
import type { NextRequest } from "next/server";
import type { EmailOtpType } from "@supabase/supabase-js";

export async function signInRequest(formData: AuthForm) {
  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword(formData);

  if (error) {
    return { error };
  }

  revalidatePath("/", "layout");
  redirect("/");
}

export async function signUpRequest(formData: AuthForm) {
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

export async function forgotPasswordRequest(formData: ForgotPasswordForm) {
  const supabase = await createClient();

  const { error } = await supabase.auth.resetPasswordForEmail(formData.email, {
    redirectTo: `${location.origin}${PAGES.UPDATE_PASSWORD}`,
  });

  if (error) {
    return { error };
  }

  return { error: null };
}

export async function updatePasswordRequest(formData: UpdatePasswordForm) {
  const supabase = await createClient();

  const { error } = await supabase.auth.updateUser(formData);
  if (error) {
    return { error };
  }

  return { error: null };
}

export async function confirmEmailRequest(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const token_hash = searchParams.get("token_hash");
  const type = searchParams.get("type") as EmailOtpType | null;
  const next = searchParams.get("next") ?? "/";
  if (token_hash && type) {
    const supabase = await createClient();
    const { error } = await supabase.auth.verifyOtp({
      type,
      token_hash,
    });
    if (!error) {
      // redirect user to specified redirect URL or root of app
      redirect(next);
    }
  }
  // redirect the user to an error page with some instructions
  redirect("/error");
}

export async function signOutRequest() {
  const supabase = await createClient();

  const { error } = await supabase.auth.signOut();

  if (error) {
    return { error };
  }

  redirect("/auth");
}

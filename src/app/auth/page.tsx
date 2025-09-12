"use client";

import { AuthForm } from "@/components/auth/AuthForm";
import { AuthMode } from "@/shared/types/auth.types";
import { SubmitHandler, useForm } from "react-hook-form";
import { useAuthStore } from "@/stores/auth-store-provider";
import { toaster } from "@/components/ui/toaster";
import { AuthError } from "@supabase/auth-js";
import { signIn, signUp } from "@/app/auth/actions";

export interface IAuthForm {
  email: string;
  password: string;
}

export default function AuthPage() {
  const { authMode, setAuthMode, isLoading, setIsLoading } = useAuthStore(
    (state) => state,
  );
  const {
    control,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm<IAuthForm>({
    mode: "onBlur",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSighUp = async (formData: IAuthForm) => {
    try {
      setIsLoading(true);

      const { error }: { error: Error | null } = await signUp(formData);

      if (error) throw error;
    } catch (error: unknown) {
      if (error instanceof Error) {
        toaster.create({ title: error.message, type: "error" });
        setError("email", { type: "manual" });
      } else {
        console.error("Неизвестная ошибка", error);
        toaster.create({ title: "Неизвестная ошибка", type: "error" });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSighIn = async (formData: IAuthForm) => {
    try {
      setIsLoading(true);
      const { error }: { error: AuthError | null } = await signIn(formData);

      if (error) throw error;
    } catch (error: unknown) {
      if (error instanceof Error && error.name === "AuthApiError") {
        toaster.create({
          title: "Ошибка авторизации. Неверный логин или пароль",
          type: "error",
        });
        setError("email", { type: "manual" });
        setError("password", { type: "manual" });
      } else {
        console.error("Неизвестная ошибка", error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit: SubmitHandler<IAuthForm> = async (formData) => {
    if (authMode === AuthMode.Registration) {
      await handleSighUp(formData);
    }

    if (authMode === AuthMode.Login) {
      await handleSighIn(formData);
    }
  };

  const handleChangeAuthMode = (authMode: AuthMode) => {
    reset();
    setAuthMode(authMode);
  };

  return (
    <AuthForm
      authMode={authMode}
      onChangeAuthMode={handleChangeAuthMode}
      onFormSubmit={handleSubmit(onSubmit)}
      control={control}
      formErrors={errors}
      isLoading={isLoading}
    />
  );
}

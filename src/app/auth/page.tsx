"use client";

import { AuthForm } from "@/components/auth/AuthForm";
import { AuthMode, type IAuthForm } from "@/shared/types/auth.types";
import { SubmitHandler, useForm } from "react-hook-form";
import { useAuthStore } from "@/stores/auth-store-provider";
import { useEffect } from "react";
import { createToastError } from "@/utils/utils";

export default function AuthPage() {
  const { authMode, setAuthMode, isLoading, error, fetchSignUp, fetchSignIn } =
    useAuthStore((state) => state);

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

  useEffect(() => {
    if (error) {
      if (error.name === "AuthApiError") {
        createToastError("Ошибка авторизации. Неверный логин или пароль");
        setError("email", { type: "manual" });
        setError("password", { type: "manual" });
        return;
      }

      createToastError(error);
      setError("email", { type: "manual" });
    }
  }, [error]);

  const handleSighUp = async (formData: IAuthForm) => {
    await fetchSignUp(formData);
  };

  const handleSighIn = async (formData: IAuthForm) => {
    await fetchSignIn(formData);
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

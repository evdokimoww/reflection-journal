"use client";

import { AuthFormComponent } from "@/components/auth/AuthFormComponent.tsx";
import { AuthMode, AuthForm } from "@/shared/types";
import { SubmitHandler, useForm } from "react-hook-form";
import { useEffect } from "react";
import { createToastError } from "@/shared/utils/utils";
import {
  useAuthActions,
  useAuthError,
  useAuthMode,
  useIsAuthLoading,
} from "@/shared/stores/auth/hooks";

export default function AuthPage() {
  const { setAuthMode, fetchSignUp, fetchSignIn } = useAuthActions();
  const authMode = useAuthMode();
  const isLoading = useIsAuthLoading();
  const error = useAuthError();

  const {
    control,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm<AuthForm>({
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
  }, [error, setError]);

  const handleSighUp = (formData: AuthForm) => {
    fetchSignUp(formData);
  };

  const handleSighIn = (formData: AuthForm) => {
    fetchSignIn(formData);
  };

  const onSubmit: SubmitHandler<AuthForm> = (formData) => {
    if (authMode === AuthMode.Registration) {
      handleSighUp(formData);
    }

    if (authMode === AuthMode.Login) {
      handleSighIn(formData);
    }
  };

  const handleChangeAuthMode = (authMode: AuthMode) => {
    reset();
    setAuthMode(authMode);
  };

  return (
    <AuthFormComponent
      authMode={authMode}
      onChangeAuthMode={handleChangeAuthMode}
      onFormSubmit={handleSubmit(onSubmit)}
      control={control}
      formErrors={errors}
      isLoading={isLoading}
    />
  );
}

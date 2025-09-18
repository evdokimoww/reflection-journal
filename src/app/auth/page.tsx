"use client";

import { AuthForm } from "@/components/auth/AuthForm";
import { AuthMode, type IAuthForm } from "@/shared/types/auth.types";
import { SubmitHandler, useForm } from "react-hook-form";
import { useAuthStore } from "@/shared/stores/auth-store-provider";
import { useEffect } from "react";
import { createToastError } from "@/shared/utils/utils";
import { useShallow } from "zustand/shallow";

interface IAuthSelector {
  authMode: AuthMode;
  setAuthMode: (mode: AuthMode) => void;
  isLoading: boolean;
  error: Error | null;
  fetchSignUp: (formData: IAuthForm) => Promise<void>;
  fetchSignIn: (formData: IAuthForm) => Promise<void>;
}

export default function AuthPage() {
  const { authMode, setAuthMode, isLoading, error, fetchSignUp, fetchSignIn } =
    useAuthStore<IAuthSelector>(
      useShallow((state) => ({
        authMode: state.authMode,
        setAuthMode: state.setAuthMode,
        isLoading: state.isLoading,
        error: state.error,
        fetchSignUp: state.fetchSignUp,
        fetchSignIn: state.fetchSignIn,
      })),
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

  const handleSighUp = (formData: IAuthForm) => {
    fetchSignUp(formData);
  };

  const handleSighIn = (formData: IAuthForm) => {
    fetchSignIn(formData);
  };

  const onSubmit: SubmitHandler<IAuthForm> = (formData) => {
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

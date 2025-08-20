"use client";

import { useState } from "react";
import { AuthForm } from "@/app/auth/AuthForm";
import { AuthMode } from "@/shared/types/auth.types";
import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";

export interface FormValues {
  username: string;
  password: string;
}

export default function AuthPage() {
  const [authMode, setAuthMode] = useState<AuthMode>(AuthMode.Login);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = (data) => console.log(data);

  const onError: SubmitErrorHandler<FormValues> = (errors) =>
    console.log(errors);

  const handleFormSubmit = () => handleSubmit(onSubmit, onError);

  return (
    <AuthForm
      authMode={authMode}
      setAuthMode={setAuthMode}
      onFormSubmit={handleFormSubmit}
      formRegister={register}
      formErrors={errors}
    />
  );
}

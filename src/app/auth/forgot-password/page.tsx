"use client";

import { useForm } from "react-hook-form";
import { ForgotPasswordFormComponent } from "@/components/auth/ForgotPasswordFormComponent.tsx";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { createToastError } from "@/shared/utils/utils";
import {
  useAuthActions,
  useAuthError,
  useIsAuthLoading,
} from "@/shared/stores/auth/hooks";
import { ForgotPasswordForm } from "@/shared/types";

export default function ForgotPasswordPage() {
  const { fetchForgotPassword } = useAuthActions();
  const isLoading = useIsAuthLoading();
  const error = useAuthError();

  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordForm>({
    mode: "onBlur",
    defaultValues: {
      email: "",
    },
  });

  useEffect(() => {
    if (error) {
      createToastError(error);
    }
  }, [error]);

  const onSubmit = (formData: ForgotPasswordForm) => {
    fetchForgotPassword(formData);
  };

  const handleBackButtonClick = () => {
    router.back();
  };

  return (
    <ForgotPasswordFormComponent
      onFormSubmit={handleSubmit(onSubmit)}
      control={control}
      formErrors={errors}
      isLoading={isLoading}
      onBackButtonClick={handleBackButtonClick}
    />
  );
}

"use client";

import { useForm } from "react-hook-form";
import { useAuthStore } from "@/stores/auth-store-provider";
import { ForgotPasswordForm } from "@/components/auth/ForgotPasswordForm";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { createToastError } from "@/utils/utils";
import type { IForgotPasswordForm } from "@/shared/types/auth.types";

export default function ForgotPasswordPage() {
  const { isLoading, fetchForgotPassword, error } = useAuthStore(
    (state) => state,
  );
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IForgotPasswordForm>({
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

  const onSubmit = async (formData: IForgotPasswordForm) => {
    await fetchForgotPassword(formData);
  };

  const handleBackButtonClick = () => {
    router.back();
  };

  return (
    <ForgotPasswordForm
      onFormSubmit={handleSubmit(onSubmit)}
      control={control}
      formErrors={errors}
      isLoading={isLoading}
      onBackButtonClick={handleBackButtonClick}
    />
  );
}

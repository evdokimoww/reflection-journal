"use client";

import { useForm } from "react-hook-form";
import { useAuthStore } from "@/shared/stores/auth-store-provider";
import { ForgotPasswordForm } from "@/components/auth/ForgotPasswordForm";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { createToastError } from "@/shared/utils/utils";
import type { IForgotPasswordForm } from "@/shared/types/auth.types";
import { useShallow } from "zustand/shallow";

interface IAuthSelector {
  isLoading: boolean;
  error: Error | null;
  fetchForgotPassword: (formData: IForgotPasswordForm) => Promise<void>;
}
export default function ForgotPasswordPage() {
  const { isLoading, error, fetchForgotPassword } = useAuthStore<IAuthSelector>(
    useShallow((state) => ({
      isLoading: state.isLoading,
      error: state.error,
      fetchForgotPassword: state.fetchForgotPassword,
    })),
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

  const onSubmit = (formData: IForgotPasswordForm) => {
    fetchForgotPassword(formData);
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

"use client";

import { useForm } from "react-hook-form";
import { useAuthStore } from "@/shared/stores/auth-store-provider";
import { UpdatePasswordForm } from "@/components/auth/UpdatePasswordForm";
import type { IUpdatePasswordForm } from "@/shared/types/auth.types";
import { useEffect } from "react";
import { createToastError } from "@/shared/utils/utils";
import { useShallow } from "zustand/shallow";

interface IAuthSelector {
  isLoading: boolean;
  error: Error | null;
  fetchUpdatePassword: (formData: IUpdatePasswordForm) => Promise<void>;
}

export default function UpdatePasswordPage() {
  const { isLoading, error, fetchUpdatePassword } = useAuthStore<IAuthSelector>(
    useShallow((state) => ({
      isLoading: state.isLoading,
      error: state.error,
      fetchUpdatePassword: state.fetchUpdatePassword,
    })),
  );

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IUpdatePasswordForm>({
    mode: "onBlur",
    defaultValues: {
      password: "",
    },
  });

  useEffect(() => {
    if (error) {
      createToastError(error);
    }
  }, [error]);

  const onSubmit = (formData: IUpdatePasswordForm) => {
    fetchUpdatePassword(formData);
  };

  return (
    <UpdatePasswordForm
      onFormSubmit={handleSubmit(onSubmit)}
      control={control}
      formErrors={errors}
      isLoading={isLoading}
    />
  );
}

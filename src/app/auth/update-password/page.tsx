"use client";

import { useForm } from "react-hook-form";
import { useAuthStore } from "@/stores/auth-store-provider";
import { UpdatePasswordForm } from "@/components/auth/UpdatePasswordForm";
import type { IUpdatePasswordForm } from "@/shared/types/auth.types";
import { useEffect } from "react";
import { createToastError } from "@/utils/utils";

export default function UpdatePasswordPage() {
  const { isLoading, error, fetchUpdatePassword } = useAuthStore(
    (state) => state,
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

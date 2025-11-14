"use client";

import { useForm } from "react-hook-form";
import { UpdatePasswordFormComponent } from "@/components/auth/UpdatePasswordFormComponent.tsx";
import { UpdatePasswordForm } from "@/shared/types";
import { useEffect } from "react";
import { createToastError } from "@/shared/utils/utils";
import {
  useAuthActions,
  useAuthError,
  useIsAuthLoading,
} from "@/shared/stores/auth/hooks";

export default function UpdatePasswordPage() {
  const { fetchUpdatePassword } = useAuthActions();
  const isLoading = useIsAuthLoading();
  const error = useAuthError();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdatePasswordForm>({
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

  const onSubmit = (formData: UpdatePasswordForm) => {
    fetchUpdatePassword(formData);
  };

  return (
    <UpdatePasswordFormComponent
      onFormSubmit={handleSubmit(onSubmit)}
      control={control}
      formErrors={errors}
      isLoading={isLoading}
    />
  );
}

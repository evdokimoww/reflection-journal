"use client";

import { useForm } from "react-hook-form";
import { useAuthStore } from "@/stores/auth-store-provider";
import { toaster } from "@/components/ui/toaster";
import { AuthError } from "@supabase/auth-js";
import { updatePassword } from "@/app/auth/actions";
import { UpdatePasswordForm } from "@/components/auth/UpdatePasswordForm";

export interface IUpdatePasswordForm {
  password: string;
}

export default function UpdatePasswordPage() {
  const { isLoading, setIsLoading } = useAuthStore((state) => state);
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

  const onSubmit = async (formData: IUpdatePasswordForm) => {
    try {
      setIsLoading(true);
      const { error }: { error: AuthError | null } =
        await updatePassword(formData);

      if (error) throw error;
    } catch (error: unknown) {
      if (error instanceof Error) {
        toaster.create({ title: error.message, type: "error" });
      } else {
        console.error("Неизвестная ошибка", error);
      }
    } finally {
      setIsLoading(false);
    }
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

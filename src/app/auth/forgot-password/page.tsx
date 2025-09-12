"use client";

import { useForm } from "react-hook-form";
import { useAuthStore } from "@/stores/auth-store-provider";
import { toaster } from "@/components/ui/toaster";
import { AuthError } from "@supabase/auth-js";
import { forgotPassword } from "@/app/auth/actions";
import { ForgotPasswordForm } from "@/components/auth/ForgotPasswordForm";
import { useRouter } from "next/navigation";

export interface IForgotPasswordForm {
  email: string;
}

export default function ForgotPasswordPage() {
  const { isLoading, setIsLoading } = useAuthStore((state) => state);
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

  const onSubmit = async (formData: IForgotPasswordForm) => {
    try {
      setIsLoading(true);
      const { error }: { error: AuthError | null } =
        await forgotPassword(formData);

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

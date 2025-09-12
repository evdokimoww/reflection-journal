import {
  Control,
  Controller,
  FieldErrors,
  FieldValues,
  Path,
} from "react-hook-form";
import { Field } from "@chakra-ui/react";
import React from "react";
import { PasswordInput } from "@/components/ui/password-input";

interface IPasswordFormFieldProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  formErrors: FieldErrors<T>;
  isLoading: boolean;
}

export const PasswordFormField = <T extends FieldValues>({
  name,
  control,
  formErrors,
  isLoading,
}: IPasswordFormFieldProps<T>) => {
  return (
    <Controller
      name={name as Path<T>}
      control={control}
      rules={{
        required: "Обязательное поле",
        minLength: {
          value: 6,
          message: "Минимальная длина - 6 символов",
        },
      }}
      render={({ field }) => {
        return (
          <Field.Root invalid={!!formErrors.password} disabled={isLoading}>
            <Field.Label>Пароль</Field.Label>
            <PasswordInput {...field} />
            <Field.ErrorText>
              {formErrors.password?.message as string}
            </Field.ErrorText>
          </Field.Root>
        );
      }}
    />
  );
};

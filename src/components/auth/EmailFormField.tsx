import {
  Control,
  Controller,
  FieldErrors,
  FieldValues,
  Path,
} from "react-hook-form";
import { Field, Input } from "@chakra-ui/react";
import React from "react";

interface IEmailFormFieldProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  formErrors: FieldErrors<T>;
  isLoading: boolean;
}

export const EmailFormField = <T extends FieldValues>({
  name,
  control,
  formErrors,
  isLoading,
}: IEmailFormFieldProps<T>) => {
  return (
    <Controller
      name={name as Path<T>}
      control={control}
      rules={{
        required: "Обязательное поле",
        pattern: {
          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
          message: "Некорректный email",
        },
      }}
      render={({ field }) => {
        return (
          <Field.Root invalid={!!formErrors.email} disabled={isLoading}>
            <Field.Label>E-mail</Field.Label>
            <Input {...field} />
            <Field.ErrorText>
              {formErrors.email?.message as string}
            </Field.ErrorText>
          </Field.Root>
        );
      }}
    />
  );
};

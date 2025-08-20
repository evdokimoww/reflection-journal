import {
  Button,
  Field,
  Flex,
  Input,
  InputProps,
  SegmentGroup,
  Stack,
  Text,
} from "@chakra-ui/react";
import { AuthMode } from "@/shared/types/auth.types";
import { PasswordInput } from "@/components/ui/password-input";
import { FormValues } from "@/app/auth/page";
import { jsx } from "@emotion/react";
import IntrinsicAttributes = jsx.JSX.IntrinsicAttributes;
import { RefAttributes } from "react";
import type { FieldErrors } from "react-hook-form";

type AuthFormProps = {
  authMode: AuthMode;
  setAuthMode: (authMode: AuthMode) => void;
  onFormSubmit: () => void;
  formRegister: (
    fieldName: keyof FormValues,
  ) => IntrinsicAttributes & InputProps & RefAttributes<HTMLInputElement>;
  formErrors: FieldErrors<FormValues>;
};

export function AuthForm({
  authMode,
  setAuthMode,
  onFormSubmit,
  formRegister,
  formErrors,
}: AuthFormProps) {
  return (
    <Flex
      w={{ md: 80 }}
      direction="column"
      justify="space-between"
      align="center"
    >
      <Flex direction="column" justify="center" align="center" w="100%">
        <Text fontSize="2xl" fontWeight="bold" mb="4">
          Reflection Journal
        </Text>
        <SegmentGroup.Root
          defaultValue={authMode}
          size="xs"
          w="fit-content"
          onValueChange={(e) => setAuthMode(e.value as AuthMode)}
          mb="8"
        >
          <SegmentGroup.Indicator />
          <SegmentGroup.Items items={[AuthMode.Login, AuthMode.Registration]} />
        </SegmentGroup.Root>
        <form onSubmit={onFormSubmit} style={{ width: "100%" }}>
          <Flex direction="column" align="center" w="100%" justify="center">
            <Stack gap="4" mb="6" w="100%">
              <Field.Root invalid={!!formErrors.username}>
                <Field.Label>Логин</Field.Label>
                <Input {...formRegister("username")} />
                <Field.ErrorText>
                  {formErrors.username?.message}
                </Field.ErrorText>
              </Field.Root>

              <Field.Root invalid={!!formErrors.password}>
                <Field.Label>Пароль</Field.Label>
                <PasswordInput {...formRegister("password")} />
                <Field.ErrorText>
                  {formErrors.password?.message}
                </Field.ErrorText>
              </Field.Root>
            </Stack>
            <Button type="submit">
              {authMode === AuthMode.Login ? "Войти" : "Зарегистрироваться"}
            </Button>
          </Flex>
        </form>
      </Flex>
    </Flex>
  );
}

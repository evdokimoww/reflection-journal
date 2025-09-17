import { Box, Button, Flex, SegmentGroup, Stack, Text } from "@chakra-ui/react";
import { AuthMode, type IAuthForm } from "@/shared/types/auth.types";
import React from "react";
import { Control, FieldErrors } from "react-hook-form";
import Link from "next/link";
import { PAGES } from "@/config/pages.config";
import { EmailFormField } from "@/components/auth/EmailFormField";
import { PasswordFormField } from "@/components/auth/PasswordFormField";

interface IAuthFormProps {
  authMode: AuthMode;
  onChangeAuthMode: (authMode: AuthMode) => void;
  onFormSubmit: () => void;
  control: Control<IAuthForm>;
  formErrors: FieldErrors<IAuthForm>;
  isLoading: boolean;
}

export function AuthForm({
  authMode,
  onChangeAuthMode,
  onFormSubmit,
  control,
  formErrors,
  isLoading,
}: IAuthFormProps) {
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
          onValueChange={(e) => onChangeAuthMode(e.value as AuthMode)}
          mb="8"
        >
          <SegmentGroup.Indicator />
          <SegmentGroup.Items items={[AuthMode.Login, AuthMode.Registration]} />
        </SegmentGroup.Root>
        <Box w="100%">
          <Flex direction="column" align="center" w="100%" justify="center">
            <Stack gap="4" mb="6" w="100%">
              <EmailFormField<IAuthForm>
                name="email"
                control={control}
                formErrors={formErrors}
                isLoading={isLoading}
              />
              <PasswordFormField<IAuthForm>
                name="password"
                control={control}
                formErrors={formErrors}
                isLoading={isLoading}
              />
              {authMode === AuthMode.Login && (
                <Link href={PAGES.FORGOT_PASSWORD}>
                  <Text
                    color="gray.500"
                    fontSize="sm"
                    textDecoration="underline"
                  >
                    Забыли пароль?
                  </Text>
                </Link>
              )}
            </Stack>
            <Button type="submit" onClick={onFormSubmit} loading={isLoading}>
              {authMode === AuthMode.Login ? "Войти" : "Зарегистрироваться"}
            </Button>
          </Flex>
        </Box>
      </Flex>
    </Flex>
  );
}

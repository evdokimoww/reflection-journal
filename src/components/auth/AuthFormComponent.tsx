import { Box, Button, Flex, SegmentGroup, Stack, Text } from "@chakra-ui/react";
import { AuthMode, AuthForm } from "@/shared/types";
import React from "react";
import { Control, FieldErrors } from "react-hook-form";
import Link from "next/link";
import { EmailFormField } from "@/components/auth/EmailFormField";
import { PasswordFormField } from "@/components/auth/PasswordFormField";
import { PAGES } from "@/shared/constants.ts";

interface Props {
  authMode: AuthMode;
  onChangeAuthMode: (authMode: AuthMode) => void;
  onFormSubmit: () => void;
  control: Control<AuthForm>;
  formErrors: FieldErrors<AuthForm>;
  isLoading: boolean;
}

export function AuthFormComponent({
  authMode,
  onChangeAuthMode,
  onFormSubmit,
  control,
  formErrors,
  isLoading,
}: Props) {
  return (
    <Flex
      w="100%"
      maxW={{ base: "100%", sm: "22rem", md: "26rem" }}
      direction="column"
      justify="space-between"
      align="center"
      px={{ base: 4, sm: 0 }}
    >
      <Flex direction="column" justify="center" align="center" w="100%">
        <Text
          fontSize={{ base: "xl", md: "2xl" }}
          fontWeight="bold"
          mb={{ base: 3, md: 4 }}
          textAlign="center"
        >
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
            <Stack
              gap={{ base: 3, md: 4 }}
              mb={{ base: 4, md: 6 }}
              w="100%"
            >
              <EmailFormField<AuthForm>
                name="email"
                control={control}
                formErrors={formErrors}
                isLoading={isLoading}
              />
              <PasswordFormField<AuthForm>
                name="password"
                control={control}
                formErrors={formErrors}
                isLoading={isLoading}
              />
              {authMode === AuthMode.Login && (
                <Link href={PAGES.FORGOT_PASSWORD}>
                  <Text
                    color="gray.500"
                    fontSize={{ base: "xs", md: "sm" }}
                    textDecoration="underline"
                  >
                    Забыли пароль?
                  </Text>
                </Link>
              )}
            </Stack>
            <Button
              type="submit"
              onClick={onFormSubmit}
              loading={isLoading}
              w="100%"
              size={{ base: "sm", md: "md" }}
            >
              {authMode === AuthMode.Login ? "Войти" : "Зарегистрироваться"}
            </Button>
          </Flex>
        </Box>
      </Flex>
    </Flex>
  );
}

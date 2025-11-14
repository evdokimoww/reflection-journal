import { Box, Button, Flex, Stack, Text } from "@chakra-ui/react";
import React from "react";
import { Control, FieldErrors } from "react-hook-form";
import { EmailFormField } from "@/components/auth/EmailFormField";
import { ForgotPasswordForm } from "@/shared/types";

interface Props {
  onFormSubmit: () => void;
  control: Control<ForgotPasswordForm>;
  formErrors: FieldErrors<ForgotPasswordForm>;
  isLoading: boolean;
  onBackButtonClick: () => void;
}

export function ForgotPasswordFormComponent({
  onFormSubmit,
  control,
  formErrors,
  isLoading,
  onBackButtonClick,
}: Props) {
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
        <Text fontSize="sm" mb="4" textAlign="center">
          Забыли пароль?
          <br />
          Укажите ваш e-mail для восстановления
        </Text>
        <Box w="100%">
          <Flex direction="column" align="center" w="100%" justify="center">
            <Stack gap="4" mb="6" w="100%">
              <EmailFormField<ForgotPasswordForm>
                name="email"
                control={control}
                formErrors={formErrors}
                isLoading={isLoading}
              />
            </Stack>
            <Button
              type="submit"
              onClick={onFormSubmit}
              loading={isLoading}
              mb="4"
            >
              Восстановить
            </Button>
            <Button
              variant="surface"
              size="xs"
              onClick={onBackButtonClick}
              disabled={isLoading}
            >
              &#8592; Назад
            </Button>
          </Flex>
        </Box>
      </Flex>
    </Flex>
  );
}

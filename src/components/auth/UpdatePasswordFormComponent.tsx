import { Box, Button, Flex, Stack, Text } from "@chakra-ui/react";
import React from "react";
import { Control, FieldErrors } from "react-hook-form";
import { PasswordFormField } from "@/components/auth/PasswordFormField";
import { UpdatePasswordForm } from "@/shared/types";

interface Props {
  onFormSubmit: () => void;
  control: Control<UpdatePasswordForm>;
  formErrors: FieldErrors<UpdatePasswordForm>;
  isLoading: boolean;
}

export function UpdatePasswordFormComponent({
  onFormSubmit,
  control,
  formErrors,
  isLoading,
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
          Введите новый пароль
        </Text>
        <Box w="100%">
          <Flex direction="column" align="center" w="100%" justify="center">
            <Stack gap="4" mb="6" w="100%">
              <PasswordFormField<IUpdatePasswordProps>
                name="password"
                control={control}
                formErrors={formErrors}
                isLoading={isLoading}
              />
            </Stack>
            <Button type="submit" onClick={onFormSubmit} loading={isLoading}>
              Обновить пароль
            </Button>
          </Flex>
        </Box>
      </Flex>
    </Flex>
  );
}

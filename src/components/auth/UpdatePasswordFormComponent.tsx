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
        <Text
          fontSize={{ base: "sm", md: "md" }}
          mb={{ base: 4, md: 5 }}
          textAlign="center"
        >
          Введите новый пароль
        </Text>
        <Box w="100%">
          <Flex direction="column" align="center" w="100%" justify="center">
            <Stack
              gap={{ base: 3, md: 4 }}
              mb={{ base: 4, md: 6 }}
              w="100%"
            >
              <PasswordFormField<UpdatePasswordForm>
                name="password"
                control={control}
                formErrors={formErrors}
                isLoading={isLoading}
              />
            </Stack>
            <Button
              type="submit"
              onClick={onFormSubmit}
              loading={isLoading}
              w="100%"
              size={{ base: "sm", md: "md" }}
            >
              Обновить пароль
            </Button>
          </Flex>
        </Box>
      </Flex>
    </Flex>
  );
}

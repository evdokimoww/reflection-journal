"use client";

import React, { useEffect, useMemo } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Field, Flex, Input } from "@chakra-ui/react";
import { FormActionBar } from "@/components/entry-form/FormActionBar.tsx";
import {
  useIsProfileLoading,
  useProfileActions,
  useProfileFormInitValues,
} from "@/shared/stores/profile/hooks.ts";
import { Loader } from "@/components/public/Loader.tsx";
import { createToastSuccess } from "@/shared/utils/utils.ts";

interface ProfileForm {
  email: string;
  name: string;
}

export default function ProfilePage() {
  const { updateUserInfo } = useProfileActions();
  const isLoading = useIsProfileLoading();
  const profile = useProfileFormInitValues();

  const defaultValues = {
    email: "",
    name: "",
  };

  const { control, handleSubmit, reset, watch } = useForm<ProfileForm>({
    mode: "onBlur",
    defaultValues,
  });

  useEffect(() => {
    if (profile) {
      reset(profile);
    }
  }, [profile, reset]);

  const currentFormValues = watch();

  const isFormDirty = useMemo(() => {
    if (!profile) return false;
    return profile.name !== currentFormValues.name;
  }, [currentFormValues, profile]);

  const handleFormSubmit: SubmitHandler<ProfileForm> = (data) => {
    updateUserInfo(data, createToastSuccess);
  };

  const handleFormRevert = () => {
    reset(profile || defaultValues);
  };

  return (
    <>
      {isLoading && <Loader />}
      <Flex direction="column" maxW="500px" gap="6">
        <Controller
          name="email"
          control={control}
          render={({ field }) => {
            return (
              <Field.Root disabled>
                <Field.Label>E-mail</Field.Label>
                <Input size="lg" {...field} />
              </Field.Root>
            );
          }}
        />
        <Controller
          name="name"
          control={control}
          render={({ field }) => {
            return (
              <Field.Root>
                <Field.Label>Ваше имя</Field.Label>
                <Input size="lg" {...field} />
              </Field.Root>
            );
          }}
        />
      </Flex>
      {isFormDirty && (
        <FormActionBar
          isEditForm
          onFormClean={reset}
          onFormRevert={handleFormRevert}
          onFormSubmit={handleSubmit(handleFormSubmit)}
        />
      )}
    </>
  );
}

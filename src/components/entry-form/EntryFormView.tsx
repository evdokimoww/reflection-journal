import {
  Box,
  Field,
  Flex,
  Icon,
  Input,
  Text,
  Textarea,
} from "@chakra-ui/react";
import type { IMethodology, IStep } from "@/shared/types/methodologies.types";
import Question from "@/shared/assets/icons/question.svg";
import Image from "next/image";
import React, { RefObject } from "react";
import { ToggleTip } from "@/components/ui/toggle-tip";
import { Control, Controller, FieldErrors } from "react-hook-form";
import { IForm } from "@/components/entry-form/EntryForm";
import { MethodologyFormDialog } from "@/components/entry-form/MethodologyFormDialog";
import { TagsComponent } from "@/components/entry-form/TagsComponent";
import { ITag } from "@/shared/types/entry.types";

interface IProps {
  methodology: IMethodology;
  control: Control<IForm>;
  errors: FieldErrors<IForm>;
  tagInputRef: RefObject<HTMLInputElement>;
  onTagsSearch: (value: string) => void;
  isTagsLoading: boolean;
  searchedTags: ITag[];
}

export function EntryFormView({
  methodology,
  control,
  errors,
  tagInputRef,
  onTagsSearch,
  isTagsLoading,
  searchedTags,
}: IProps) {
  return (
    <Flex direction="column" maxW="1200px" gap="6">
      <Controller
        name="title"
        control={control}
        rules={{
          required: "Обязательное поле",
          minLength: {
            value: 5,
            message: "Минимальная длина - 5 символов",
          },
        }}
        render={({ field }) => {
          return (
            <Field.Root invalid={!!errors?.title}>
              <Field.Label>Заголовок</Field.Label>
              <Input size="lg" {...field} />
              {!!errors?.title && (
                <Field.ErrorText>{errors?.title.message}</Field.ErrorText>
              )}
            </Field.Root>
          );
        }}
      />
      <Controller
        name="tags"
        control={control}
        render={({ field }) => {
          const { value, onChange } = field;

          return (
            <TagsComponent
              tags={value}
              onFormChange={onChange}
              tagInputRef={tagInputRef}
              onTagsSearch={onTagsSearch}
              isTagsLoading={isTagsLoading}
              searchedTags={searchedTags}
            />
          );
        }}
      />
      {methodology.description && (
        <Flex
          gap="4"
          width="100%"
          justify="space-between"
          align="center"
          mb="4"
        >
          <Text fontSize="sm" color="gray.600">
            {methodology.description}
          </Text>
          {methodology.theory && (
            <MethodologyFormDialog
              title={methodology.title}
              text={methodology.theory}
            />
          )}
        </Flex>
      )}
      {methodology.steps.map((step: IStep, index: number) => (
        <Flex key={step.id} gap="4" width="100%" justify="space-between">
          <Flex gap="2" w="220px">
            {step?.hint && (
              <ToggleTip
                content={step.hint}
                positioning={{ placement: "top-start" }}
                size="lg"
              >
                <Flex
                  w="20px"
                  h="20px"
                  borderRadius="full"
                  bg="gray.200"
                  justify="center"
                  align="center"
                  cursor="pointer"
                >
                  <Icon size="lg">
                    <Image src={Question} alt="Logo" width={20} height={20} />
                  </Icon>
                </Flex>
              </ToggleTip>
            )}

            <Box>
              <Text fontWeight="bold" fontSize="md">
                {step?.question}
              </Text>
              {step?.description && (
                <Text fontSize="xs" color="gray.600">
                  {step.description}
                </Text>
              )}
            </Box>
          </Flex>
          <Controller
            name={`steps.${index}.value`}
            control={control}
            render={({ field }) => {
              return <Textarea size="lg" {...field} />;
            }}
          />
        </Flex>
      ))}
    </Flex>
  );
}

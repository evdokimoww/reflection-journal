import {
  Box,
  Field,
  Flex,
  Icon,
  Input,
  Text,
  Textarea,
} from "@chakra-ui/react";
import Question from "@/shared/assets/icons/question.svg";
import Image from "next/image";
import React, { RefObject } from "react";
import { ToggleTip } from "@/components/ui/toggle-tip";
import { Control, Controller, FieldErrors } from "react-hook-form";
import { EntryForm } from "@/components/entry-form/EntryForm";
import { MethodologyFormDialog } from "@/components/entry-form/MethodologyFormDialog";
import { TagsComponent } from "@/components/entry-form/TagsComponent";
import { Methodology, Step, TagItem } from "@/shared/types";

interface Props {
  methodology: Methodology;
  control: Control<EntryForm>;
  errors: FieldErrors<EntryForm>;
  tagInputRef: RefObject<HTMLInputElement>;
  onTagsSearch: (value: string) => void;
  isTagsLoading: boolean;
  searchedTags: TagItem[];
}

export function EntryFormView({
  methodology,
  control,
  errors,
  tagInputRef,
  onTagsSearch,
  isTagsLoading,
  searchedTags,
}: Props) {
  return (
    <Flex direction="column" maxW={{ base: "100%", lg: "1200px" }} gap={{ base: 4, md: 6 }}>
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
              <Input size={{ base: "md", md: "lg" }} {...field} />
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
          gap={{ base: 2, md: 4 }}
          width="100%"
          direction={{ base: "column", md: "row" }}
          justify="space-between"
          align={{ base: "flex-start", md: "center" }}
          mb={{ base: 3, md: 4 }}
        >
          <Text fontSize={{ base: "xs", md: "sm" }} color="gray.600">
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
      {methodology.steps.map((step: Step, index: number) => (
        <Flex
          key={step.id}
          gap={{ base: 3, md: 4 }}
          width="100%"
          direction={{ base: "column", md: "row" }}
          justify="space-between"
        >
          <Flex gap="2" w={{ base: "100%", md: "220px" }} flexShrink={0}>
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
                  flexShrink={0}
                >
                  <Icon size="lg">
                    <Image src={Question} alt="Logo" width={20} height={20} />
                  </Icon>
                </Flex>
              </ToggleTip>
            )}

            <Box>
              <Text fontWeight="bold" fontSize={{ base: "sm", md: "md" }}>
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
              return <Textarea size={{ base: "md", md: "lg" }} {...field} />;
            }}
          />
        </Flex>
      ))}
    </Flex>
  );
}

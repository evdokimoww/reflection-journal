import React, { KeyboardEvent, MouseEvent, RefObject } from "react";
import {
  Box,
  Button,
  Field,
  Group,
  HStack,
  Input,
  Tag,
} from "@chakra-ui/react";

interface IProps {
  tags: string[];
  onFormChange: (value: string[]) => void;
  tagInputRef: RefObject<HTMLInputElement>;
}

export function TagsComponent({ tags, onFormChange, tagInputRef }: IProps) {
  const handleTagKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();

      const newTag = e.currentTarget.value;

      if (!tags.includes(newTag)) {
        onFormChange([...tags, e.currentTarget.value]);
      }
      e.currentTarget.value = "";
    }
  };

  const handleAddButtonClick = () => {
    if (tagInputRef.current) {
      const newTag = tagInputRef.current.value;
      if (newTag && !tags.includes(newTag)) {
        onFormChange([...tags, newTag]);
      }
      tagInputRef.current.focus();
      tagInputRef.current.value = "";
    }
  };

  const handleRemoveTagClick = (
    e: MouseEvent<HTMLButtonElement>,
    index: number,
  ) => {
    e.preventDefault();
    const updatedValue = tags.filter((_, i) => i !== index);
    onFormChange(updatedValue);
  };

  return (
    <Box>
      <Field.Root mb="2">
        <Field.Label>Теги (ввод по одному)</Field.Label>
        <Group attached w="full" maxW="sm">
          <Input
            flex="1"
            placeholder="тег"
            onKeyDown={handleTagKeyDown}
            ref={tagInputRef}
          />
          <Button
            bg="bg.subtle"
            variant="outline"
            onClick={handleAddButtonClick}
          >
            Добавить
          </Button>
        </Group>
      </Field.Root>
      <HStack>
        {tags.map((tag, index) => (
          <Tag.Root key={tag}>
            <Tag.Label>{tag}</Tag.Label>
            <Tag.EndElement>
              <Tag.CloseTrigger
                onClick={(e) => handleRemoveTagClick(e, index)}
              />
            </Tag.EndElement>
          </Tag.Root>
        ))}
      </HStack>
    </Box>
  );
}

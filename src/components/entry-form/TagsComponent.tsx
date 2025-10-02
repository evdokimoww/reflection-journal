import React, { KeyboardEvent, MouseEvent, RefObject, useMemo } from "react";
import {
  Box,
  Button,
  CloseButton,
  Field,
  Flex,
  Group,
  HStack,
  Input,
  InputGroup,
  Spinner,
  Tag,
} from "@chakra-ui/react";
import { ITag } from "@/shared/types/entry.types";

interface IProps {
  tags: { id?: string; value: string }[];
  onFormChange: (tags: { id?: string; value: string }[]) => void;
  tagInputRef: RefObject<HTMLInputElement>;
  onTagsSearch: (value: string) => void;
  isTagsLoading: boolean;
  searchedTags: ITag[];
}

export function TagsComponent({
  tags,
  onFormChange,
  tagInputRef,
  onTagsSearch,
  isTagsLoading,
  searchedTags,
}: IProps) {
  const tagsValues = useMemo(() => tags.map((tag) => tag.value), [tags]);

  const filteredSearchedTags = useMemo(() => {
    return searchedTags.filter(({ value }) => !tagsValues.includes(value));
  }, [searchedTags, tagsValues]);

  const handleTagInputClear = () => {
    if (tagInputRef.current) {
      tagInputRef.current.value = "";
      tagInputRef.current.focus();
      onTagsSearch("");
    }
  };

  const handleTagKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();

      const newTag = e.currentTarget.value;

      if (newTag && !tagsValues.includes(newTag)) {
        onFormChange([...tags, { value: newTag }]);
      }

      handleTagInputClear();
    }
  };

  const handleAddButtonClick = () => {
    if (tagInputRef.current) {
      const newTag = tagInputRef.current.value;

      if (newTag && !tagsValues.includes(newTag)) {
        onFormChange([...tags, { value: newTag }]);
      }

      handleTagInputClear();
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

  const handleAddSearchedTag = (changedTag: ITag) => {
    if (tagsValues.includes(changedTag.value)) return;

    onFormChange([...tags, { id: changedTag.id, value: changedTag.value }]);
  };

  const inputClearButton =
    tagInputRef.current && tagInputRef.current.value ? (
      <CloseButton
        size="xs"
        onClick={() => {
          if (tagInputRef.current) {
            handleTagInputClear();
          }
        }}
        me="-2"
      />
    ) : undefined;

  return (
    <Box>
      <Field.Root mb="2">
        <Field.Label>Теги (ввод по одному)</Field.Label>
        <Flex w="full" align="center">
          <Group attached w="full" maxW="sm">
            <InputGroup endElement={inputClearButton}>
              <Input
                flex="1"
                placeholder="тег"
                onKeyDown={handleTagKeyDown}
                ref={tagInputRef}
                onChange={(e) => onTagsSearch(e.target.value)}
              />
            </InputGroup>
          </Group>
          {isTagsLoading ? (
            <Spinner size="sm" ml="4" />
          ) : (
            <Flex gap="2" ml="4" w="full">
              {filteredSearchedTags.length > 0 ? (
                filteredSearchedTags.map((tag) => (
                  <Tag.Root
                    key={tag.id}
                    variant="outline"
                    cursor="pointer"
                    onClick={() => handleAddSearchedTag(tag)}
                  >
                    <Tag.Label>{tag.value}</Tag.Label>
                  </Tag.Root>
                ))
              ) : (
                <>
                  {tagInputRef.current && tagInputRef.current.value && (
                    <Button
                      bg="bg.subtle"
                      variant="outline"
                      onClick={handleAddButtonClick}
                    >
                      Добавить новый тег
                    </Button>
                  )}
                </>
              )}
            </Flex>
          )}
        </Flex>
      </Field.Root>
      <HStack>
        {tags.map((tag, index) => (
          <Tag.Root key={tag.id || index}>
            <Tag.Label>{tag.value}</Tag.Label>
            <Tag.EndElement>
              <Tag.CloseTrigger
                cursor="pointer"
                onClick={(e) => handleRemoveTagClick(e, index)}
              />
            </Tag.EndElement>
          </Tag.Root>
        ))}
      </HStack>
    </Box>
  );
}

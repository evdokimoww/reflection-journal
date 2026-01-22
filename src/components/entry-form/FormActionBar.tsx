import { ActionBar, Button, Flex, Portal } from "@chakra-ui/react";
import React from "react";

interface Props {
  isEditForm: boolean;
  onFormClean: () => void;
  onFormRevert: () => void;
  onFormSubmit: () => void;
}

export function FormActionBar({
  isEditForm,
  onFormClean,
  onFormRevert,
  onFormSubmit,
}: Props) {
  return (
    <ActionBar.Root open>
      <Portal>
        <ActionBar.Positioner>
          <ActionBar.Content p={{ base: 3, md: 4 }}>
            <Flex
              direction={{ base: "column", sm: "row" }}
              gap={{ base: 2, md: 3 }}
              w="100%"
            >
              {isEditForm ? (
                <>
                  <Button
                    size={{ base: "md", md: "md" }}
                    onClick={onFormSubmit}
                    flex={{ base: 1, sm: "none" }}
                    minH={{ base: "44px", md: "auto" }}
                  >
                    Сохранить изменения
                  </Button>
                  <Button
                    variant="subtle"
                    size={{ base: "md", md: "md" }}
                    onClick={onFormRevert}
                    flex={{ base: 1, sm: "none" }}
                    minH={{ base: "44px", md: "auto" }}
                  >
                    Отменить изменения
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    size={{ base: "md", md: "md" }}
                    onClick={onFormSubmit}
                    flex={{ base: 1, sm: "none" }}
                    minH={{ base: "44px", md: "auto" }}
                  >
                    Сохранить
                  </Button>
                  <Button
                    variant="subtle"
                    size={{ base: "md", md: "md" }}
                    onClick={onFormClean}
                    flex={{ base: 1, sm: "none" }}
                    minH={{ base: "44px", md: "auto" }}
                  >
                    Очистить
                  </Button>
                </>
              )}
            </Flex>
          </ActionBar.Content>
        </ActionBar.Positioner>
      </Portal>
    </ActionBar.Root>
  );
}

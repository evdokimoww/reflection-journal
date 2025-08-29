import { ActionBar, Button, Portal } from "@chakra-ui/react";
import React from "react";

interface IProps {
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
}: IProps) {
  return (
    <ActionBar.Root open>
      <Portal>
        <ActionBar.Positioner>
          <ActionBar.Content>
            {isEditForm ? (
              <>
                <Button size="md" onClick={onFormSubmit}>
                  Сохранить изменения
                </Button>
                <Button variant="subtle" size="md" onClick={onFormRevert}>
                  Отменить изменения
                </Button>
              </>
            ) : (
              <>
                <Button size="md" onClick={onFormSubmit}>
                  Сохранить
                </Button>
                <Button variant="subtle" size="md" onClick={onFormClean}>
                  Очистить
                </Button>
              </>
            )}
          </ActionBar.Content>
        </ActionBar.Positioner>
      </Portal>
    </ActionBar.Root>
  );
}

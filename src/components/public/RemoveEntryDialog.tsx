import { Button, Dialog, Portal } from "@chakra-ui/react";

interface Props {
  removeEntry: () => void;
  isRemoveEntryLoading: boolean;
}

export const RemoveEntryDialog = ({
  removeEntry,
  isRemoveEntryLoading,
}: Props) => {
  return (
    <Portal>
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content>
          <Dialog.Header>
            <Dialog.Title>Вы уверены?</Dialog.Title>
          </Dialog.Header>
          <Dialog.Footer>
            <Dialog.ActionTrigger asChild>
              <Button variant="outline" disabled={isRemoveEntryLoading}>
                Отмена
              </Button>
            </Dialog.ActionTrigger>
            <Button
              colorPalette="red"
              onClick={removeEntry}
              disabled={isRemoveEntryLoading}
              loading={isRemoveEntryLoading}
            >
              Удалить
            </Button>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog.Positioner>
    </Portal>
  );
};

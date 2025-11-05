import { Button, Dialog, Portal } from "@chakra-ui/react";

interface Props {
  removeEntry: () => void;
}

export const RemoveEntryDialog = ({ removeEntry }: Props) => {
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
              <Button variant="outline">Отмена</Button>
            </Dialog.ActionTrigger>
            <Button colorPalette="red" onClick={removeEntry}>
              Удалить
            </Button>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog.Positioner>
    </Portal>
  );
};

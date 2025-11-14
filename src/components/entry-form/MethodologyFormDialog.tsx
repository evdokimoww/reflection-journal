import { Button, CloseButton, Dialog, Portal } from "@chakra-ui/react";
import React from "react";

interface Props {
  title: string;
  text: string;
}

export function MethodologyFormDialog({ title, text }: Props) {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button variant="surface">Подробнее о методологии</Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Методология "{title}"</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <p>{text}</p>
            </Dialog.Body>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}

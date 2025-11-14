"use client";

import {
  useIsMethodologiesLoading,
  useMethodologies,
  useMethodologiesActions,
} from "@/shared/stores/methodologies/hooks.ts";
import { useEffect } from "react";
import { Loader } from "@/components/public/Loader.tsx";
import { Avatar, Button, Card, Dialog, Flex } from "@chakra-ui/react";
import { MethodologyItemDialog } from "@/components/methodologies/MethodologyItemDialog.tsx";

export default function MethodologiesPage() {
  const { fetchMethodologies } = useMethodologiesActions();
  const methodologies = useMethodologies();
  const isLoading = useIsMethodologiesLoading();

  useEffect(() => {
    fetchMethodologies();
  }, []);

  return isLoading ? (
    <Loader />
  ) : (
    <Flex gap="4" wrap="wrap">
      {methodologies.map((methodology) => (
        <Card.Root width="320px" key={methodology.id}>
          <Card.Body gap="2">
            <Avatar.Root size="lg" shape="rounded">
              <Avatar.Fallback name={methodology.title} />
            </Avatar.Root>
            <Card.Title mt="2">{methodology.title}</Card.Title>
            <Card.Description>{methodology.short_description}</Card.Description>
          </Card.Body>
          <Card.Footer justifyContent="flex-end">
            <Dialog.Root size="xl">
              <Dialog.Trigger asChild>
                <Button>Подробнее</Button>
              </Dialog.Trigger>
              <MethodologyItemDialog methodology={methodology} />
            </Dialog.Root>
          </Card.Footer>
        </Card.Root>
      ))}
    </Flex>
  );
}

"use client";

import { useEffect } from "react";
import { useMethodologiesStore } from "@/shared/stores/methodologies-store-provider";
import { createToastError } from "@/shared/utils/utils";
import { Avatar, Button, Card, Dialog, Flex } from "@chakra-ui/react";
import { MethodologyItemDialog } from "@/components/methodologies/MethodologyItemDialog";
import { Loader } from "@/components/public/Loader";
import { useShallow } from "zustand/shallow";
import type { IMethodology } from "@/shared/types/methodologies.types";

interface IMethodologiesSelector {
  methodologies: IMethodology[];
  isLoading: boolean;
  error: Error | null;
  fetchMethodologies: () => Promise<void>;
}

export function MethodologiesComponent() {
  const { methodologies, error, isLoading, fetchMethodologies } =
    useMethodologiesStore<IMethodologiesSelector>(
      useShallow((state) => ({
        methodologies: state.methodologies,
        isLoading: state.isLoading,
        error: state.error,
        fetchMethodologies: state.fetchMethodologies,
      })),
    );

  useEffect(() => {
    fetchMethodologies();
  }, []);

  useEffect(() => {
    if (error) {
      createToastError(error);
    }
  }, [error]);

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

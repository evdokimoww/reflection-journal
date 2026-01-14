"use client";

import { MethodologyItemDialog } from "@/components/methodologies/MethodologyItemDialog.tsx";
import { Loader } from "@/components/public/Loader.tsx";
import {
  useIsMethodologiesLoading,
  useMethodologies,
  useMethodologiesActions,
} from "@/shared/stores/methodologies/hooks.ts";
import { Avatar, Box, Button, Card, Dialog, Flex } from "@chakra-ui/react";
import { useEffect } from "react";

export default function MethodologiesPage() {
  const { fetchMethodologies } = useMethodologiesActions();
  const methodologies = useMethodologies();
  const isLoading = useIsMethodologiesLoading();

  useEffect(() => {
    fetchMethodologies();
  }, [fetchMethodologies]);

  return isLoading ? (
    <Loader />
  ) : (
    <Flex
      gap="4"
      wrap="wrap"
      flexDirection={{ base: "column", md: "row" }}
      alignItems={{ base: "center", md: "none" }}
    >
      {methodologies.map((methodology) => (
        <Card.Root width={{ base: "100%", md: "300px" }} key={methodology.id}>
          <Card.Body gap="2">
            <Avatar.Root
              size="lg"
              shape="rounded"
              display={{ base: "none", md: "flex" }}
            >
              <Avatar.Fallback name={methodology.title} />
            </Avatar.Root>
            <Card.Title mt="2">{methodology.title}</Card.Title>
            <Box h="70px">
              <Card.Description
                maxH="70px"
                overflow="hidden"
                textOverflow="ellipsis"
                style={{
                  display: "-webkit-box",
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: "vertical",
                }}
              >
                {methodology.short_description}
              </Card.Description>
            </Box>
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

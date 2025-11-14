"use client";

import { AbsoluteCenter, Button, Flex, Heading, Text } from "@chakra-ui/react";
import React from "react";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  return (
    <AbsoluteCenter>
      <Flex align="flex-start" justify="center" direction="column" gap="4">
        <Heading size="4xl">404 Not found</Heading>
        <Text>Нет страницы лучше в мире, чем 404!</Text>
        <Button onClick={() => router.back()}>&#8592; Назад</Button>
      </Flex>
    </AbsoluteCenter>
  );
}

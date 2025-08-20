"use client";

import { Flex, Text } from "@chakra-ui/react";
import { usePathname } from "next/navigation";

export default function ContentHeader() {
  const pathname = usePathname();

  return (
    <Flex h="20" w="100%" mb="8" align="center">
      <Text fontSize="2xl">Reflection Journal</Text>
    </Flex>
  );
}

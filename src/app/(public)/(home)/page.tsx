import React from "react";
import { AbsoluteCenter, Box, Button, Flex, Text } from "@chakra-ui/react";
import Link from "next/link";
import { PAGES } from "@/shared/constants.ts";

export default function DashboardPage() {
  return (
    <Box position="absolute" h="100%" width="100%" top="0" right="0">
      <AbsoluteCenter>
        <Flex align="center" justify="center" direction="column">
          <Text fontSize="2xl" fontWeight="bold" mb="2">
            Привет, username!
          </Text>
          <Text fontSize="md" mb="4">
            Стрик: 4 дня подряд! Продолжай в том же духе!
          </Text>
          <Link href={PAGES.CREATE_ENTRY}>
            <Button size="lg">+ Новая запись</Button>
          </Link>
        </Flex>
      </AbsoluteCenter>
    </Box>
  );
}

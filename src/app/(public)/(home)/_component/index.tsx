import React from "react";
import {
  Box,
  Button,
  Flex,
  Skeleton,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";
import { PAGES } from "@/shared/constants.ts";

interface Props {
  username: string;
  isProfileLoading: boolean;
}

export function DashboardPageView({ username, isProfileLoading }: Props) {
  return (
    <Box h="100%" width="100%">
      <Flex
        align="center"
        justify="center"
        direction="column"
        h="100%"
        py={{ base: 8, md: 0 }}
      >
        <Flex align="center" justify="center" gap="2" mb="4">
          <Text fontSize="2xl" fontWeight="bold">
            Привет,
          </Text>
          {isProfileLoading ? (
            <Skeleton w="150px" h="6" />
          ) : (
            <Text fontSize="2xl" fontWeight="bold">
              {username}
            </Text>
          )}
        </Flex>
        <Link href={PAGES.CREATE_ENTRY}>
          <Button size="lg">+ Новая запись</Button>
        </Link>
      </Flex>
    </Box>
  );
}

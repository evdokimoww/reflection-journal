import React from "react";
import {
  AbsoluteCenter,
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
    <Box position="absolute" h="100%" width="100%" top="0" right="0">
      <AbsoluteCenter>
        <Flex align="center" justify="center" direction="column">
          <Flex align="center" justify="center" gap="2">
            <Text fontSize="2xl" fontWeight="bold" mb="2">
              Привет,
            </Text>
            {isProfileLoading ? (
              <Skeleton w="150px" h="6" />
            ) : (
              <Text fontSize="2xl" fontWeight="bold" mb="2">
                {username}
              </Text>
            )}
          </Flex>
          <Link href={PAGES.CREATE_ENTRY}>
            <Button size="lg">+ Новая запись</Button>
          </Link>
        </Flex>
      </AbsoluteCenter>
    </Box>
  );
}

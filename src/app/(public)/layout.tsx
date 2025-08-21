import React, { PropsWithChildren } from "react";
import { Box, Flex } from "@chakra-ui/react";
import Sidebar from "@/components/Sidebar";
import ContentHeader from "@/components/ContentHeader";

export default function PublicLayout({ children }: PropsWithChildren<unknown>) {
  return (
    <Flex minH="100vh" w="100%">
      <Sidebar />
      <Box px="8" minH="100vh" w="100%" position="relative">
        <ContentHeader />
        {children}
      </Box>
    </Flex>
  );
}

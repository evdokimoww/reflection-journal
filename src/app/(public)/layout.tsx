"use client";

import React, { PropsWithChildren } from "react";
import { Box, Flex } from "@chakra-ui/react";
import Sidebar from "@/components/public/Sidebar";
import ContentHeader from "@/components/public/ContentHeader";
import { signOut } from "@/app/(public)/actions";
import { toaster } from "@/components/ui/toaster";

export default function PublicLayout({ children }: PropsWithChildren<unknown>) {
  const handleSignOut = async () => {
    const { error } = await signOut();

    if (error) {
      toaster.create({
        title: error.message,
        type: "error",
      });
    }
  };

  return (
    <Flex minH="100vh" w="100%">
      <Sidebar onSignOut={handleSignOut} />
      <Box px="8" minH="100vh" w="100%" position="relative">
        <ContentHeader />
        {children}
      </Box>
    </Flex>
  );
}

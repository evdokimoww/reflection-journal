"use client";

import React, { PropsWithChildren, useEffect } from "react";
import { Box, Flex } from "@chakra-ui/react";
import Sidebar from "@/components/public/Sidebar";
import ContentHeader from "@/components/public/ContentHeader";
import { usePublicStore } from "@/stores/public-store-provider";
import { createToastError } from "@/utils/utils";
import { GlobalLoader } from "@/components/public/GlobalLoader";

export default function PublicLayout({ children }: PropsWithChildren<unknown>) {
  const { isLoading, error, fetchSignOut } = usePublicStore((state) => state);

  useEffect(() => {
    if (error) {
      createToastError(error);
    }
  }, [error]);

  const handleSignOut = async () => {
    await fetchSignOut();
  };

  return (
    <>
      {isLoading && <GlobalLoader />}
      <Flex minH="100vh" w="100%">
        <Sidebar onSignOut={handleSignOut} />
        <Box px="8" minH="100vh" w="100%" position="relative">
          <ContentHeader />
          {children}
        </Box>
      </Flex>
    </>
  );
}

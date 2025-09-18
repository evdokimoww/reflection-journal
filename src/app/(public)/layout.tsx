"use client";

import React, { useEffect } from "react";
import { Box, Flex } from "@chakra-ui/react";
import Sidebar from "@/components/public/Sidebar";
import ContentHeader from "@/components/public/ContentHeader";
import { usePublicStore } from "@/shared/stores/public-store-provider";
import { createToastError } from "@/shared/utils/utils";
import { Loader } from "@/components/public/Loader";
import { useShallow } from "zustand/shallow";

interface IPublicSelector {
  isLoading: boolean;
  error: Error | null;
  fetchSignOut: () => Promise<void>;
}

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isLoading, error, fetchSignOut } = usePublicStore<IPublicSelector>(
    useShallow((state) => ({
      isLoading: state.isLoading,
      error: state.error,
      fetchSignOut: state.fetchSignOut,
    })),
  );

  useEffect(() => {
    if (error) {
      createToastError(error);
    }
  }, [error]);

  const handleSignOut = () => {
    fetchSignOut();
  };

  return (
    <>
      {isLoading && <Loader />}
      <Flex minH="100vh" w="100%">
        <Sidebar onSignOut={handleSignOut} />
        <Box minH="100vh" w="100%" position="relative">
          <ContentHeader />
          <Box p="8" h="calc(100vh - 80px)" overflowY="auto">
            {children}
          </Box>
        </Box>
      </Flex>
    </>
  );
}

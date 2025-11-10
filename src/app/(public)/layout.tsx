"use client";

import React, { useEffect } from "react";
import { Box, Flex } from "@chakra-ui/react";
import Sidebar from "@/components/public/Sidebar";
import ContentHeader from "@/components/public/ContentHeader";
import { createToastError } from "@/shared/utils/utils";
import { Loader } from "@/components/public/Loader";
import {
  useAuthActions,
  useAuthError,
  useIsAuthLoading,
} from "@/shared/stores/auth/hooks";
import {
  useEntryActions,
  useIsRemoveEntryLoading,
} from "@/shared/stores/entry/hooks.ts";
import { usePathname, useRouter } from "next/navigation";

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const router = useRouter();

  const { fetchSignOut } = useAuthActions();
  const error = useAuthError();
  const isLoading = useIsAuthLoading();

  const { removeEntry } = useEntryActions();
  const isRemoveEntryLoading = useIsRemoveEntryLoading();

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
          <ContentHeader
            removeEntry={removeEntry}
            isRemoveEntryLoading={isRemoveEntryLoading}
            pathname={pathname}
            router={router}
          />
          <Box p="8" h="calc(100vh - 80px)" overflowY="auto">
            {children}
          </Box>
        </Box>
      </Flex>
    </>
  );
}

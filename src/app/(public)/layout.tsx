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
  useEntryError,
  useIsRemoveEntryLoading,
} from "@/shared/stores/entry/hooks.ts";
import { usePathname, useRouter } from "next/navigation";
import {
  useIsProfileLoading,
  useProfileActions,
  useProfileError,
  useUserEmail,
} from "@/shared/stores/profile/hooks.ts";
import { useEntriesError } from "@/shared/stores/entries/hooks.ts";
import { useMethodologiesError } from "@/shared/stores/methodologies/hooks.ts";
import { useTagsError } from "@/shared/stores/tags/hooks.ts";

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const router = useRouter();

  const { fetchSignOut } = useAuthActions();
  const isLoading = useIsAuthLoading();
  const { removeEntry } = useEntryActions();
  const isRemoveEntryLoading = useIsRemoveEntryLoading();
  const { fetchUserInfo } = useProfileActions();
  const isProfileLoading = useIsProfileLoading();
  const userEmail = useUserEmail();

  const authError = useAuthError();
  const profileError = useProfileError();
  const entriesError = useEntriesError();
  const entryError = useEntryError();
  const methodologiesError = useMethodologiesError();
  const tagsError = useTagsError();

  useEffect(() => {
    fetchUserInfo();
  }, []);

  useEffect(() => {
    let error =
      authError ||
      profileError ||
      entriesError ||
      entryError ||
      methodologiesError ||
      tagsError;
    if (error) createToastError(error);
  }, [
    authError,
    profileError,
    entriesError,
    entryError,
    methodologiesError,
    tagsError,
  ]);

  const handleSignOut = () => {
    fetchSignOut();
  };

  return (
    <>
      {isLoading && <Loader />}
      <Flex minH="100vh" w="100%">
        <Sidebar
          pathname={pathname}
          onSignOut={handleSignOut}
          isProfileLoading={isProfileLoading}
          userEmail={userEmail}
        />
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

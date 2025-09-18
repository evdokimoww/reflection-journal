import React from "react";
import AuthPage from "@/app/auth/page";
import { AbsoluteCenter, Box } from "@chakra-ui/react";
import { AuthStoreProvider } from "@/shared/stores/auth-store-provider";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthStoreProvider>
      <Box position="relative" h="100vh">
        <AbsoluteCenter>{children}</AbsoluteCenter>
      </Box>
    </AuthStoreProvider>
  );
}

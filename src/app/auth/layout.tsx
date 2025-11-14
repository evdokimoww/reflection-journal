import React from "react";
import { AbsoluteCenter, Box } from "@chakra-ui/react";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Box position="relative" h="100vh">
      <AbsoluteCenter>{children}</AbsoluteCenter>
    </Box>
  );
}

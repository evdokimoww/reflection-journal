import React from "react";
import AuthPage from "@/app/auth/page";
import { AbsoluteCenter, Box } from "@chakra-ui/react";

export default function AuthLayout() {
  return (
    <Box position="relative" h="100vh">
      <AbsoluteCenter>
        <AuthPage />
      </AbsoluteCenter>
    </Box>
  );
}

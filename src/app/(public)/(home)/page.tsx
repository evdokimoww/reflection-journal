"use client";

import React from "react";
import {
  useIsProfileLoading,
  useUsername,
} from "@/shared/stores/profile/hooks.ts";
import { DashboardPageView } from "@/app/(public)/(home)/_component";

export default function DashboardPage() {
  const username = useUsername();
  const isProfileLoading = useIsProfileLoading();

  return (
    <DashboardPageView
      username={username}
      isProfileLoading={isProfileLoading}
    />
  );
}

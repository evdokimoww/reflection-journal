"use client";

import React from "react";
import { PAGES } from "@/config/pages.config";
import { useRouter } from "next/navigation";
import { EntriesTable } from "@/components/entries/EntriesTable";

export default function EntriesPage() {
  const router = useRouter();

  const handleRowDoubleClick = (id: string) => {
    router.push(PAGES.ENTRY(id));
  };

  return <EntriesTable onRowDoubleClick={handleRowDoubleClick} />;
}

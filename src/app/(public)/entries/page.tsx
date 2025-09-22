import React from "react";
import { EntriesComponent } from "@/app/(public)/entries/_component/page";
import { EntriesStoreProvider } from "@/shared/stores/entries-store-provider";

export default function EntriesPage() {
  return (
    <EntriesStoreProvider>
      <EntriesComponent />
    </EntriesStoreProvider>
  );
}

import React from "react";
import { EntryCreateComponent } from "@/app/(public)/create/_component/page";
import { MethodologiesStoreProvider } from "@/shared/stores/methodologies-store-provider";
import { TagsStoreProvider } from "@/shared/stores/tags-store-provider";

export default function EntryCreatePage() {
  return (
    <TagsStoreProvider>
      <MethodologiesStoreProvider>
        <EntryCreateComponent />
      </MethodologiesStoreProvider>
    </TagsStoreProvider>
  );
}

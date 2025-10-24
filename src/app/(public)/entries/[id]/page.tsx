import React from "react";
import { EntryStoreProvider } from "@/shared/stores/entry-store-provider";
import { EntryPageComponent } from "@/app/(public)/entries/[id]/_component/page";
import { TagsStoreProvider } from "@/shared/stores/tags-store-provider";

export default function EntryPage() {
  return (
    <EntryStoreProvider>
      <TagsStoreProvider>
        <EntryPageComponent />
      </TagsStoreProvider>
    </EntryStoreProvider>
  );
}

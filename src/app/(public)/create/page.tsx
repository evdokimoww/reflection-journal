import React from "react";
import { NoteCreateComponent } from "@/app/(public)/create/_component/page";
import { MethodologiesStoreProvider } from "@/shared/stores/methodologies-store-provider";

export default function NoteCreatePage() {
  return (
    <MethodologiesStoreProvider>
      <NoteCreateComponent />
    </MethodologiesStoreProvider>
  );
}

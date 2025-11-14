"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  useEntryActions,
  useIsEntryLoading,
} from "@/shared/stores/entry/hooks.ts";
import {
  useIsMethodologiesLoading,
  useMethodologies,
  useMethodologiesActions,
} from "@/shared/stores/methodologies/hooks.ts";
import {
  useIsTagsLoading,
  useSearchedTags,
  useTagsActions,
} from "@/shared/stores/tags/hooks.ts";
import { Loader } from "@/components/public/Loader.tsx";
import { ChangeMethodologyCards } from "@/components/entry-form/ChangeMethodologyCards.tsx";
import { EntryForm } from "@/components/entry-form/EntryForm.tsx";

export default function EntryCreatePage() {
  const { createEntry } = useEntryActions();
  const isEntryLoading = useIsEntryLoading();

  const { fetchMethodologies } = useMethodologiesActions();
  const methodologies = useMethodologies();
  const isMethodologiesLoading = useIsMethodologiesLoading();

  const { fetchSearchedTags } = useTagsActions();
  const isTagsLoading = useIsTagsLoading();
  const searchedTags = useSearchedTags();

  useEffect(() => {
    fetchMethodologies();
  }, []);

  const [changedMethodologyId, setChangedMethodologyId] = useState<string>("");

  const changedMethodology = useMemo(() => {
    return methodologies.find(({ id }) => id === changedMethodologyId);
  }, [methodologies, changedMethodologyId]);

  const handleMethodologyChange = (id: string) => {
    setChangedMethodologyId(id);
  };

  return isMethodologiesLoading || isEntryLoading ? (
    <Loader />
  ) : (
    <>
      <ChangeMethodologyCards
        methodologies={methodologies}
        onMethodologyChange={handleMethodologyChange}
      />
      {changedMethodology && (
        <EntryForm
          methodology={changedMethodology}
          isTagsLoading={isTagsLoading}
          searchedTags={searchedTags}
          onTagsSearch={fetchSearchedTags}
          createEntry={createEntry}
        />
      )}
    </>
  );
}

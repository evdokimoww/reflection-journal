"use client";

import React, { useEffect } from "react";
import { useParams } from "next/navigation";
import {
  useCurrentMethodology,
  useEntry,
  useEntryActions,
  useEntryError,
  useIsEntryLoading,
} from "@/shared/stores/entry/hooks.ts";
import {
  useIsTagsLoading,
  useSearchedTags,
  useTagsActions,
} from "@/shared/stores/tags/hooks.ts";
import { Loader } from "@/components/public/Loader.tsx";
import { EntryForm } from "@/components/entry-form/EntryForm.tsx";

export default function EntryPage() {
  const { id }: { id: string } = useParams();

  const { fetchEntry, resetState, updateEntry } = useEntryActions();
  const isLoading = useIsEntryLoading();
  const entry = useEntry();
  const entryError = useEntryError();
  const currentMethodology = useCurrentMethodology();

  const { fetchSearchedTags } = useTagsActions();
  const isTagsLoading = useIsTagsLoading();
  const searchedTags = useSearchedTags();

  useEffect(() => {
    return () => {
      resetState();
    };
  }, [resetState]);

  useEffect(() => {
    if (id) {
      fetchEntry(id);
    }
  }, [id, fetchEntry]);

  return (isLoading || !entry || !currentMethodology) && !entryError ? (
    <Loader />
  ) : (
    <EntryForm
      entry={entry}
      methodology={currentMethodology}
      isTagsLoading={isTagsLoading}
      searchedTags={searchedTags}
      onTagsSearch={fetchSearchedTags}
      isEditForm
      updateEntry={updateEntry}
    />
  );
}

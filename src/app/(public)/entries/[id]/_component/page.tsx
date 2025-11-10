"use client";

import React, { useEffect } from "react";
import { EntryForm } from "@/components/entry-form/EntryForm";
import { useParams } from "next/navigation";
import { Loader } from "@/components/public/Loader";
import { createToastError } from "@/shared/utils/utils";
import {
  useCurrentMethodology,
  useEntry,
  useEntryActions,
  useEntryError,
  useIsEntryLoading,
} from "@/shared/stores/entry/hooks";
import {
  useIsTagsLoading,
  useSearchedTags,
  useTagsActions,
  useTagsError,
} from "@/shared/stores/tags/hooks";

export function EntryPageComponent() {
  const { id }: { id: string } = useParams();

  const { fetchEntry, resetState, updateEntry } = useEntryActions();
  const isLoading = useIsEntryLoading();
  const entry = useEntry();
  const entryError = useEntryError();
  const currentMethodology = useCurrentMethodology();

  const { fetchSearchedTags } = useTagsActions();
  const tagsError = useTagsError();
  const isTagsLoading = useIsTagsLoading();
  const searchedTags = useSearchedTags();

  useEffect(() => {
    return () => {
      resetState();
    };
  }, []);

  useEffect(() => {
    if (id) {
      fetchEntry(id);
    }
  }, [id]);

  useEffect(() => {
    if (entryError) createToastError(entryError);
    if (tagsError) createToastError(tagsError);
  }, [entryError, tagsError]);

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

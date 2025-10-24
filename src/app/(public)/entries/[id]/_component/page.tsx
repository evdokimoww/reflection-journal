"use client";

import React, { useEffect } from "react";
import { EntryForm } from "@/components/entry-form/EntryForm";
import { useParams } from "next/navigation";
import { useShallow } from "zustand/shallow";
import { IEntry, ITag } from "@/shared/types/entry.types";
import { useEntryStore } from "@/shared/stores/entry-store-provider";
import { IMethodology } from "@/shared/types/methodologies.types";
import { Loader } from "@/components/public/Loader";
import { createToastError } from "@/shared/utils/utils";
import { useTagsStore } from "@/shared/stores/tags-store-provider";

interface IEntrySelector {
  entry: IEntry | null;
  currentMethodology: IMethodology | null;
  isLoading: boolean;
  entryError: Error | null;
  methodologyError: Error | null;
  fetchEntry: (id: string) => Promise<void>;
  resetState: () => void;
}

interface ITagsSelector {
  tagsError: Error | null;
  isTagsLoading: boolean;
  searchedTags: ITag[];
  fetchSearchedTags: (searchString: string) => Promise<void>;
}

export function EntryPageComponent() {
  const { id }: { id: string } = useParams();

  const {
    entry,
    currentMethodology,
    entryError,
    methodologyError,
    isLoading,
    fetchEntry,
    resetState,
  } = useEntryStore<IEntrySelector>(
    useShallow((state) => ({
      entry: state.entry,
      isLoading: state.isLoading,
      entryError: state.entryError,
      methodologyError: state.methodologyError,
      fetchEntry: state.fetchEntry,
      currentMethodology: state.currentMethodology,
      resetState: state.resetState,
    })),
  );

  const { tagsError, isTagsLoading, searchedTags, fetchSearchedTags } =
    useTagsStore<ITagsSelector>(
      useShallow((state) => ({
        tagsError: state.error,
        isTagsLoading: state.isTagsLoading,
        searchedTags: state.searchedTags,
        fetchSearchedTags: state.fetchSearchedTags,
      })),
    );

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
    if (methodologyError) createToastError(methodologyError);
    if (tagsError) createToastError(tagsError);
  }, [entryError, methodologyError, tagsError]);

  return (isLoading || !entry || !currentMethodology) &&
    !entryError &&
    !methodologyError ? (
    <Loader />
  ) : (
    <EntryForm
      entry={entry}
      methodology={currentMethodology}
      isTagsLoading={isTagsLoading}
      searchedTags={searchedTags}
      onTagsSearch={fetchSearchedTags}
      isEditForm
      saveEntry={() => {}} // TODO
    />
  );
}

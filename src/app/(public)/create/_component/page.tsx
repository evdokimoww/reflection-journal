"use client";

import React, { useEffect, useMemo, useState } from "react";
import { IMethodology } from "@/shared/types/methodologies.types";
import { useMethodologiesStore } from "@/shared/stores/methodologies-store-provider";
import { useShallow } from "zustand/shallow";
import { Loader } from "@/components/public/Loader";
import { createToastError } from "@/shared/utils/utils";
import { EntryForm } from "@/components/entry-form/EntryForm";
import { useTagsStore } from "@/shared/stores/tags-store-provider";
import { ITag } from "@/shared/types/entry.types";
import { ChangeMethodologyCards } from "@/components/entry-form/ChangeMethodologyCards";

interface IMethodologiesSelector {
  methodologies: IMethodology[];
  isLoading: boolean;
  methodologiesError: Error | null;
  fetchMethodologies: () => Promise<void>;
}

interface ITagsSelector {
  tagsError: Error | null;
  isTagsLoading: boolean;
  searchedTags: ITag[];
  fetchSearchedTags: (searchString: string) => Promise<void>;
}

export function EntryCreateComponent() {
  const { methodologies, methodologiesError, isLoading, fetchMethodologies } =
    useMethodologiesStore<IMethodologiesSelector>(
      useShallow((state) => ({
        methodologies: state.methodologies,
        isLoading: state.isLoading,
        methodologiesError: state.error,
        fetchMethodologies: state.fetchMethodologies,
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
    fetchMethodologies();
  }, []);

  useEffect(() => {
    if (methodologiesError) createToastError(methodologiesError);
    if (tagsError) createToastError(tagsError);
  }, [methodologiesError, tagsError]);

  const [changedMethodologyId, setChangedMethodologyId] = useState<string>("");

  const changedMethodology = useMemo(() => {
    return methodologies.find(({ id }) => id === changedMethodologyId);
  }, [methodologies, changedMethodologyId]);

  const handleMethodologyChange = (id: string) => {
    setChangedMethodologyId(id);
  };

  return isLoading ? (
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
        />
      )}
    </>
  );
}

"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Loader } from "@/components/public/Loader";
import { createToastError } from "@/shared/utils/utils";
import { EntryForm } from "@/components/entry-form/EntryForm";
import { ChangeMethodologyCards } from "@/components/entry-form/ChangeMethodologyCards";
import {
  useEntryActions,
  useIsEntryLoading,
} from "@/shared/stores/entry/hooks";
import {
  useIsMethodologiesLoading,
  useMethodologies,
  useMethodologiesActions,
  useMethodologiesError,
} from "@/shared/stores/methodologies/hooks";
import {
  useIsTagsLoading,
  useSearchedTags,
  useTagsActions,
  useTagsError,
} from "@/shared/stores/tags/hooks";

export function EntryCreateComponent() {
  const { createEntry } = useEntryActions();
  const isEntryLoading = useIsEntryLoading();

  const { fetchMethodologies } = useMethodologiesActions();
  const methodologies = useMethodologies();
  const methodologiesError = useMethodologiesError();
  const isMethodologiesLoading = useIsMethodologiesLoading();

  const { fetchSearchedTags } = useTagsActions();
  const tagsError = useTagsError();
  const isTagsLoading = useIsTagsLoading();
  const searchedTags = useSearchedTags();

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

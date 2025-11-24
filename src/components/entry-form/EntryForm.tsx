"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { EntryFormView } from "@/components/entry-form/EntryFormView";
import { FormActionBar } from "@/components/entry-form/FormActionBar";
import { EntryItem, EntryStep, Methodology, TagItem } from "@/shared/types";
import { createToastSuccess, deepEqualFormValues } from "@/shared/utils/utils";
import { useRouter } from "next/navigation";
import {
  CreateEntryActionType,
  UpdateEntryActionType,
} from "@/shared/stores/entry/types.ts";

export interface EntryForm {
  title: string;
  tags: TagItem[];
  steps: Omit<EntryStep, "step_id">[];
}

interface Props {
  entry?: EntryItem | null;
  methodology: Methodology | null;
  isEditForm?: boolean;
  isTagsLoading: boolean;
  searchedTags: TagItem[];
  onTagsSearch: (searchString: string) => void;
  createEntry?: CreateEntryActionType;
  updateEntry?: UpdateEntryActionType;
}

export function EntryForm({
  entry,
  methodology,
  isEditForm,
  isTagsLoading,
  searchedTags,
  onTagsSearch,
  createEntry,
  updateEntry,
}: Props) {
  const router = useRouter();
  const [defaultValues, setDefaultValues] = useState<EntryForm>({
    title: "",
    tags: [],
    steps: [],
  });

  const tagInputRef = useRef<HTMLInputElement>(null);

  const handleTagInputClear = () => {
    if (tagInputRef.current) {
      tagInputRef.current.value = "";
    }
  };

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
  } = useForm<EntryForm>({
    mode: "onBlur",
    defaultValues,
  });

  useEffect(() => {
    const updatedDefaultValues = { ...defaultValues };

    if (methodology) {
      updatedDefaultValues.steps = methodology.steps.map((step) => ({
        id: step.id,
        value: "",
      }));
    }

    if (entry) {
      updatedDefaultValues.title = entry.title;
      updatedDefaultValues.tags = [...entry.tags];
      updatedDefaultValues.steps.map((step) => {
        step.value =
          entry.steps.find((s) => s.step_id === step.id)?.value || "";
      });
    }

    setDefaultValues(updatedDefaultValues);
    reset(updatedDefaultValues);
  }, [methodology, entry, reset, setDefaultValues]);

  const currentFormValues = watch();

  useEffect(() => {
    handleTagInputClear();

    return () => {
      reset();
    };
  }, [reset]);

  const isFormDirty = useMemo(() => {
    return !deepEqualFormValues<EntryForm>(currentFormValues, defaultValues);
  }, [currentFormValues, defaultValues]);

  const handleFormSubmit: SubmitHandler<EntryForm> = (data) => {
    if (methodology) {
      const requestData = {
        ...data,
        methodologyId: methodology.id,
      };

      entry && updateEntry
        ? updateEntry(
            { id: entry.id, ...requestData },
            router,
            createToastSuccess,
          )
        : createEntry && createEntry(requestData, router);
    }
  };

  const handleFormRevert = () => {
    handleTagInputClear();
    reset(defaultValues);
  };

  const handleTagsSearch = (searchValue: string) => {
    onTagsSearch(searchValue);
  };

  return !methodology ? (
    <div>нет данных о методологии</div> // todo
  ) : (
    <>
      <EntryFormView
        methodology={methodology}
        control={control}
        errors={errors}
        tagInputRef={tagInputRef}
        onTagsSearch={handleTagsSearch}
        isTagsLoading={isTagsLoading}
        searchedTags={searchedTags}
      />
      {isFormDirty && (
        <FormActionBar
          isEditForm={!!isEditForm}
          onFormClean={() => reset()}
          onFormRevert={handleFormRevert}
          onFormSubmit={handleSubmit(handleFormSubmit)}
        />
      )}
    </>
  );
}

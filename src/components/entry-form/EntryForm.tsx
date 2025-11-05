"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { EntryFormView } from "@/components/entry-form/EntryFormView";
import { FormActionBar } from "@/components/entry-form/FormActionBar";
import {
  EntryItem,
  EntryRequestData,
  EntryStep,
  Methodology,
  TagItem,
} from "@/shared/types";
import { deepEqualFormValues } from "@/shared/utils/utils";
import { useRouter } from "next/navigation";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

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
  saveEntry: (data: EntryRequestData, router?: AppRouterInstance) => void;
}

export function EntryForm({
  entry,
  methodology,
  isEditForm,
  isTagsLoading,
  searchedTags,
  onTagsSearch,
  saveEntry,
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
        step.value = entry.steps[step.id] || "";
      });
    }

    setDefaultValues(updatedDefaultValues);
    reset(updatedDefaultValues);
  }, [methodology, entry]);

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

  const currentFormValues = watch();

  useEffect(() => {
    handleTagInputClear();

    return () => {
      reset();
    };
  }, []);

  const isFormDirty = useMemo(() => {
    return !deepEqualFormValues(currentFormValues, defaultValues);
  }, [currentFormValues]);

  const handleFormSubmit: SubmitHandler<EntryForm> = (data) => {
    if (methodology) {
      saveEntry({ ...data, methodologyId: methodology.id }, router);
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

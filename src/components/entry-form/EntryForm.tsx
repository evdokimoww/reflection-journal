"use client";

import { IMethodology } from "@/shared/types/methodologies.types";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { EntryFormView } from "@/components/entry-form/EntryFormView";
import { FormActionBar } from "@/components/entry-form/FormActionBar";
import { IEntry, ITag } from "@/shared/types/entry.types";

export interface IForm {
  title: string;
  tags: { id: string; value: string }[];
  steps: { id: string; value: string }[];
}

interface IProps {
  entry?: IEntry | null;
  methodology: IMethodology | null;
  isEditForm?: boolean;
  isTagsLoading: boolean;
  searchedTags: ITag[];
  onTagsSearch: (searchString: string) => void;
}

export function EntryForm({
  entry,
  methodology,
  isEditForm,
  isTagsLoading,
  searchedTags,
  onTagsSearch,
}: IProps) {
  const [defaultValues, setDefaultValues] = useState<IForm>({
    title: "",
    tags: [],
    steps: [],
  });

  const tagInputRef = useRef<HTMLInputElement>(null);

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
    formState: { errors, isDirty },
  } = useForm<IForm>({
    mode: "onBlur",
    defaultValues,
  });

  useEffect(() => {
    if (tagInputRef.current) {
      tagInputRef.current.value = "";
    }

    return () => {
      reset();
    };
  }, []);

  const handleFormSubmit: SubmitHandler<IForm> = (data) => {
    console.log(data);
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
      {isDirty && (
        <FormActionBar
          isEditForm={!!isEditForm}
          onFormClean={() => reset()}
          onFormRevert={() => reset(defaultValues)}
          onFormSubmit={handleSubmit(handleFormSubmit)}
        />
      )}
    </>
  );
}

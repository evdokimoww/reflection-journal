"use client";

import { IMethodology, METHODOLOGIES } from "@/shared/data/methodolodies.data";
import React, { useEffect, useRef, useState } from "react";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { useParams } from "next/navigation";
import { REFLECTION_ENTRIES } from "@/shared/data/reflection-entries.data";
import { MethodologyFormView } from "@/components/methodology-form/MethodologyFormView";
import { FormActionBar } from "@/components/methodology-form/FormActionBar";

export interface IForm {
  title: string;
  tags: string[];
  steps: { value: string }[];
}

interface IProps {
  changedMethodology?: string;
}

export function MethodologyForm({ changedMethodology }: IProps) {
  const [methodology, setMethodology] = useState<IMethodology | null>(null);
  const { id } = useParams();
  const tagInputRef = useRef<HTMLInputElement>(null);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<IForm>({
    mode: "onBlur",
    defaultValues: {
      title: "",
      tags: [],
      steps: [],
    },
  });

  const { fields } = useFieldArray<IForm>({
    control,
    name: "steps",
  });

  const getMethodology = (methodId: string) => {
    return METHODOLOGIES.find(({ id }) => id === methodId);
  };

  const initEditForm = () => {
    // todo fetch
    const entry = REFLECTION_ENTRIES.find((item) => item.id === id);

    if (entry) {
      const methodology = getMethodology(entry.methodId);

      if (methodology) {
        setMethodology(methodology);
      }

      reset(entry);
    }
  };

  useEffect(() => {
    reset();

    if (changedMethodology) {
      const methodology = getMethodology(changedMethodology);

      if (methodology) {
        setMethodology(methodology);
        // todo maybe wizard form logic
        reset({
          title: "",
          tags: [],
          steps: Array.from({ length: methodology.steps.length }, () => ({
            value: "",
          })),
        });

        if (tagInputRef.current) {
          tagInputRef.current.value = "";
        }
      }
    }
  }, [changedMethodology]);

  useEffect(() => {
    if (id) {
      initEditForm();
    }
  }, [id, reset]);

  useEffect(() => {
    return () => {
      reset();
    };
  }, []);

  const handleFormSubmit: SubmitHandler<IForm> = (data) => {
    console.log(data);
  };

  if (!methodology) {
    return null; // todo skeleton loader
  }

  return (
    <>
      <MethodologyFormView
        methodology={methodology}
        control={control}
        fields={fields}
        errors={errors}
        tagInputRef={tagInputRef}
      />
      {isDirty && (
        <FormActionBar
          isEditForm={!!id}
          onFormClean={() => reset()}
          onFormRevert={initEditForm}
          onFormSubmit={handleSubmit(handleFormSubmit)}
        />
      )}
    </>
  );
}

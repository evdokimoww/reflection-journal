"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Box, CheckboxGroup, Flex, HStack, RadioCard } from "@chakra-ui/react";
import { IMethodology } from "@/shared/data/methodolodies.data";
import { MethodologyForm } from "@/components/methodology-form/MethodologyForm";
import { useMethodologiesStore } from "@/shared/stores/methodologies-store-provider";
import { useShallow } from "zustand/shallow";
import { Loader } from "@/components/public/Loader";
import { createToastError } from "@/shared/utils/utils";

interface IMethodologiesSelector {
  methodologies: IMethodology[];
  isLoading: boolean;
  error: Error | null;
  fetchMethodologies: () => Promise<void>;
}

export function NoteCreateComponent() {
  const { methodologies, error, isLoading, fetchMethodologies } =
    useMethodologiesStore<IMethodologiesSelector>(
      useShallow((state) => ({
        methodologies: state.methodologies,
        isLoading: state.isLoading,
        error: state.error,
        fetchMethodologies: state.fetchMethodologies,
      })),
    );

  useEffect(() => {
    fetchMethodologies();
  }, []);

  useEffect(() => {
    if (error) {
      createToastError(error);
    }
  }, [error]);

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
      <Box mb="8">
        <CheckboxGroup maxW="800px">
          Выбор методологии:
          <Flex gap="2">
            <RadioCard.Root>
              <HStack align="stretch">
                {methodologies.map((item) => (
                  <RadioCard.Item
                    key={item.id}
                    value={item.id}
                    onChange={() => handleMethodologyChange(item.id)}
                  >
                    <RadioCard.ItemHiddenInput />
                    <RadioCard.ItemControl>
                      <RadioCard.ItemContent>
                        <RadioCard.ItemText>{item.title}</RadioCard.ItemText>
                        <RadioCard.ItemDescription>
                          {item.short_description}
                        </RadioCard.ItemDescription>
                      </RadioCard.ItemContent>
                      <RadioCard.ItemIndicator />
                    </RadioCard.ItemControl>
                  </RadioCard.Item>
                ))}
              </HStack>
            </RadioCard.Root>
          </Flex>
        </CheckboxGroup>
      </Box>
      {changedMethodology && (
        <MethodologyForm changedMethodology={changedMethodology} />
      )}
    </>
  );
}

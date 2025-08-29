"use client";

import React, { useState } from "react";
import { Box, CheckboxGroup, Flex, HStack, RadioCard } from "@chakra-ui/react";
import { METHODOLOGIES } from "@/shared/data/methodolodies.data";
import { MethodologyForm } from "@/components/methodology-form/MethodologyForm";

export default function NoteCreatePage() {
  const [changedMethodology, setChangedMethodology] = useState<string>("");

  const handleMethodologyChange = (id: string) => {
    setChangedMethodology(id);
  };

  return (
    <Box>
      <Box mb="8">
        <CheckboxGroup maxW="800px">
          Выбор методологии:
          <Flex gap="2">
            <RadioCard.Root>
              <HStack align="stretch">
                {METHODOLOGIES.map((item) => (
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
                          {item.shortDescription}
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
    </Box>
  );
}

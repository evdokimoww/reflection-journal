import { Box, CheckboxGroup, Flex, HStack, RadioCard } from "@chakra-ui/react";
import React from "react";
import { Methodology } from "@/shared/types";

interface Props {
  methodologies: Methodology[];
  onMethodologyChange: (id: string) => void;
}

export function ChangeMethodologyCards({
  methodologies,
  onMethodologyChange,
}: Props) {
  return (
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
                  onChange={() => onMethodologyChange(item.id)}
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
  );
}

import { Box, CheckboxGroup, Flex, HStack, RadioCard } from "@chakra-ui/react";
import React from "react";
import { IMethodology } from "@/shared/types/methodologies.types";

interface IProps {
  methodologies: IMethodology[];
  onMethodologyChange: (id: string) => void;
}

export function ChangeMethodologyCards({
  methodologies,
  onMethodologyChange,
}: IProps) {
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

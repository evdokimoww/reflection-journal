import { Box, CheckboxGroup, Flex, RadioCard, Text } from "@chakra-ui/react";
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
    <Box mb={{ base: 6, md: 8 }}>
      <CheckboxGroup maxW={{ base: "100%", md: "800px" }}>
        <Text mb={{ base: 3, md: 4 }} fontSize={{ base: "sm", md: "md" }}>
          Выбор методологии:
        </Text>
        <Flex gap={{ base: 2, md: 2 }} direction={{ base: "column", md: "row" }}>
          <RadioCard.Root>
            <Flex
              direction={{ base: "column", md: "row" }}
              gap={{ base: 2, md: 2 }}
              align="stretch"
            >
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
            </Flex>
          </RadioCard.Root>
        </Flex>
      </CheckboxGroup>
    </Box>
  );
}

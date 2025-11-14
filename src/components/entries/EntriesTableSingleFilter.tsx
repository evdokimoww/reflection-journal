import React, { ChangeEvent } from "react";
import { Flex, NativeSelect } from "@chakra-ui/react";
import { FilterItem } from "@/shared/types";

interface Props {
  fieldName: string;
  items: FilterItem[];
  onSelectChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  defaultValue: string;
}

export function EntriesTableSingleFilter({
  fieldName,
  items,
  onSelectChange,
  defaultValue,
}: Props) {
  return (
    <Flex fontSize="xs" align="center" gap="2">
      {fieldName}:
      <NativeSelect.Root variant="plain" size="xs" fontWeight="semibold">
        <NativeSelect.Field
          onChange={onSelectChange}
          defaultValue={defaultValue}
        >
          {items.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </NativeSelect.Field>
        <NativeSelect.Indicator />
      </NativeSelect.Root>
    </Flex>
  );
}

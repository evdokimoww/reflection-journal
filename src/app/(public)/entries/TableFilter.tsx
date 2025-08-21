import React, { ChangeEvent } from "react";
import { Flex, NativeSelect } from "@chakra-ui/react";
import { ITableSortFilterItem } from "@/shared/data/entries-table-filters.data";

interface IProps {
  fieldName: string;
  items: ITableSortFilterItem[];
  onSelectChange: (e: ChangeEvent<HTMLSelectElement>) => void;
}

export function TableSingleFilter({
  fieldName,
  items,
  onSelectChange,
}: IProps) {
  return (
    <Flex fontSize="xs" align="center" gap="2">
      {fieldName}:
      <NativeSelect.Root variant="plain" size="xs" fontWeight="semibold">
        <NativeSelect.Field placeholder="-" onChange={onSelectChange}>
          {items.map((item) => (
            <option
              key={item.value}
              value={item.value}
              selected={item.selected}
            >
              {item.label}
            </option>
          ))}
        </NativeSelect.Field>
        <NativeSelect.Indicator />
      </NativeSelect.Root>
    </Flex>
  );
}

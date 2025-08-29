import React, { ChangeEvent } from "react";
import { Flex, NativeSelect } from "@chakra-ui/react";
import { ITableSortFilterItem } from "@/shared/data/entries-table-filters.data";

interface IProps {
  fieldName: string;
  items: ITableSortFilterItem[];
  onSelectChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  defaultValue: string;
}

export function TableSingleFilter({
  fieldName,
  items,
  onSelectChange,
  defaultValue,
}: IProps) {
  return (
    <Flex fontSize="xs" align="center" gap="2">
      {fieldName}:
      <NativeSelect.Root variant="plain" size="xs" fontWeight="semibold">
        <NativeSelect.Field
          placeholder="-"
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

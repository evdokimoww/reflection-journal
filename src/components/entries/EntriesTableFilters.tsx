import React, { ChangeEvent } from "react";
import { Flex, Input } from "@chakra-ui/react";
import {
  FiltrationType,
  SortingDirection,
  TABLE_FILTER_ITEMS,
  TABLE_SORT_ITEMS,
} from "@/shared/data/entries-table-filters.data";
import { EntriesTableSingleFilter } from "@/components/entries/EntriesTableSingleFilter";
import { IFilterItem } from "@/shared/types/types";

interface IProps {
  sortingDirection: SortingDirection;
  filtrationType: FiltrationType;
  onSortingChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  onFiltrationTypeChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  onMethodologyTypeChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  onTagsChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  onDateChange: (e: ChangeEvent<HTMLInputElement>) => void;
  filterValues: {
    methodologies: IFilterItem[];
    tags: IFilterItem[];
  };
  changedMethodologyFilterValue: string;
  changedTagFilterValue: string;
}

export function EntriesTableFilters({
  sortingDirection,
  filtrationType,
  onSortingChange,
  onFiltrationTypeChange,
  onMethodologyTypeChange,
  onTagsChange,
  onDateChange,
  filterValues,
  changedMethodologyFilterValue,
  changedTagFilterValue,
}: IProps) {
  return (
    <Flex gap="8" mb="4">
      <EntriesTableSingleFilter
        fieldName="Сортировка"
        items={TABLE_SORT_ITEMS}
        onSelectChange={onSortingChange}
        defaultValue={sortingDirection}
      />
      <EntriesTableSingleFilter
        fieldName="Фильтрация"
        items={TABLE_FILTER_ITEMS}
        onSelectChange={onFiltrationTypeChange}
        defaultValue={filtrationType}
      />
      {filtrationType === FiltrationType.Methodology && (
        <EntriesTableSingleFilter
          fieldName="Методология"
          items={filterValues.methodologies}
          onSelectChange={onMethodologyTypeChange}
          defaultValue={changedMethodologyFilterValue}
        />
      )}
      {filtrationType === FiltrationType.Tag && (
        <EntriesTableSingleFilter
          fieldName="Тег"
          items={filterValues.tags}
          onSelectChange={onTagsChange}
          defaultValue={changedTagFilterValue}
        />
      )}
      {filtrationType === FiltrationType.Date && (
        <Flex fontSize="xs" align="center" gap="2">
          Дата:
          <Input type="date" size="xs" onChange={onDateChange} />
        </Flex>
      )}
    </Flex>
  );
}

"use client";

import React, { ChangeEvent, useMemo, useState } from "react";
import { Flex, Input, NativeSelect } from "@chakra-ui/react";
import {
  FilterVariants,
  TABLE_FILTER_ITEMS,
  TABLE_FILTER_METHODOLOGY_ITEMS,
  TABLE_FILTER_TAGS_ITEMS,
  TABLE_SORT_ITEMS,
} from "@/shared/data/entries-table-filters.data";
import { EntriesTableSingleFilter } from "@/components/entries/EntriesTableSingleFilter";
import { format } from "date-fns";
import { INPUT_DATE_FORMAT } from "@/shared/constants";

export function EntriesTableFilters() {
  const [filtration, setFiltration] = useState<FilterVariants | "">("");

  const handleSortingChange = (e: ChangeEvent<HTMLSelectElement>) => {
    console.log(e.target.value);
  };

  const handleFiltrationMethodChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const filterValue = e.target.value as FilterVariants | "";
    setFiltration(filterValue);
  };

  const handleMetodologyTypeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    console.log(e.target.value);
  };

  const handleTagsChange = (e: ChangeEvent<HTMLSelectElement>) => {
    console.log(e.target.value);
  };
  const handleDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };

  return (
    <Flex gap="8" mb="4">
      <EntriesTableSingleFilter
        fieldName="Сортировка"
        items={TABLE_SORT_ITEMS}
        onSelectChange={handleSortingChange}
        defaultValue={TABLE_SORT_ITEMS[0].value}
      />
      <EntriesTableSingleFilter
        fieldName="Фильтрация"
        items={TABLE_FILTER_ITEMS}
        onSelectChange={handleFiltrationMethodChange}
        defaultValue={TABLE_FILTER_ITEMS[0].value}
      />
      {filtration === FilterVariants.Methodology && (
        <EntriesTableSingleFilter
          fieldName="Методология"
          items={TABLE_FILTER_METHODOLOGY_ITEMS}
          onSelectChange={handleMetodologyTypeChange}
          defaultValue={TABLE_FILTER_METHODOLOGY_ITEMS[0].value}
        />
      )}
      {filtration === FilterVariants.Tag && (
        <EntriesTableSingleFilter
          fieldName="Тег"
          items={TABLE_FILTER_TAGS_ITEMS}
          onSelectChange={handleTagsChange}
          defaultValue={TABLE_FILTER_TAGS_ITEMS[0].value}
        />
      )}
      {filtration === FilterVariants.Date && (
        <Flex fontSize="xs" align="center" gap="2">
          Дата:
          <Input
            type="date"
            size="xs"
            defaultValue={format(new Date(), INPUT_DATE_FORMAT)}
            onChange={handleDateChange}
          />
        </Flex>
      )}
    </Flex>
  );
}

"use client";

import React, { ChangeEvent, useEffect } from "react";
import { FiltersValues } from "@/shared/stores/entries/types.ts";
import {
  FiltrationType,
  SortingDirection,
} from "@/shared/data/entries-table-filters.data.ts";
import {
  useEntries,
  useEntriesActions,
  useEntriesChangedMethodologyFilterValue,
  useEntriesChangedTagFilterValue,
  useEntriesFilterValues,
  useEntriesFiltrationType,
  useEntriesLoading,
  useEntriesSortingDirection,
} from "@/shared/stores/entries/hooks.ts";
import { useEntriesStore } from "@/shared/stores/entries/entries-store.ts";
import { useRouter } from "next/navigation";
import { PAGES } from "@/shared/constants.ts";
import { Box } from "@chakra-ui/react";
import { EntriesTableFilters } from "@/components/entries/EntriesTableFilters.tsx";
import { Loader } from "@/components/public/Loader.tsx";
import { EntriesTable } from "@/components/entries/EntriesTable.tsx";

interface SubscribeStateFields extends FiltersValues {
  sortingDirection: SortingDirection;
}

export default function EntriesPage() {
  const {
    fetchEntries,
    setSortingDirection,
    setFiltrationType,
    fetchFilterValues,
    setChangedMethodologyFilterValue,
    setChangedTagFilterValue,
    setChangedDateFilterValue,
  } = useEntriesActions();
  const entries = useEntries();
  const isLoading = useEntriesLoading();
  const sortingDirection = useEntriesSortingDirection();
  const filtrationType = useEntriesFiltrationType();
  const filterValues = useEntriesFilterValues();
  const changedMethodologyFilterValue =
    useEntriesChangedMethodologyFilterValue();
  const changedTagFilterValue = useEntriesChangedTagFilterValue();

  useEffect(() => {
    fetchEntries();
  }, []);

  useEffect(() => {
    const unsubscribe = useEntriesStore.subscribe(
      (state: SubscribeStateFields) => ({
        sortingDirection: state.sortingDirection,
        changedMethodologyFilterValue: state.changedMethodologyFilterValue,
        changedTagFilterValue: state.changedTagFilterValue,
        changedDateFilterValue: state.changedDateFilterValue,
      }),
      (newValues, oldValues) => {
        if (
          newValues.sortingDirection !== oldValues.sortingDirection ||
          newValues.changedMethodologyFilterValue !==
            oldValues.changedMethodologyFilterValue ||
          newValues.changedTagFilterValue !== oldValues.changedTagFilterValue ||
          newValues.changedDateFilterValue !== oldValues.changedDateFilterValue
        ) {
          fetchEntries();
        }
      },
    );

    return () => unsubscribe();
  }, [useEntriesStore]);

  useEffect(() => {
    if (filtrationType !== FiltrationType.None) {
      fetchFilterValues();
    }
  }, [filtrationType]);

  const router = useRouter();

  const handleRowDoubleClick = (id: string) => {
    router.push(PAGES.ENTRY(id));
  };

  const handleSortingChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSortingDirection(e.target.value as SortingDirection);
  };

  const handleFiltrationTypeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setFiltrationType(e.target.value as FiltrationType);
  };

  const handleMethodologyTypeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setChangedMethodologyFilterValue(e.target.value);
  };

  const handleTagsChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setChangedTagFilterValue(e.target.value);
  };

  const handleDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    setChangedDateFilterValue(e.target.value);
  };

  return (
    <Box>
      <EntriesTableFilters
        sortingDirection={sortingDirection}
        filtrationType={filtrationType}
        filterValues={filterValues}
        onSortingChange={handleSortingChange}
        onFiltrationTypeChange={handleFiltrationTypeChange}
        onMethodologyTypeChange={handleMethodologyTypeChange}
        onTagsChange={handleTagsChange}
        onDateChange={handleDateChange}
        changedMethodologyFilterValue={changedMethodologyFilterValue}
        changedTagFilterValue={changedTagFilterValue}
      />
      {isLoading ? (
        <Loader />
      ) : (
        <EntriesTable
          onRowDoubleClick={handleRowDoubleClick}
          entries={entries}
        />
      )}
    </Box>
  );
}

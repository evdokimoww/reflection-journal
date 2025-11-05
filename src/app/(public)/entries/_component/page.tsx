"use client";

import React, { ChangeEvent, useEffect } from "react";
import { useRouter } from "next/navigation";
import { EntriesTable } from "@/components/entries/EntriesTable";
import { createToastError } from "@/shared/utils/utils";
import { Loader } from "@/components/public/Loader";
import { Box } from "@chakra-ui/react";
import { EntriesTableFilters } from "@/components/entries/EntriesTableFilters";
import {
  FiltrationType,
  SortingDirection,
} from "@/shared/data/entries-table-filters.data";
import {
  useEntries,
  useEntriesActions,
  useEntriesChangedMethodologyFilterValue,
  useEntriesChangedTagFilterValue,
  useEntriesError,
  useEntriesFilterValues,
  useEntriesFiltrationType,
  useEntriesLoading,
  useEntriesSortingDirection,
} from "@/shared/stores/entries/hooks";
import { FiltersValues } from "@/shared/stores/entries/types";
import { useEntriesStore } from "@/shared/stores/entries/entries-store";
import { PAGES } from "@/shared/constants.ts";

interface SubscribeStateFields extends FiltersValues {
  sortingDirection: SortingDirection;
}

export function EntriesComponent() {
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
  const error = useEntriesError();
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

  useEffect(() => {
    if (error) {
      createToastError(error);
    }
  }, [error]);

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

"use client";

import React, { ChangeEvent, useEffect } from "react";
import { PAGES } from "@/shared/config/pages.config";
import { useRouter } from "next/navigation";
import { EntriesTable } from "@/components/entries/EntriesTable";
import { useShallow } from "zustand/shallow";
import { createToastError } from "@/shared/utils/utils";
import { IEntry } from "@/shared/types/reflection-entry.types";
import {
  useEntriesStore,
  useEntriesStoreApi,
} from "@/shared/stores/entries-store-provider";
import { Loader } from "@/components/public/Loader";
import { Box } from "@chakra-ui/react";
import { EntriesTableFilters } from "@/components/entries/EntriesTableFilters";
import {
  FiltrationType,
  SortingDirection,
} from "@/shared/data/entries-table-filters.data";
import { IFilterItem } from "@/shared/types/types";
import { EntriesStateType } from "@/shared/stores/entries-store";

interface IEntriesSelector {
  entries: IEntry[];
  isLoading: boolean;
  error: Error | null;
  fetchEntries: () => Promise<void>;
  sortingDirection: SortingDirection;
  setSortingDirection: (value: SortingDirection) => void;
  filtrationType: FiltrationType;
  setFiltrationType: (value: FiltrationType) => void;
  fetchFilterValues: () => Promise<void>;
  filterValues: {
    methodologies: IFilterItem[];
    tags: IFilterItem[];
  };
  changedMethodologyFilterValue: string;
  changedTagFilterValue: string;
  setChangedMethodologyFilterValue: (value: string) => void;
  setChangedTagFilterValue: (value: string) => void;
  setChangedDateFilterValue: (value: string) => void;
}

type SelectedEntriesStateType = Pick<
  EntriesStateType,
  | "sortingDirection"
  | "changedMethodologyFilterValue"
  | "changedTagFilterValue"
  | "changedDateFilterValue"
>;

export function EntriesComponent() {
  const entriesStore = useEntriesStoreApi();

  const {
    entries,
    error,
    isLoading,
    fetchEntries,
    sortingDirection,
    setSortingDirection,
    filtrationType,
    setFiltrationType,
    fetchFilterValues,
    filterValues,
    changedMethodologyFilterValue,
    changedTagFilterValue,
    setChangedMethodologyFilterValue,
    setChangedTagFilterValue,
    setChangedDateFilterValue,
  } = useEntriesStore<IEntriesSelector>(
    useShallow((state) => ({
      entries: state.entries,
      isLoading: state.isLoading,
      error: state.error,
      fetchEntries: state.fetchEntries,
      sortingDirection: state.sortingDirection,
      setSortingDirection: state.setSortingDirection,
      filtrationType: state.filtrationType,
      setFiltrationType: state.setFiltrationType,
      fetchFilterValues: state.fetchFilterValues,
      filterValues: state.filterValues,
      changedMethodologyFilterValue: state.changedMethodologyFilterValue,
      changedTagFilterValue: state.changedTagFilterValue,
      setChangedMethodologyFilterValue: state.setChangedMethodologyFilterValue,
      setChangedTagFilterValue: state.setChangedTagFilterValue,
      setChangedDateFilterValue: state.setChangedDateFilterValue,
    })),
  );

  useEffect(() => {
    fetchEntries();
  }, []);

  useEffect(() => {
    const unsubscribe = entriesStore.subscribe(
      (state: SelectedEntriesStateType) => ({
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
  }, [entriesStore]);

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

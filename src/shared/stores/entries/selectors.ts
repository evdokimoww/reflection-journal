import { EntriesStore } from "@/shared/stores/entries/types";

export const entriesActionsSelector = (state: EntriesStore) => state.actions;

export const entriesSelector = (state: EntriesStore) => state.entries;

export const entriesErrorSelector = (state: EntriesStore) => state.error;

export const entriesLoadingSelector = (state: EntriesStore) => state.isLoading;

export const entriesSortingDirectionSelector = (state: EntriesStore) =>
  state.sortingDirection;

export const entriesFiltrationTypeSelector = (state: EntriesStore) =>
  state.filtrationType;

export const entriesFilterValuesSelector = (state: EntriesStore) =>
  state.filterValues;

export const entriesChangedMethodologyFilterValueSelector = (
  state: EntriesStore,
) => state.changedMethodologyFilterValue;

export const entriesChangedTagFilterValueSelector = (state: EntriesStore) =>
  state.changedTagFilterValue;

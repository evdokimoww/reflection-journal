import { EntriesStore } from "@/shared/stores/entries/types";
import { useEntriesStore } from "@/shared/stores/entries/entries-store";
import {
  entriesActionsSelector,
  entriesChangedMethodologyFilterValueSelector,
  entriesChangedTagFilterValueSelector,
  entriesErrorSelector,
  entriesFilterValuesSelector,
  entriesFiltrationTypeSelector,
  entriesLoadingSelector,
  entriesSelector,
  entriesSortingDirectionSelector,
} from "@/shared/stores/entries/selectors";

export const useEntriesActions = (): EntriesStore["actions"] =>
  useEntriesStore(entriesActionsSelector);

export const useEntries = (): EntriesStore["entries"] =>
  useEntriesStore(entriesSelector);

export const useEntriesError = (): EntriesStore["error"] =>
  useEntriesStore(entriesErrorSelector);

export const useEntriesLoading = (): EntriesStore["isLoading"] =>
  useEntriesStore(entriesLoadingSelector);

export const useEntriesSortingDirection =
  (): EntriesStore["sortingDirection"] =>
    useEntriesStore(entriesSortingDirectionSelector);

export const useEntriesFiltrationType = (): EntriesStore["filtrationType"] =>
  useEntriesStore(entriesFiltrationTypeSelector);

export const useEntriesFilterValues = (): EntriesStore["filterValues"] =>
  useEntriesStore(entriesFilterValuesSelector);

export const useEntriesChangedMethodologyFilterValue =
  (): EntriesStore["changedMethodologyFilterValue"] =>
    useEntriesStore(entriesChangedMethodologyFilterValueSelector);

export const useEntriesChangedTagFilterValue =
  (): EntriesStore["changedTagFilterValue"] =>
    useEntriesStore(entriesChangedTagFilterValueSelector);

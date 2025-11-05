import { EntryListItem, FilterItem } from "@/shared/types";
import {
  FiltrationType,
  SortingDirection,
} from "@/shared/data/entries-table-filters.data";

export interface FiltersValues {
  changedMethodologyFilterValue: string;
  changedTagFilterValue: string;
  changedDateFilterValue: string;
}

export interface EntriesState extends FiltersValues {
  entries: EntryListItem[];
  isLoading: boolean;
  error: ResponseError;
  sortingDirection: SortingDirection;
  filtrationType: FiltrationType;
  isFilterValuesLoading: boolean;
  filterValues: {
    methodologies: FilterItem[];
    tags: FilterItem[];
  };
}

export interface EntriesActions {
  fetchEntries: () => Promise<void>;
  setSortingDirection: (value: SortingDirection) => void;
  setFiltrationType: (value: FiltrationType) => void;
  fetchFilterValues: () => Promise<void>;
  setChangedMethodologyFilterValue: (value: string) => void;
  setChangedTagFilterValue: (value: string) => void;
  setChangedDateFilterValue: (value: string) => void;
}

export interface EntriesStore extends EntriesState {
  actions: EntriesActions;
}

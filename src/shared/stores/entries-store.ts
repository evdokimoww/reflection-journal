import { createStore } from "zustand/vanilla";
import type {
  EntryResponseArray,
  IEntry,
} from "@/shared/types/reflection-entry.types";
import {
  getEntriesRequest,
  getFilterValuesRequest,
} from "@/shared/api/entries";
import { format } from "date-fns";
import {
  FiltrationType,
  SortingDirection,
  STATE_FIELDS_BY_FILTRATION_TYPE,
} from "@/shared/data/entries-table-filters.data";
import { getFilterValuesResponseType } from "@/shared/types/api.types";
import { IFilterItem } from "@/shared/types/types";
import { subscribeWithSelector } from "zustand/middleware";

export type FiltersValuesType = {
  changedMethodologyFilterValue: string;
  changedTagFilterValue: string;
  changedDateFilterValue: string;
};

export type EntriesStateType = {
  entries: IEntry[];
  isLoading: boolean;
  error: Error | null;
  sortingDirection: SortingDirection;
  filtrationType: FiltrationType;
  isFilterValuesLoading: boolean;
  filterValues: {
    methodologies: IFilterItem[];
    tags: IFilterItem[];
  };
} & FiltersValuesType;

export type EntriesActionsType = {
  fetchEntries: () => Promise<void>;
  setSortingDirection: (value: SortingDirection) => void;
  setFiltrationType: (value: FiltrationType) => void;
  fetchFilterValues: () => Promise<void>;
  setChangedMethodologyFilterValue: (value: string) => void;
  setChangedTagFilterValue: (value: string) => void;
  setChangedDateFilterValue: (value: string) => void;
};

export type EntriesStore = EntriesStateType & EntriesActionsType;

const initialFiltersValues: FiltersValuesType = {
  changedMethodologyFilterValue: "none",
  changedTagFilterValue: "none",
  changedDateFilterValue: "",
};

export const initEntriesStore = (): EntriesStateType => {
  return {
    entries: [],
    isLoading: false,
    error: null,
    sortingDirection: SortingDirection.Newest,
    filtrationType: FiltrationType.None,
    isFilterValuesLoading: false,
    filterValues: {
      methodologies: [
        {
          label: "не выбрано",
          value: "none",
        },
      ],
      tags: [
        {
          label: "не выбрано",
          value: "none",
        },
      ],
    },
    ...initialFiltersValues,
  };
};

export const defaultInitState: EntriesStateType = initEntriesStore();

export const createEntriesStore = (
  initState: EntriesStateType = defaultInitState,
) => {
  return createStore<EntriesStore>()(
    subscribeWithSelector((set, get) => ({
      ...initState,
      setSortingDirection: (value: SortingDirection) =>
        set({ sortingDirection: value }),
      setFiltrationType: (value: FiltrationType) =>
        set({
          filtrationType: value,
          ...initialFiltersValues,
        }),
      setChangedMethodologyFilterValue: (value: string) =>
        set({ changedMethodologyFilterValue: value }),
      setChangedTagFilterValue: (value: string) =>
        set({ changedTagFilterValue: value }),
      setChangedDateFilterValue: (value: string) =>
        set({ changedDateFilterValue: value }),
      fetchEntries: async () => {
        try {
          set({ isLoading: true, error: null });

          const isSortingAsc =
            get().sortingDirection !== SortingDirection.Newest;

          let filter: { type?: FiltrationType; value?: string } = {};

          const currentFiltrationField =
            STATE_FIELDS_BY_FILTRATION_TYPE[get().filtrationType];

          if (!!currentFiltrationField) {
            filter.type = get().filtrationType;
            filter.value =
              get()[currentFiltrationField as keyof FiltersValuesType];
          }

          const result: { data: EntryResponseArray; error: Error } =
            await getEntriesRequest(isSortingAsc, filter);

          if (!!result.error) {
            throw result.error;
          }

          const mappedEntries = result.data.reduce(
            (acc, entry) => [
              ...acc,
              {
                id: entry.id,
                created_at: format(entry.created_at, "dd.MM.yyyy HH:mm"),
                title: entry.title,
                methodology: entry.methodology.title,
                tags: entry.tags.map((item) => item.tag.value),
              },
            ],
            [] as IEntry[],
          );

          set({ entries: mappedEntries });
        } catch (e) {
          set({ error: e as Error });
        } finally {
          set({ isLoading: false });
        }
      },
      fetchFilterValues: async () => {
        if (
          get().filterValues.methodologies.length > 1 ||
          get().filterValues.tags.length > 1
        ) {
          return;
        }

        try {
          set({ isFilterValuesLoading: true, error: null });

          const { methodologies, tags }: getFilterValuesResponseType =
            await getFilterValuesRequest();

          if (methodologies.error || tags.error) {
            if (methodologies.error && tags.error) {
              throw new Error("Ошибка получения данных для фильтров");
            }

            throw methodologies.error || tags.error;
          }

          set({
            filterValues: {
              methodologies: methodologies.data
                ? methodologies.data.reduce(
                    (acc, m) => [
                      ...acc,
                      {
                        label: m.title,
                        value: m.id,
                      },
                    ],
                    get().filterValues.methodologies,
                  )
                : get().filterValues.methodologies,
              tags: tags.data
                ? tags.data.reduce(
                    (acc, t) => [
                      ...acc,
                      {
                        label: t.value,
                        value: t.id,
                      },
                    ],
                    get().filterValues.tags,
                  )
                : get().filterValues.tags,
            },
          });
        } catch (e) {
          set({ error: e as Error });
        } finally {
          set({ isFilterValuesLoading: false });
        }
      },
    })),
  );
};

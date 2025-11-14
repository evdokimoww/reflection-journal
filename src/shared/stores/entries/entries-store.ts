import {
  EntriesResponseArray,
  EntryListItem,
  FilterValuesResponse,
  ResponseError,
} from "@/shared/types";
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
import { subscribeWithSelector } from "zustand/middleware";
import { DATE_TIME_FORMAT } from "@/shared/constants";
import {
  EntriesState,
  EntriesStore,
  FiltersValues,
} from "@/shared/stores/entries/types";
import { create } from "zustand";

const initialFiltersValues: FiltersValues = {
  changedMethodologyFilterValue: "none",
  changedTagFilterValue: "none",
  changedDateFilterValue: "",
};

export const defaultInitState: EntriesState = {
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

export const useEntriesStore = create<EntriesStore>()(
  subscribeWithSelector((set, get) => ({
    ...defaultInitState,
    actions: {
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

          const filter: { type?: FiltrationType; value?: string } = {};

          const currentFiltrationField =
            STATE_FIELDS_BY_FILTRATION_TYPE[get().filtrationType];

          if (!!currentFiltrationField) {
            filter.type = get().filtrationType;
            filter.value = get()[currentFiltrationField as keyof FiltersValues];
          }

          const {
            data,
            error,
          }: { data: EntriesResponseArray; error: ResponseError } =
            await getEntriesRequest(isSortingAsc, filter);

          if (error) {
            throw error;
          }

          const mappedEntries = data.reduce(
            (acc, entry) => [
              ...acc,
              {
                id: entry.id,
                created_at: format(entry.created_at, DATE_TIME_FORMAT),
                title: entry.title,
                methodology: entry.methodology.title,
                tags: entry.tags.map((item) => item.tag.value),
              },
            ],
            [] as EntryListItem[],
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

          const { methodologies, tags }: FilterValuesResponse =
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
    },
  })),
);

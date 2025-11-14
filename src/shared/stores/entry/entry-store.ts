import {
  CreateEntryRequestData,
  EntryResponseItem,
  Methodology,
  ResponseType,
  UpdateEntryRequestData,
} from "@/shared/types";
import {
  createEntryRequest,
  getCurrentEntryRequest,
  removeEntryRequest,
  updateEntryRequest,
} from "@/shared/api/entries";
import { getMethodologyRequest } from "@/shared/api/methodologies";
import { PAGES } from "@/shared/constants.ts";
import { EntryState, EntryStore } from "@/shared/stores/entry/types";
import { create } from "zustand";

export const defaultInitState: EntryState = {
  entry: null,
  currentMethodology: null,
  isLoading: false,
  isRemoveLoading: false,
  entryError: null,
  methodologyError: null,
  createEntryError: null,
  removeEntryError: null,
};

export const useEntryStore = create<EntryStore>((set, get) => ({
  ...defaultInitState,
  actions: {
    fetchEntry: async (id: string) => {
      try {
        set({ isLoading: true, entryError: null });

        const { data, error }: ResponseType<EntryResponseItem> =
          await getCurrentEntryRequest(id);

        if (error) throw error;

        if (data.methodology.id) {
          get().actions.fetchMethodology(data.methodology.id);
        }

        set({
          entry: {
            id: data.id,
            title: data.title,
            tags: data.tags.map((tag) => ({
              id: tag.tag.id,
              value: tag.tag.value,
            })),
            steps: data.steps,
          },
        });
      } catch (e) {
        set({ entryError: e as Error });
      } finally {
        set({ isLoading: false });
      }
    },
    fetchMethodology: async (id: string) => {
      try {
        set({ isLoading: true, methodologyError: null });

        const { data, error }: ResponseType<Methodology> =
          await getMethodologyRequest(id);

        if (error) throw error;

        set({ currentMethodology: data });
      } catch (e) {
        set({ methodologyError: e as Error });
      } finally {
        set({ isLoading: false });
      }
    },
    createEntry: async (entryData: CreateEntryRequestData, router) => {
      try {
        set({ isLoading: true, createEntryError: null });

        const { data, error }: ResponseType<string> =
          await createEntryRequest(entryData);

        if (error) throw error;

        router.push(PAGES.ENTRY(data));
      } catch (e) {
        set({ createEntryError: e as Error });
      } finally {
        set({ isLoading: false });
      }
    },
    removeEntry: async (entryId, router, showSuccessMessage) => {
      try {
        set({ isRemoveLoading: true, removeEntryError: null });

        const { error }: ResponseType<boolean> =
          await removeEntryRequest(entryId);

        if (error) throw error;

        showSuccessMessage("Запись удалена");
        router.push(PAGES.ENTRIES);
      } catch (e) {
        set({ removeEntryError: e as Error });
      } finally {
        set({ isRemoveLoading: false });
      }
    },
    updateEntry: async (
      entryData: UpdateEntryRequestData,
      router,
      showSuccessMessage,
    ) => {
      try {
        set({ isRemoveLoading: true, removeEntryError: null });

        const currentEntry = get().entry;

        if (currentEntry) {
          const { data, error }: ResponseType<string> =
            await updateEntryRequest(entryData, currentEntry.steps);

          if (error) throw error;

          showSuccessMessage(`Запись "${data}" обновлена`);
          router.push(PAGES.ENTRIES);
        }
      } catch (e) {
        set({ removeEntryError: e as Error });
      } finally {
        set({ isRemoveLoading: false });
      }
    },
    resetState: () => set(defaultInitState),
  },
}));

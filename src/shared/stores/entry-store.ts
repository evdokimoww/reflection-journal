import { createStore } from "zustand/vanilla";
import {
  IEntry,
  IEntryRequestData,
  IEntryResponseItem,
} from "@/shared/types/entry.types";
import type { IMethodology } from "@/shared/types/methodologies.types";
import {
  createEntryRequest,
  getCurrentEntryRequest,
} from "@/shared/api/entries";
import { getMethodologyRequest } from "@/shared/api/methodologies";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { PAGES } from "@/shared/config/pages.config";
import { ResponseType } from "@/shared/types/types";

export type EntryStateType = {
  entry: IEntry | null;
  currentMethodology: IMethodology | null;
  isLoading: boolean;
  entryError: Error | null;
  methodologyError: Error | null;
  createEntryError: Error | null;
};

export type EntryActionsType = {
  fetchEntry: (id: string) => Promise<void>;
  fetchMethodology: (id: string) => Promise<void>;
  resetState: () => void;
  createEntry: (data: IEntryRequestData, router?: AppRouterInstance) => void;
};

export type EntryStore = EntryStateType & EntryActionsType;

export const initEntryStore = (): EntryStateType => {
  return {
    entry: null,
    currentMethodology: null,
    isLoading: false,
    entryError: null,
    methodologyError: null,
    createEntryError: null,
  };
};

export const defaultInitState: EntryStateType = {
  entry: null,
  currentMethodology: null,
  isLoading: false,
  entryError: null,
  methodologyError: null,
  createEntryError: null,
};

export const createEntryStore = (
  initState: EntryStateType = defaultInitState,
) => {
  return createStore<EntryStore>()((set, get) => ({
    ...initState,
    fetchEntry: async (id: string) => {
      try {
        set({ isLoading: true, entryError: null });

        const { data, error }: ResponseType<IEntryResponseItem> =
          await getCurrentEntryRequest(id);

        if (error) throw error;

        if (data.methodology.id) {
          get().fetchMethodology(data.methodology.id);
        }

        set({
          entry: {
            id: data.id,
            title: data.title,
            tags: data.tags.map((tag) => ({
              id: tag.tag.id,
              value: tag.tag.value,
            })),
            steps: data.steps.reduce(
              (acc, step) => ({ ...acc, [step.step_id]: step.value }),
              {},
            ),
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

        const { data, error }: ResponseType<IMethodology> =
          await getMethodologyRequest(id);

        if (error) throw error;

        set({ currentMethodology: data });
      } catch (e) {
        set({ methodologyError: e as Error });
      } finally {
        set({ isLoading: false });
      }
    },
    createEntry: async (entryData: IEntryRequestData, router) => {
      try {
        set({ isLoading: true, createEntryError: null });

        const { data, error }: ResponseType<string> =
          await createEntryRequest(entryData);

        if (error) throw error;

        router?.push(PAGES.ENTRY(data));
      } catch (e) {
        set({ createEntryError: e as Error });
      } finally {
        set({ isLoading: false });
      }
    },
    resetState: () => set(defaultInitState),
  }));
};

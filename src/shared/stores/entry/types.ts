import { EntryItem, EntryRequestData, Methodology } from "@/shared/types";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export interface EntryState {
  entry: EntryItem | null;
  currentMethodology: Methodology | null;
  isLoading: boolean;
  entryError: ResponseError;
  methodologyError: ResponseError;
  createEntryError: ResponseError;
  removeEntryError: ResponseError;
}

export interface EntryActions {
  fetchEntry: (id: string) => Promise<void>;
  fetchMethodology: (id: string) => Promise<void>;
  resetState: () => void;
  createEntry: (data: EntryRequestData, router?: AppRouterInstance) => void;
  removeEntry: (entryId: string, router: AppRouterInstance) => void;
}

export interface EntryStore extends EntryState {
  actions: EntryActions;
}

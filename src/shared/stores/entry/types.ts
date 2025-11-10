import {
  CreateEntryRequestData,
  EntryItem,
  Methodology,
  ResponseError,
  UpdateEntryRequestData,
} from "@/shared/types";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export interface EntryState {
  entry: EntryItem | null;
  currentMethodology: Methodology | null;
  isLoading: boolean;
  isRemoveLoading: boolean;
  entryError: ResponseError;
  methodologyError: ResponseError;
  createEntryError: ResponseError;
  removeEntryError: ResponseError;
}

export type CreateEntryActionType = (
  data: CreateEntryRequestData,
  router: AppRouterInstance,
) => void;

export type UpdateEntryActionType = (
  data: UpdateEntryRequestData,
  router: AppRouterInstance,
  showSuccessMessage: (message: string) => void,
) => void;

export interface EntryActions {
  fetchEntry: (id: string) => Promise<void>;
  fetchMethodology: (id: string) => Promise<void>;
  resetState: () => void;
  createEntry: CreateEntryActionType;
  removeEntry: (
    entryId: string,
    router: AppRouterInstance,
    showSuccessMessage: (message: string) => void,
  ) => void;
  updateEntry: UpdateEntryActionType;
}

export interface EntryStore extends EntryState {
  actions: EntryActions;
}

import { EntryStore } from "@/shared/stores/entry/types";

export const entryActionsSelector = (state: EntryStore) => state.actions;

export const isEntryLoadingSelector = (state: EntryStore) => state.isLoading;

export const entrySelector = (state: EntryStore) => state.entry;

export const entryErrorSelector = (state: EntryStore) =>
  state.entryError || state.methodologyError || state.removeEntryError;

export const currentMethodologySelector = (state: EntryStore) =>
  state.currentMethodology;

export const isRemoveEntryLoadingSelector = (state: EntryStore) =>
  state.isRemoveLoading;

import {
  currentMethodologySelector,
  entryActionsSelector,
  entryErrorSelector,
  entrySelector,
  isEntryLoadingSelector,
} from "@/shared/stores/entry/selectors";
import { EntryStore } from "@/shared/stores/entry/types";
import { useEntryStore } from "@/shared/stores/entry/entry-store";

export const useEntryActions = (): EntryStore["actions"] =>
  useEntryStore(entryActionsSelector);

export const useIsEntryLoading = (): EntryStore["isLoading"] =>
  useEntryStore(isEntryLoadingSelector);

export const useEntry = (): EntryStore["entry"] => useEntryStore(entrySelector);

export const useEntryError = (): ResponseError =>
  useEntryStore(entryErrorSelector);

export const useCurrentMethodology = (): EntryStore["currentMethodology"] =>
  useEntryStore(currentMethodologySelector);

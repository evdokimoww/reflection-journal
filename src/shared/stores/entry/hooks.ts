import {
  currentMethodologySelector,
  entryActionsSelector,
  entryErrorSelector,
  entrySelector,
  isEntryLoadingSelector,
  isRemoveEntryLoadingSelector,
} from "@/shared/stores/entry/selectors";
import { EntryStore } from "@/shared/stores/entry/types";
import { useEntryStore } from "@/shared/stores/entry/entry-store";
import { ResponseError } from "@/shared/types";

export const useEntryActions = (): EntryStore["actions"] =>
  useEntryStore(entryActionsSelector);

export const useIsEntryLoading = (): EntryStore["isLoading"] =>
  useEntryStore(isEntryLoadingSelector);

export const useIsRemoveEntryLoading = (): EntryStore["isRemoveLoading"] =>
  useEntryStore(isRemoveEntryLoadingSelector);

export const useEntry = (): EntryStore["entry"] => useEntryStore(entrySelector);

export const useEntryError = (): ResponseError =>
  useEntryStore(entryErrorSelector);

export const useCurrentMethodology = (): EntryStore["currentMethodology"] =>
  useEntryStore(currentMethodologySelector);

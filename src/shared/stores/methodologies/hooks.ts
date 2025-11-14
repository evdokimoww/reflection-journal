import { MethodologiesStore } from "@/shared/stores/methodologies/types";
import {
  errorSelector,
  isLoadingSelector,
  methodologiesActionsSelector,
  methodologiesSelector,
} from "@/shared/stores/methodologies/selectors";
import { useMethodologiesStore } from "@/shared/stores/methodologies/methodologies-store";

export const useMethodologiesActions = (): MethodologiesStore["actions"] =>
  useMethodologiesStore(methodologiesActionsSelector);

export const useMethodologies = (): MethodologiesStore["methodologies"] =>
  useMethodologiesStore(methodologiesSelector);

export const useMethodologiesError = (): MethodologiesStore["error"] =>
  useMethodologiesStore(errorSelector);

export const useIsMethodologiesLoading = (): MethodologiesStore["isLoading"] =>
  useMethodologiesStore(isLoadingSelector);

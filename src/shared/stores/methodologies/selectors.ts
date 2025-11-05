import { MethodologiesStore } from "@/shared/stores/methodologies/types";

export const methodologiesActionsSelector = (state: MethodologiesStore) =>
  state.actions;

export const isLoadingSelector = (state: MethodologiesStore) => state.isLoading;

export const methodologiesSelector = (state: MethodologiesStore) =>
  state.methodologies;

export const errorSelector = (state: MethodologiesStore) => state.error;

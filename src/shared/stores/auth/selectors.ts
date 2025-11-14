import { AuthStore } from "@/shared/stores/auth/types";

export const authActionsSelector = (state: AuthStore) => state.actions;

export const errorSelector = (state: AuthStore) => state.error;

export const authModeSelector = (state: AuthStore) => state.authMode;

export const isLoadingSelector = (state: AuthStore) => state.isLoading;

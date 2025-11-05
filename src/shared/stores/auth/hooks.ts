import { AuthStore } from "@/shared/stores/auth/types";
import { useAuthStore } from "@/shared/stores/auth/auth-store";
import {
  authActionsSelector,
  authModeSelector,
  errorSelector,
  isLoadingSelector,
} from "@/shared/stores/auth/selectors";

export const useAuthActions = (): AuthStore["actions"] =>
  useAuthStore(authActionsSelector);

export const useAuthError = (): AuthStore["error"] =>
  useAuthStore(errorSelector);

export const useAuthMode = (): AuthStore["authMode"] =>
  useAuthStore(authModeSelector);

export const useIsAuthLoading = (): AuthStore["isLoading"] =>
  useAuthStore(isLoadingSelector);

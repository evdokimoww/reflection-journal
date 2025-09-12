import { createStore } from "zustand/vanilla";
import { AuthMode } from "@/shared/types/auth.types";

export type AuthState = {
  authMode: AuthMode;
  isLoading: boolean;
};

export type AuthActions = {
  setAuthMode: (mode: AuthMode) => void;
  setIsLoading: (isLoading: boolean) => void;
};

export type AuthStore = AuthState & AuthActions;

export const initAuthStore = (): AuthState => {
  return { authMode: AuthMode.Login, isLoading: false };
};

export const defaultInitState: AuthState = {
  authMode: AuthMode.Login,
  isLoading: false,
};

export const createAuthStore = (initState: AuthState = defaultInitState) => {
  return createStore<AuthStore>()((set) => ({
    ...initState,
    setAuthMode: (mode) => set(() => ({ authMode: mode })),
    setIsLoading: (isLoading) => set(() => ({ isLoading })),
  }));
};

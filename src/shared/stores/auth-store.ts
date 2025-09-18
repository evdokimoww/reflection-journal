import { createStore } from "zustand/vanilla";
import {
  AuthMode,
  type IAuthForm,
  type IForgotPasswordForm,
  type IUpdatePasswordForm,
} from "@/shared/types/auth.types";
import {
  forgotPasswordRequest,
  signInRequest,
  signUpRequest,
  updatePasswordRequest,
} from "@/shared/api/auth";

export type AuthState = {
  authMode: AuthMode;
  isLoading: boolean;
  error: Error | null;
};

export type AuthActions = {
  setAuthMode: (mode: AuthMode) => void;
  fetchSignUp: (formData: IAuthForm) => Promise<void>;
  fetchSignIn: (formData: IAuthForm) => Promise<void>;
  fetchForgotPassword: (formData: IForgotPasswordForm) => Promise<void>;
  fetchUpdatePassword: (formData: IUpdatePasswordForm) => Promise<void>;
};

export type AuthStore = AuthState & AuthActions;

export const initAuthStore = (): AuthState => {
  return { authMode: AuthMode.Login, isLoading: false, error: null };
};

export const defaultInitState: AuthState = {
  authMode: AuthMode.Login,
  isLoading: false,
  error: null,
};

async function fetchAuth<T>(
  request: (data: T) => Promise<{ error: Error | null }>,
  requestData: T,
  setAction: (state: Partial<AuthState>) => void,
) {
  try {
    setAction({ isLoading: true, error: null });
    const { error } = await request(requestData);

    if (error) throw error;
  } catch (e) {
    setAction({ error: e as Error });
  } finally {
    setAction({ isLoading: false });
  }
}

export const createAuthStore = (initState: AuthState = defaultInitState) => {
  return createStore<AuthStore>()((set) => ({
    ...initState,
    setAuthMode: (mode) => set(() => ({ authMode: mode })),
    fetchSignUp: (formData: IAuthForm) =>
      fetchAuth<IAuthForm>(signUpRequest, formData, set),
    fetchSignIn: async (formData: IAuthForm) =>
      fetchAuth<IAuthForm>(signInRequest, formData, set),
    fetchForgotPassword: async (formData: IForgotPasswordForm) =>
      fetchAuth<IForgotPasswordForm>(forgotPasswordRequest, formData, set),
    fetchUpdatePassword: async (formData: IUpdatePasswordForm) =>
      fetchAuth<IUpdatePasswordForm>(updatePasswordRequest, formData, set),
  }));
};

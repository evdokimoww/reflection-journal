import {
  AuthForm,
  AuthMode,
  ForgotPasswordForm,
  UpdatePasswordForm,
} from "@/shared/types";
import {
  forgotPasswordRequest,
  signInRequest,
  signOutRequest,
  signUpRequest,
  updatePasswordRequest,
} from "@/shared/api/auth";
import { AuthState, AuthStore } from "@/shared/stores/auth/types";
import { create } from "zustand";

export const defaultInitState: AuthState = {
  authMode: AuthMode.Login,
  isLoading: false,
  error: null,
};

async function fetchAuth<T>(
  request: (data: T) => Promise<{ error: ResponseError }>,
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

export const useAuthStore = create<AuthStore>((set) => ({
  ...defaultInitState,
  actions: {
    setAuthMode: (mode) => set(() => ({ authMode: mode })),
    fetchSignUp: (formData: AuthForm) =>
      fetchAuth<AuthForm>(signUpRequest, formData, set),
    fetchSignIn: async (formData: AuthForm) =>
      fetchAuth<AuthForm>(signInRequest, formData, set),
    fetchForgotPassword: async (formData: ForgotPasswordForm) =>
      fetchAuth<ForgotPasswordForm>(forgotPasswordRequest, formData, set),
    fetchUpdatePassword: async (formData: UpdatePasswordForm) =>
      fetchAuth<UpdatePasswordForm>(updatePasswordRequest, formData, set),
    fetchSignOut: async () => {
      try {
        set({ isLoading: true, error: null });
        const { error } = await signOutRequest();

        if (error) throw error;
      } catch (e) {
        set({ error: e as Error });
      } finally {
        set({ isLoading: false });
      }
    },
  },
}));

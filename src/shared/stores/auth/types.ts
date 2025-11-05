import {
  AuthMode,
  AuthForm,
  ForgotPasswordForm,
  UpdatePasswordForm,
} from "@/shared/types";

export interface AuthState {
  authMode: AuthMode;
  isLoading: boolean;
  error: ResponseError;
}

export interface AuthActions {
  setAuthMode: (mode: AuthMode) => void;
  fetchSignUp: (formData: AuthForm) => Promise<void>;
  fetchSignIn: (formData: AuthForm) => Promise<void>;
  fetchForgotPassword: (formData: ForgotPasswordForm) => Promise<void>;
  fetchUpdatePassword: (formData: UpdatePasswordForm) => Promise<void>;
  fetchSignOut: () => Promise<void>;
}

export interface AuthStore extends AuthState {
  actions: AuthActions;
}

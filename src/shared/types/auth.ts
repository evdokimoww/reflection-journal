export enum AuthMode {
  Login = "Вход",
  Registration = "Регистрация",
}

export interface AuthForm {
  email: string;
  password: string;
}

export interface ForgotPasswordForm {
  email: string;
}

export interface UpdatePasswordForm {
  password: string;
}

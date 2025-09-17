export enum AuthMode {
  Login = "Вход",
  Registration = "Регистрация",
}

export interface IAuthForm {
  email: string;
  password: string;
}

export interface IForgotPasswordForm {
  email: string;
}

export interface IUpdatePasswordForm {
  password: string;
}

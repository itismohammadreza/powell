import {Type} from '@angular/core';
import {LoginPage} from '@modules/auth/pages/login/login.page';
import {RegisterPage} from '@modules/auth/pages/register/register.page';
import {AuthPage} from "@modules/auth/auth.page";

export const COMPONENTS: Type<any>[] = [
  AuthPage,
  LoginPage,
  RegisterPage
];

import {Type} from '@angular/core';
import {LoginPage} from '@modules/auth/pages/login/login.page';
import {RegisterPage} from '@modules/auth/pages/register/register.page';
import {AuthPage} from "@modules/auth/auth.page";
import {AuthRoutingModule} from "@modules/auth/auth-routing.module";
import {InputTextModule} from "@powell/components/input-text";
import {ButtonModule} from "@powell/components/button";
import {CheckboxModule} from "@powell/components/checkbox";
import {ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {LogoComponent} from "@modules/layout/logo/logo.component";

export const DECLARATIONS: Type<any>[] = [
  AuthPage,
  LoginPage,
  RegisterPage
];

export const IMPORTS: Type<any>[] = [
  ReactiveFormsModule,
  AuthRoutingModule,
  InputTextModule,
  ButtonModule,
  CheckboxModule,
  CommonModule,
  LogoComponent,
];

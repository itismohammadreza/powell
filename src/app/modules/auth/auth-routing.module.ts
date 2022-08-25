import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginPage} from '@modules/auth/pages/login/login.page';
import {RegisterPage} from '@modules/auth/pages/register/register.page';
import {AuthPage} from "@modules/auth/auth.page";

const routes: Routes = [
  {
    path: '',
    component: AuthPage,
    children: [
      {
        path: 'login',
        component: LoginPage,
      },
      {
        path: 'register',
        component: RegisterPage,
      },
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {
}

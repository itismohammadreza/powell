import {NgModule, Type} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AuthGuard} from '@core/guard';
import {NotFoundPage} from "@modules/layout/not-found/not-found.page";

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: (): Promise<Type<any>> =>
      import('./modules/auth/auth.module').then((m) => m.AuthModule),
    // canLoad: [PagesGuard],
  },
  {
    path: '',
    loadChildren: (): Promise<Type<any>> =>
      import('@modules/main/main.module').then((m) => m.MainModule),
    // canLoad: [AuthGuard],
  },
  {
    path: '404',
    component: NotFoundPage
  },
  {
    path: '**',
    redirectTo: '/404',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      initialNavigation: 'enabledBlocking',
      scrollPositionRestoration: 'top',
      relativeLinkResolution: 'legacy'
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {
}

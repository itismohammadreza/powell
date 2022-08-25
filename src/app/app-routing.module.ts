import {NgModule, Type} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AuthGuard} from '@core/guard';

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
    path: '**',
    redirectTo: '',
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

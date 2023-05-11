import {inject, NgModule} from '@angular/core';
import {Router, RouterModule, Routes, UrlSegment} from '@angular/router';
import {NotFoundPage} from "@modules/layout/not-found/not-found.page";
import {AuthService} from "@core/http";

const canActivate = (next: any) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  if (authService.hasToken()) {
    return true;
  } else {
    router.navigate(['/auth/login'], {queryParams: {returnUrl: next.path}});
    return false;
  }
}

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./modules/auth/auth.module').then((m) => m.AuthModule),
    // canMatch: [AlreadyLoggedInGuard],
  },
  {
    path: '',
    loadChildren: () => import('@modules/main/main.module').then((m) => m.MainModule),
    // canMatch: [canActivate],
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
      scrollPositionRestoration: 'top'
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {
}

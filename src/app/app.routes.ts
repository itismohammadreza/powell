import {Routes} from '@angular/router';

export const routes: Routes = [
  {
    path: 'auth',
    loadComponent: () => import('@layout/auth-layout/auth-layout.component').then((m) => m.AuthLayoutComponent),
    children: [
      {
        path: 'login',
        loadComponent: () => import('@pages/login/login.page').then((m) => m.LoginPage),
        title: 'ورود'
      },
      {
        path: 'register',
        loadComponent: () => import('@pages/register/register.page').then((m) => m.RegisterPage),
        title: 'ثبت نام'
      },
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    loadComponent: () => import('@layout/main-layout/main-layout.component').then((m) => m.MainLayoutComponent),
    // resolve: {user: userResolver},
    children: [
      {
        path: 'showcase',
        loadChildren: () => import('@pages/showcase/showcase.module').then((m) => m.ShowcaseModule),
        // permissions usage :
        // data: {permissions: routePermissions['showcase']}
      },
      {
        path: '',
        redirectTo: 'showcase',
        pathMatch: 'full'
      },
    ],
  },
  {
    path: '404',
    loadComponent: () => import('@pages/not-found/not-found.page').then((m) => m.NotFoundPage),
  },
  {
    path: '**',
    redirectTo: '/404',
    pathMatch: 'full',
  },
];

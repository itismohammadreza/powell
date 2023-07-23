import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {MainPage} from './main.page';
import {userResolver} from "@core/guard";
import {routePermissions} from "@core/config";

const routes: Routes = [
  {
    path: '',
    component: MainPage,
    // resolve: {user: userResolver},
    children: [
      {
        path: 'showcase',
        loadChildren: () => import('./pages/showcase/showcase.module').then((m) => m.ShowcaseModule),
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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {
}

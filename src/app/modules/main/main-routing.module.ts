import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {MainPage} from './main.page';

const routes: Routes = [
  {
    path: '',
    component: MainPage,
    children: [
      // {
      //   path: 'showcase',
      //   data: {title: 'پیشنمایش'},
      //   loadChildren: (): Promise<any> =>
      //     import('./pages/showcase/showcase.module').then((m) => m.ShowcaseModule),
      // },
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

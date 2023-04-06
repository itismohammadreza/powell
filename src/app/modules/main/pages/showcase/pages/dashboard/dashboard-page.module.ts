import {NgModule} from '@angular/core';
import {RouterModule} from "@angular/router";
import {
  BlocksComponent,
  BubblesComponent,
  DashboardPage,
  EmojiComponent,
  SmokeComponent,
  SpaceComponent,
  WelcomeComponent
} from "@modules/main/pages/showcase/pages/dashboard";
import {CommonModule} from "@angular/common";

@NgModule({
  declarations: [
    DashboardPage,
    WelcomeComponent,
    EmojiComponent,
    BlocksComponent,
    SpaceComponent,
    BubblesComponent,
    SmokeComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{path: '', component: DashboardPage}])
  ]
})
export class DashboardPageModule {
}

import {Component} from '@angular/core';
import {CommonModule} from "@angular/common";
import {WelcomeComponent} from "@modules/main/pages/showcase/pages/dashboard/welcome/welcome.component";
import {EmojiComponent} from "@modules/main/pages/showcase/pages/dashboard/emoji/emoji.component";
import {BlocksComponent} from "@modules/main/pages/showcase/pages/dashboard/blocks/blocks.component";
import {SpaceComponent} from "@modules/main/pages/showcase/pages/dashboard/space/space.component";
import {BubblesComponent} from "@modules/main/pages/showcase/pages/dashboard/bubbles/bubbles.component";
import {SmokeComponent} from "@modules/main/pages/showcase/pages/dashboard/smoke/smoke.component";

@Component({
  selector: 'ng-dashboard-page',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  imports: [
    CommonModule,
    WelcomeComponent,
    EmojiComponent,
    BlocksComponent,
    SpaceComponent,
    BubblesComponent,
    SmokeComponent,
  ]
})
export class DashboardPage {
}

import {Component} from '@angular/core';
import {CommonModule} from "@angular/common";
import {EmojiComponent} from "@modules/main/pages/showcase/pages/dashboard/emoji/emoji.component";
import {BlocksComponent} from "@modules/main/pages/showcase/pages/dashboard/blocks/blocks.component";

@Component({
  selector: 'ng-dashboard-page',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  imports: [
    CommonModule,
    EmojiComponent,
    BlocksComponent,
    // WelcomeComponent,
    // SpaceComponent,
    // BubblesComponent,
    // SmokeComponent,
  ]
})
export class DashboardPage {
}

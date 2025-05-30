import {Component} from '@angular/core';
import {CommonModule} from "@angular/common";
import {EmojiComponent} from "@modules/main/pages/showcase/pages/home/emoji/emoji.component";
import {BlocksComponent} from "@modules/main/pages/showcase/pages/home/blocks/blocks.component";
import {WelcomeComponent} from "@modules/main/pages/showcase/pages/home/welcome/welcome.component";
import {SpaceComponent} from "@modules/main/pages/showcase/pages/home/space/space.component";
import {BubblesComponent} from "@modules/main/pages/showcase/pages/home/bubbles/bubbles.component";
import {SmokeComponent} from "@modules/main/pages/showcase/pages/home/smoke/smoke.component";

@Component({
  selector: 'ng-dashboard-page',
  templateUrl: './dashboard.page.html',
  imports: [
    CommonModule,
    EmojiComponent,
    BlocksComponent,
    WelcomeComponent,
    SpaceComponent,
    BubblesComponent,
    SmokeComponent,
  ]
})
export class HomePage {
}

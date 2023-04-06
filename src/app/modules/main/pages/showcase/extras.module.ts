import {NgModule} from '@angular/core';
import {WelcomeComponent} from "@modules/main/pages/showcase/components/welcome/welcome.component";
import {EmojiComponent} from "@modules/main/pages/showcase/components/emoji/emoji.component";
import {BlocksComponent} from "@modules/main/pages/showcase/components/blocks/blocks.component";
import {SpaceComponent} from "@modules/main/pages/showcase/components/space/space.component";
import {BubblesComponent} from "@modules/main/pages/showcase/components/bubbles/bubbles.component";
import {
  PreviewOptionsComponent
} from "@modules/main/pages/showcase/components/preview-options/preview-options.component";
import {SmokeComponent} from "@modules/main/pages/showcase/components/smoke/smoke.component";
import {PrimeCardModule, PrimeDividerModule, PrimePanelModule} from "@ng/primeng";
import {CommonModule} from "@angular/common";
import {ConfigHandlerModule} from "@ng/directives/config-handler";
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
  declarations: [
    WelcomeComponent,
    EmojiComponent,
    BlocksComponent,
    SpaceComponent,
    BubblesComponent,
    PreviewOptionsComponent,
    SmokeComponent,
  ],
  exports: [
    WelcomeComponent,
    EmojiComponent,
    BlocksComponent,
    SpaceComponent,
    BubblesComponent,
    PreviewOptionsComponent,
    SmokeComponent,
    PrimeCardModule,
    PrimePanelModule,
    PrimeDividerModule,
    TranslateModule
  ],
  imports: [
    CommonModule,
    PrimeDividerModule,
    ConfigHandlerModule
  ]
})
export class ExtrasModule {
}

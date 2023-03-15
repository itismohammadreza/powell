import {NgModule} from '@angular/core';
import {CardModule} from "primeng/card";
import {PanelModule} from "primeng/panel";
import {COMPONENTS} from './index';
import {CoreModule} from '@core/core.module';
import {ShowcaseRoutingModule} from '@modules/main/pages/showcase/showcase-routing.module';
import {SharedModule} from "@shared/shared.module";
import {DividerModule} from "primeng/divider";
import {ConfigHandlerModule} from "@ng/directives/config-handler";

@NgModule({
  declarations: [...COMPONENTS,],
  exports: [...COMPONENTS],
  imports: [
    //
    CardModule,
    PanelModule,
    DividerModule,
    //
    ShowcaseRoutingModule,
    //
    SharedModule,
    CoreModule,
    ConfigHandlerModule,

  ]
})
export class ShowcaseModule {
}

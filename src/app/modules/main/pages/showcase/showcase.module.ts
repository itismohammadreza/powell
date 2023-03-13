import {NgModule} from '@angular/core';
import {CoreModule} from '@core/core.module';
import {SharedModule} from '@shared/shared.module';
import {COMPONENTS} from './index';
import {FormsModule} from '@angular/forms';
import {ShowcaseRoutingModule} from '@modules/main/pages/showcase/showcase-routing.module';
import {AutoCompleteModule} from "@ng/components/auto-complete";

@NgModule({
  declarations: [...COMPONENTS,],
  exports: [...COMPONENTS],
  imports: [
    ShowcaseRoutingModule,
    FormsModule,
    SharedModule,
    CoreModule,
    AutoCompleteModule
  ]
})
export class ShowcaseModule {
}

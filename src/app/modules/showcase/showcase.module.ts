import {NgModule} from '@angular/core';
import {CoreModule} from '@core/core.module';
import {SharedModule} from '@shared/shared.module';
import {COMPONENTS} from '.';
import {FormsModule} from '@angular/forms';
import {ShowcaseRoutingModule} from '@modules/showcase/showcase-routing.module';

@NgModule({
  declarations: [...COMPONENTS,],
  exports: [...COMPONENTS],
  imports: [ShowcaseRoutingModule, FormsModule, SharedModule, CoreModule],
})
export class ShowcaseModule {
}

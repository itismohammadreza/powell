import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CoreModule} from '@core/core.module';
import {SharedModule} from '@shared/shared.module';
import {COMPONENTS} from './index';
import {FormsModule} from '@angular/forms';
import {ShowcaseRoutingModule} from '@modules/main/pages/showcase/showcase-routing.module';

@NgModule({
  declarations: [...COMPONENTS,],
  exports: [...COMPONENTS],
  imports: [ShowcaseRoutingModule, FormsModule, SharedModule, CoreModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ShowcaseModule {
}

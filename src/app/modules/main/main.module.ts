import {NgModule} from '@angular/core';
import {SharedModule} from '@shared/shared.module';
import {MainRoutingModule} from './main-routing.module';
import {COMPONENTS} from ".";

@NgModule({
  declarations: [...COMPONENTS],
  imports: [MainRoutingModule, SharedModule],
})
export class MainModule {
}

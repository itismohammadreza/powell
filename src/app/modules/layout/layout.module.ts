import {NgModule} from '@angular/core';
import {StatusModule} from '@ng/components/status';
import {COMPONENTS} from './index';

@NgModule({
  declarations: [...COMPONENTS],
  exports: [...COMPONENTS],
  imports: [StatusModule]
})
export class LayoutModule {
}

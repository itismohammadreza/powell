import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {COMPONENTS} from '.';

@NgModule({
  declarations: [...COMPONENTS],
  exports: [
    ...COMPONENTS,
  ],
  imports: [
    CommonModule,
  ],
})
export class SharedModule {
}

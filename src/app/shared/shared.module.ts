import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TranslateModule} from '@ngx-translate/core';
import {COMPONENTS, PRIME_MODULES} from '.';

@NgModule({
  declarations: [...COMPONENTS],
  imports: [
    CommonModule,
    TranslateModule.forChild(),
  ],
  exports: [
    ...COMPONENTS,
    ...PRIME_MODULES,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    TranslateModule,
  ]
})
export class SharedModule {
}

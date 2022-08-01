import {CommonModule} from '@angular/common';
import {NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {NgAllModule} from '@ng/all.module';
import {TranslateModule} from '@ngx-translate/core';
import {COMPONENTS} from '.';

@NgModule({
  declarations: [...COMPONENTS],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    TranslateModule.forChild(),
    RouterModule,
    NgAllModule.forRoot({ripple: true})
  ],
  exports: [
    ...COMPONENTS,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    TranslateModule,
    NgAllModule
  ],
  providers: [],
  schemas: [NO_ERRORS_SCHEMA]
})
export class SharedModule {
}

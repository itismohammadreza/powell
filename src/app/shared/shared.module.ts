import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
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
    NgAllModule.forRoot()
  ],
  exports: [
    ...COMPONENTS,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    TranslateModule,
    NgAllModule
  ]
})
export class SharedModule {
}

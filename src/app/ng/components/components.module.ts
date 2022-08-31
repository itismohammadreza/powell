import {CommonModule} from '@angular/common';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LeafletModule} from '@asymmetrik/ngx-leaflet';
import {NgPipesModule} from '@ng/pipes/pipes.module';
import {NgxSuneditorModule} from "ngx-suneditor";

import {COMPONENTS} from '.';
import {NgDirectivesModule} from '../directives/directives.module';
import {PrimeNgModule} from '../prime-modules/prime-ng.module';

@NgModule({
  declarations: [...COMPONENTS],
  exports: [...COMPONENTS, PrimeNgModule, NgDirectivesModule, NgPipesModule],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PrimeNgModule,
    LeafletModule,
    NgDirectivesModule,
    NgPipesModule,
    NgxSuneditorModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NgComponentsModule {
}

import {CommonModule} from '@angular/common';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LeafletModule} from '@asymmetrik/ngx-leaflet';
import {NgPipesModule} from '@ng/pipes/pipes.module';
// import { DpDatePickerModule } from 'ng2-jalali-date-picker';
import {COMPONENTS} from '.';
import {NgDirectivesModule} from '../directives/directives.module';
import {PrimeNgModule} from '../prime-modules/prime-ng.module';
import {NgxSuneditorModule} from "ngx-suneditor";

@NgModule({
  declarations: [...COMPONENTS],
  exports: [...COMPONENTS, PrimeNgModule, NgDirectivesModule, NgPipesModule],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    // DpDatePickerModule,
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

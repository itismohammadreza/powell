import {CommonModule} from '@angular/common';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LeafletModule} from '@asymmetrik/ngx-leaflet';
import {NgPipesModule} from '@ng/pipes/pipes.module';
// import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
// import { DpDatePickerModule } from 'ng2-jalali-date-picker';
// import 'froala-editor/js/languages/de.js';
// import 'froala-editor/js/plugins.pkgd.min.js';
// import 'froala-editor/js/plugins/align.min.js';
// import 'froala-editor/js/third_party/embedly.min';
// import 'froala-editor/js/third_party/font_awesome.min';
// import 'froala-editor/js/third_party/image_tui.min';
// import 'froala-editor/js/third_party/spell_checker.min';
import {COMPONENTS} from '.';
import {NgDirectivesModule} from '../directives/directives.module';
import {PrimeNgModule} from '../prime-modules/prime-ng.module';
import {NgxSuneditorModule} from "ngx-suneditor";
// import { CellButtonComponent } from './grid/cell-button/cell-button.component';
// import { CellDatepickerComponent } from './grid/cell-datepicker/cell-datepicker.component';
// import { CellImageComponent } from './grid/cell-image/cell-image.component';

@NgModule({
  declarations: [...COMPONENTS],
  exports: [...COMPONENTS, PrimeNgModule, NgDirectivesModule, NgPipesModule],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    // DpDatePickerModule,
    PrimeNgModule,
    // FroalaEditorModule.forRoot(),
    // FroalaViewModule.forRoot(),
    LeafletModule,
    NgDirectivesModule,
    NgPipesModule,
    NgxSuneditorModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class NgComponentsModule {
}

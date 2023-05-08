import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {TableComponent} from "@powell/components/table";
import {EmptyModule} from "@powell/components/empty";
import {InputTextModule} from "@powell/components/input-text";
import {ButtonModule} from "@powell/components/button";
import {ImageModule} from "@powell/components/image";
import {GregorianDatepickerModule} from "@powell/components/gregorian-datepicker";
import {CheckboxModule} from "@powell/components/checkbox";
import {SliderModule} from "@powell/components/slider";
import {DropdownModule} from "@powell/components/dropdown";
import {MultiSelectModule} from "@powell/components/multi-select";
import {InputNumberModule} from "@powell/components/input-number";
import {FormsModule} from "@angular/forms";
import {PrimeTableModule, PrimeTooltipModule} from "@powell/primeng";
import {TemplateModule} from "@powell/directives/template";
import {ConfigHandlerModule} from "@powell/directives/config-handler";

@NgModule({
  declarations: [TableComponent],
  exports: [TableComponent, TemplateModule],
  imports: [
    PrimeTableModule,
    EmptyModule,
    InputTextModule,
    MultiSelectModule,
    InputNumberModule,
    PrimeTooltipModule,
    ButtonModule,
    GregorianDatepickerModule,
    SliderModule,
    DropdownModule,
    CheckboxModule,
    ImageModule,
    CommonModule,
    FormsModule,
    ConfigHandlerModule
  ],
})
export class TableModule {
}

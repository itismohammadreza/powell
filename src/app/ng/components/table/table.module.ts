import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {ConfigHandlerModule} from "@ng/directives/config-handler";
import {TableComponent} from "@ng/components/table";
import {EmptyModule} from "@ng/components/empty";
import {InputTextModule} from "@ng/components/input-text";
import {ButtonModule} from "@ng/components/button";
import {ImageModule} from "@ng/components/image";
import {GregorianDatepickerModule} from "@ng/components/gregorian-datepicker";
import {CheckboxModule} from "@ng/components/checkbox";
import {SliderModule} from "@ng/components/slider";
import {DropdownModule} from "@ng/components/dropdown";
import {MultiSelectModule} from "@ng/components/multi-select";
import {InputNumberModule} from "@ng/components/input-number";
import {FormsModule} from "@angular/forms";
import {PrimeTableModule, PrimeTooltipModule} from "@ng/primeng";
import {TemplateModule} from "@ng/directives/template";

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
    ConfigHandlerModule,
    GregorianDatepickerModule,
    SliderModule,
    DropdownModule,
    CheckboxModule,
    ImageModule,
    CommonModule,
    FormsModule
  ],
})
export class TableModule {
}

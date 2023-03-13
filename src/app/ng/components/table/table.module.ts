import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {TableModule as PTableModule} from 'primeng/table';
import {TooltipModule} from "primeng/tooltip";
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

@NgModule({
  declarations: [TableComponent],
  imports: [
    PTableModule,
    EmptyModule,
    InputTextModule,
    MultiSelectModule,
    InputNumberModule,
    TooltipModule,
    ButtonModule,
    ConfigHandlerModule,
    GregorianDatepickerModule,
    SliderModule,
    DropdownModule,
    CheckboxModule,
    ImageModule,
    CommonModule
  ],
  exports: [TableComponent]
})
export class TableModule {
}

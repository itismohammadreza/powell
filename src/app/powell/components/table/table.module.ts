import {NgModule} from "@angular/core";
import {NgClass, NgStyle, NgTemplateOutlet} from "@angular/common";
import {TableComponent} from "@powell/components/table";
import {EmptyModule} from "@powell/components/empty";
import {InputTextModule} from "@powell/components/input-text";
import {ButtonModule} from "@powell/components/button";
import {DatepickerModule} from "@powell/components/datepicker";
import {CheckboxModule} from "@powell/components/checkbox";
import {SliderModule} from "@powell/components/slider";
import {SelectModule} from "@powell/components/select";
import {MultiSelectModule} from "@powell/components/multi-select";
import {InputNumberModule} from "@powell/components/input-number";
import {FormsModule} from "@angular/forms";
import {$BarsIcon, $TableModule, $TimesIcon, $TooltipModule} from "@powell/primeng";
import {TemplateModule} from "@powell/directives/template";

@NgModule({
  declarations: [TableComponent],
  exports: [TableComponent, TemplateModule],
  imports: [
    $TableModule,
    EmptyModule,
    InputTextModule,
    MultiSelectModule,
    InputNumberModule,
    $TooltipModule,
    ButtonModule,
    DatepickerModule,
    SliderModule,
    SelectModule,
    CheckboxModule,
    NgTemplateOutlet,
    NgStyle,
    NgClass,
    FormsModule,
    $TimesIcon,
    $BarsIcon,
  ],
})
export class TableModule {
}

import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {$AutoCompleteModule} from "@powell/primeng";
import {AutoCompleteComponent} from "@powell/components/auto-complete";
import {LabelStarModule} from "@powell/pipes/label-star";
import {TemplateModule} from "@powell/directives/template";
import {ElementAdditionsModule} from "@powell/components/element-additions";
import {InputText} from "primeng/inputtext";
import {TimesIcon} from "primeng/icons";

@NgModule({
  declarations: [AutoCompleteComponent],
  exports: [AutoCompleteComponent, TemplateModule],
  imports: [
    $AutoCompleteModule,
    CommonModule,
    FormsModule,
    LabelStarModule,
    ElementAdditionsModule,
    InputText,
    TimesIcon,
  ]
})
export class AutoCompleteModule {
}

import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {SelectComponent} from "@powell/components/select";
import {LabelStarModule} from "@powell/pipes/label-star";
import {$SelectModule} from "@powell/primeng";
import {TemplateModule} from "@powell/directives/template";
import {ElementAdditionsModule} from "@powell/components/element-additions";

@NgModule({
  declarations: [SelectComponent],
  exports: [SelectComponent, TemplateModule],
  imports: [
    $SelectModule,
    CommonModule,
    FormsModule,
    LabelStarModule,
    ElementAdditionsModule,
  ],
})
export class SelectModule {
}

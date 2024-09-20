import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {AddonModule} from "@powell/directives/addon";
import {ChipsComponent} from "@powell/components/chips";
import {LabelStarModule} from "@powell/pipes/label-star";
import {$ChipsModule} from "@powell/primeng";
import {TemplateModule} from "@powell/directives/template";

@NgModule({
  declarations: [ChipsComponent],
  exports: [ChipsComponent, TemplateModule],
  imports: [
    $ChipsModule,
    CommonModule,
    FormsModule,
    LabelStarModule,
    AddonModule
  ],
})
export class ChipsModule {
}

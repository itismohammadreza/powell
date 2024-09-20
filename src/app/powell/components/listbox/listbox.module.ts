import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {AddonModule} from "@powell/directives/addon";
import {LabelStarModule} from "@powell/pipes/label-star";
import {ListboxComponent} from "@powell/components/listbox";
import {$ListboxModule} from "@powell/primeng";
import {TemplateModule} from "@powell/directives/template";

@NgModule({
  declarations: [ListboxComponent],
  exports: [ListboxComponent, TemplateModule],
  imports: [
    $ListboxModule,
    CommonModule,
    FormsModule,
    LabelStarModule,
    AddonModule
  ],
})
export class ListboxModule {
}

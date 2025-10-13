import {NgModule} from "@angular/core";
import {NgTemplateOutlet} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {LabelStarModule} from "@powell/pipes/label-star";
import {ListboxComponent} from "@powell/components/listbox";
import {$ListboxModule} from "@powell/primeng";
import {TemplateModule} from "@powell/directives/template";
import {FormFieldModule} from "@powell/components/form-field";

@NgModule({
  declarations: [ListboxComponent],
  exports: [ListboxComponent, TemplateModule],
  imports: [
    $ListboxModule,
    NgTemplateOutlet,
    FormsModule,
    LabelStarModule,
    FormFieldModule,
  ],
})
export class ListboxModule {
}

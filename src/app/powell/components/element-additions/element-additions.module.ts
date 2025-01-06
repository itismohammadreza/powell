import {NgModule} from "@angular/core";
import {
  $FloatLabelModule,
  $IconFieldModule,
  $IftaLabelModule,
  $InputGroupAddonModule,
  $InputGroupModule,
  $InputIconModule
} from "@powell/primeng";
import {ElementAdditionsComponent} from "@powell/components/element-additions/element-additions.component";
import {CommonModule} from "@angular/common";
import {TemplateModule} from "@powell/directives/template";

@NgModule({
  declarations: [ElementAdditionsComponent],
  exports: [ElementAdditionsComponent, TemplateModule],
  imports: [
    CommonModule,
    $IftaLabelModule,
    $FloatLabelModule,
    $IconFieldModule,
    $InputIconModule,
    $InputGroupModule,
    $InputGroupAddonModule,
    TemplateModule
  ],
})
export class ElementAdditionsModule {
}

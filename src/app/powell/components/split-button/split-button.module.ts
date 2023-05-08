import {NgModule} from "@angular/core";
import {SplitButtonComponent} from "@powell/components/split-button";
import {PrimeSplitButtonModule} from "@powell/primeng";
import {TemplateModule} from "@powell/directives/template";
import {ConfigHandlerModule} from "@powell/directives/config-handler";

@NgModule({
  declarations: [SplitButtonComponent],
  exports: [SplitButtonComponent, TemplateModule],
  imports: [PrimeSplitButtonModule, ConfigHandlerModule],
})
export class SplitButtonModule {
}

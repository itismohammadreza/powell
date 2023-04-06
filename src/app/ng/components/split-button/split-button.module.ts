import {NgModule} from "@angular/core";
import {SplitButtonComponent} from "@ng/components/split-button";
import {ConfigHandlerModule} from "@ng/directives/config-handler";
import {PrimeSplitButtonModule} from "@ng/primeng";
import {TemplateModule} from "@ng/directives/template";

@NgModule({
  declarations: [SplitButtonComponent],
  exports: [SplitButtonComponent, TemplateModule],
  imports: [PrimeSplitButtonModule, ConfigHandlerModule],
})
export class SplitButtonModule {
}

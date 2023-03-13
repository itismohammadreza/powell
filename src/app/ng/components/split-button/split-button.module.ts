import {NgModule} from "@angular/core";
import {SplitButtonModule as PSplitButtonModule} from 'primeng/splitbutton';
import {SplitButtonComponent} from "@ng/components/split-button";
import {ConfigHandlerModule} from "@ng/directives/config-handler";

@NgModule({
  declarations: [SplitButtonComponent],
  imports: [PSplitButtonModule, ConfigHandlerModule],
  exports: [SplitButtonComponent]
})
export class SplitButtonModule {
}

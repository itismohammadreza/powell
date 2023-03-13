import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {ConfigHandlerModule} from "@ng/directives/config-handler";
import {StatusComponent} from "@ng/components/status";

@NgModule({
  declarations: [StatusComponent],
  imports: [ConfigHandlerModule, CommonModule],
  exports: [StatusComponent]
})
export class StatusModule {
}

import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {StatusComponent} from "@powell/components/status";
import {ConfigHandlerModule} from "@powell/directives/config-handler";

@NgModule({
  declarations: [StatusComponent],
  exports: [StatusComponent],
  imports: [CommonModule],
})
export class StatusModule {
}

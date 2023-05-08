import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {EmptyComponent} from "@powell/components/empty";
import {ConfigHandlerModule} from "@powell/directives/config-handler";

@NgModule({
  declarations: [EmptyComponent],
  exports: [EmptyComponent],
  imports: [CommonModule, ConfigHandlerModule],
})
export class EmptyModule {
}

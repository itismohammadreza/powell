import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {EmptyComponent} from "@ng/components/empty";
import {ConfigHandlerModule} from "@ng/directives/config-handler";

@NgModule({
  declarations: [EmptyComponent],
  imports: [CommonModule, ConfigHandlerModule],
  exports: [EmptyComponent]
})
export class EmptyModule {
}

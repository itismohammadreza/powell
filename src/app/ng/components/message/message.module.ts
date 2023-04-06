import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {MessageComponent} from "@ng/components/message";
import {ConfigHandlerModule} from "@ng/directives/config-handler";
import {PrimeMessagesModule} from "@ng/primeng";
import {TemplateModule} from "@ng/directives/template";

@NgModule({
  declarations: [MessageComponent],
  exports: [MessageComponent, TemplateModule],
  imports: [PrimeMessagesModule, ConfigHandlerModule, CommonModule],
})
export class MessageModule {
}

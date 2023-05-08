import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {MessageComponent} from "@powell/components/message";
import {PrimeMessagesModule} from "@powell/primeng";
import {TemplateModule} from "@powell/directives/template";
import {ConfigHandlerModule} from "@powell/directives/config-handler";

@NgModule({
  declarations: [MessageComponent],
  exports: [MessageComponent, TemplateModule],
  imports: [PrimeMessagesModule, CommonModule, ConfigHandlerModule],
})
export class MessageModule {
}

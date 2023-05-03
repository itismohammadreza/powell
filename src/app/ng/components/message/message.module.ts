import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {MessageComponent} from "@ng/components/message";
import {PrimeMessagesModule} from "@ng/primeng";
import {TemplateModule} from "@ng/directives/template";

@NgModule({
  declarations: [MessageComponent],
  exports: [MessageComponent, TemplateModule],
  imports: [PrimeMessagesModule, CommonModule],
})
export class MessageModule {
}

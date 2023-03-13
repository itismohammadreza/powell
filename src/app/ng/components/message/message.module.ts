import {NgModule} from "@angular/core";
import {MessageModule as PMessageModule} from 'primeng/message';
import {MessagesModule as PMessagesModule} from 'primeng/messages';
import {CommonModule} from "@angular/common";
import {MessageComponent} from "@ng/components/message";

@NgModule({
  declarations: [MessageComponent],
  imports: [PMessageModule, PMessagesModule, CommonModule],
  exports: [MessageComponent]
})
export class MessageModule {
}

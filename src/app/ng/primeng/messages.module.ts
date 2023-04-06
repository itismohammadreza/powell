import {NgModule} from '@angular/core';
import {MessagesModule} from "primeng/messages";
import {MessageModule} from "primeng/message";

@NgModule({
  exports: [MessagesModule, MessageModule]
})
export class PrimeMessagesModule {
}

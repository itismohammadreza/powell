import {NgModule} from '@angular/core';
import {MessagesModule, Messages} from "primeng/messages";
import {MessageModule, UIMessage} from "primeng/message";

@NgModule({
  exports: [MessagesModule, MessageModule]
})
export class PrimeMessagesModule {
}

export const PrimeMessages = Messages;
export const PrimeMessage = UIMessage;

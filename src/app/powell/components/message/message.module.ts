import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {MessageComponent} from "@powell/components/message";
import {TemplateModule} from "@powell/directives/template";
import {$MessageModule} from "@powell/primeng";

@NgModule({
  declarations: [MessageComponent],
  exports: [MessageComponent, TemplateModule],
  imports: [$MessageModule, CommonModule],
})
export class MessageModule {
}

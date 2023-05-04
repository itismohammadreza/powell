import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {StatusComponent} from "@powell/components/status";

@NgModule({
  declarations: [StatusComponent],
  exports: [StatusComponent],
  imports: [CommonModule],
})
export class StatusModule {
}

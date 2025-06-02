import {NgModule} from "@angular/core";
import {AsyncPipe, NgTemplateOutlet} from "@angular/common";
import {SuspenseComponent} from "@powell/components/suspense";
import {$ProgressSpinnerModule} from "@powell/primeng";
import {TemplateModule} from "@powell/directives/template";

@NgModule({
  declarations: [SuspenseComponent],
  exports: [SuspenseComponent, TemplateModule],
  imports: [$ProgressSpinnerModule, NgTemplateOutlet, AsyncPipe],
})
export class SuspenseModule {
}

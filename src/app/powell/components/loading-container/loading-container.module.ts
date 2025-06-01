import {NgModule} from "@angular/core";
import {NgTemplateOutlet} from "@angular/common";
import {LoadingContainerComponent} from "@powell/components/loading-container";
import {$ProgressSpinnerModule} from "@powell/primeng";
import {TemplateModule} from "@powell/directives/template";

@NgModule({
  declarations: [LoadingContainerComponent],
  exports: [LoadingContainerComponent, TemplateModule],
  imports: [$ProgressSpinnerModule, NgTemplateOutlet],
})
export class LoadingContainerModule {
}

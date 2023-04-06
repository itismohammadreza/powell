import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {LoadingContainerComponent} from "@ng/components/loading-container";
import {PrimeProgressSpinnerModule} from "@ng/primeng";
import {TemplateModule} from "@ng/directives/template";

@NgModule({
  declarations: [LoadingContainerComponent],
  exports: [LoadingContainerComponent, TemplateModule],
  imports: [PrimeProgressSpinnerModule, CommonModule],
})
export class LoadingContainerModule {
}

import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {LoadingContainerComponent} from "@powell/components/loading-container";
import {PrimeProgressSpinnerModule} from "@powell/primeng";
import {TemplateModule} from "@powell/directives/template";

@NgModule({
  declarations: [LoadingContainerComponent],
  exports: [LoadingContainerComponent, TemplateModule],
  imports: [PrimeProgressSpinnerModule, CommonModule],
})
export class LoadingContainerModule {
}

import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {ProgressSpinnerModule} from "primeng/progressspinner";
import {LoadingContainerComponent} from "@ng/components/loading-container";

@NgModule({
  declarations: [LoadingContainerComponent],
  imports: [ProgressSpinnerModule, CommonModule],
  exports: [LoadingContainerComponent]
})
export class LoadingContainerModule {
}

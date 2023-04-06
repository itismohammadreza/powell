import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {InfiniteScrollComponent} from "@ng/components/infinite-scroll";
import {PrimeProgressSpinnerModule} from "@ng/primeng";
import {TemplateModule} from "@ng/directives/template";

@NgModule({
  declarations: [InfiniteScrollComponent],
  exports: [InfiniteScrollComponent, TemplateModule],
  imports: [PrimeProgressSpinnerModule, CommonModule],
})
export class InfiniteScrollModule {
}

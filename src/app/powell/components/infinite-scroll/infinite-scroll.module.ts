import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {InfiniteScrollComponent} from "@powell/components/infinite-scroll";
import {PrimeProgressSpinnerModule} from "@powell/primeng";
import {TemplateModule} from "@powell/directives/template";

@NgModule({
  declarations: [InfiniteScrollComponent],
  exports: [InfiniteScrollComponent, TemplateModule],
  imports: [PrimeProgressSpinnerModule, CommonModule],
})
export class InfiniteScrollModule {
}

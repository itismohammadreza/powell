import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {InfiniteScrollComponent} from "@ng/components/infinite-scroll";
import {ProgressSpinnerModule} from "primeng/progressspinner";

@NgModule({
  declarations: [InfiniteScrollComponent],
  imports: [ProgressSpinnerModule, CommonModule],
  exports: [InfiniteScrollComponent]
})
export class InfiniteScrollModule {
}

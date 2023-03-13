import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {ProgressSpinnerModule} from "primeng/progressspinner";
import {InfiniteScrollComponent} from "@ng/components/infinite-scroll";

@NgModule({
  declarations: [InfiniteScrollComponent],
  imports: [ProgressSpinnerModule, CommonModule],
  exports: [InfiniteScrollComponent]
})
export class InfiniteScrollModule {
}

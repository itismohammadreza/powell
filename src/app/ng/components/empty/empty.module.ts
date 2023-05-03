import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {EmptyComponent} from "@ng/components/empty";

@NgModule({
  declarations: [EmptyComponent],
  exports: [EmptyComponent],
  imports: [CommonModule],
})
export class EmptyModule {
}

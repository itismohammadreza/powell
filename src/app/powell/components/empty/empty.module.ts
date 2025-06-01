import {NgModule} from "@angular/core";
import {NgClass} from "@angular/common";
import {EmptyComponent} from "@powell/components/empty";

@NgModule({
  declarations: [EmptyComponent],
  exports: [EmptyComponent],
  imports: [NgClass],
})
export class EmptyModule {
}

import {NgModule} from "@angular/core";
import {AutoCompleteComponent} from "@ng/components/auto-complete";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [AutoCompleteComponent],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [AutoCompleteComponent]
})
export class AnimateOnScrollModule {
}

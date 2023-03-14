import {NgModule} from "@angular/core";
import {ButtonModule as PButtonModule} from 'primeng/button';
import {CommonModule} from "@angular/common";
import {ButtonComponent} from "@ng/components/button";

@NgModule({
  declarations: [ButtonComponent],
  imports: [PButtonModule, CommonModule],
  exports: [ButtonComponent]
})
export class ButtonModule {
}

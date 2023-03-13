import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {DynamicDialogComponent} from "@ng/components/dynamic-dialog";

@NgModule({
  declarations: [DynamicDialogComponent],
  imports: [CommonModule],
  exports: [DynamicDialogComponent]
})
export class DynamicDialogModule {
}

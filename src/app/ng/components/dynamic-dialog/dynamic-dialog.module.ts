import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {DynamicDialogComponent} from "@ng/components/dynamic-dialog";
import {DynamicDialogService} from "@ng/services";

@NgModule({
  declarations: [DynamicDialogComponent],
  imports: [CommonModule],
  exports: [DynamicDialogComponent],
  providers: [DynamicDialogService]
})
export class DynamicDialogModule {
}

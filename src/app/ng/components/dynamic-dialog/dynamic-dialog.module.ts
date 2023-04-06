import {NgModule} from "@angular/core";
import {DynamicDialogComponent} from "@ng/components/dynamic-dialog";

// import {DynamicDialogService} from "@ng/api";

@NgModule({
  declarations: [DynamicDialogComponent],
  exports: [DynamicDialogComponent],
  // providers: [DynamicDialogService]
})
export class DynamicDialogModule {
}

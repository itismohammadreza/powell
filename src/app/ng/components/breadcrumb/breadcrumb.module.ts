import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {BreadcrumbComponent} from "@ng/components/breadcrumb";
import {PrimeBreadcrumbModule} from "@ng/primeng";

@NgModule({
  declarations: [BreadcrumbComponent],
  exports: [BreadcrumbComponent],
  imports: [PrimeBreadcrumbModule, CommonModule],
})
export class BreadcrumbModule {
}

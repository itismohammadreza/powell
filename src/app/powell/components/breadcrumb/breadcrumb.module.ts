import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {BreadcrumbComponent} from "@powell/components/breadcrumb";
import {PrimeBreadcrumbModule} from "@powell/primeng";

@NgModule({
  declarations: [BreadcrumbComponent],
  exports: [BreadcrumbComponent],
  imports: [PrimeBreadcrumbModule, CommonModule],
})
export class BreadcrumbModule {
}

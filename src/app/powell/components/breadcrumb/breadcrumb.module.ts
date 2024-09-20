import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {BreadcrumbComponent} from "@powell/components/breadcrumb";
import {$BreadcrumbModule} from "@powell/primeng";

@NgModule({
  declarations: [BreadcrumbComponent],
  exports: [BreadcrumbComponent],
  imports: [$BreadcrumbModule, CommonModule],
})
export class BreadcrumbModule {
}

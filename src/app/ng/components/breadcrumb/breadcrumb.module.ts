import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {BreadcrumbModule as PBreadcrumbModule} from 'primeng/breadcrumb';
import {BreadcrumbComponent} from "@ng/components/breadcrumb";

@NgModule({
  declarations: [BreadcrumbComponent],
  imports: [PBreadcrumbModule, CommonModule],
  exports: [BreadcrumbComponent]
})
export class BreadcrumbModule {
}

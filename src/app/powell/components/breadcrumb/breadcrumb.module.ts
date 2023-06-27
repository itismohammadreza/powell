import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {BreadcrumbComponent} from "@powell/components/breadcrumb";
import {PrimeBreadcrumbModule} from "@powell/primeng";
import {ConfigHandlerModule} from "@powell/directives/config-handler";

@NgModule({
  declarations: [BreadcrumbComponent],
  exports: [BreadcrumbComponent],
  imports: [PrimeBreadcrumbModule, CommonModule, ConfigHandlerModule],
})
export class BreadcrumbModule {
}

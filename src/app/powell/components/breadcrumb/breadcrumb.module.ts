import {NgModule} from "@angular/core";
import {AsyncPipe} from "@angular/common";
import {BreadcrumbComponent} from "@powell/components/breadcrumb";
import {$BreadcrumbModule} from "@powell/primeng";

@NgModule({
  declarations: [BreadcrumbComponent],
  exports: [BreadcrumbComponent],
  imports: [$BreadcrumbModule, AsyncPipe],
})
export class BreadcrumbModule {
}

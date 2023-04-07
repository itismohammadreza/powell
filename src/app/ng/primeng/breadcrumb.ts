import {NgModule} from '@angular/core';
import {Breadcrumb, BreadcrumbModule} from "primeng/breadcrumb";

@NgModule({
  exports: [BreadcrumbModule]
})
export class PrimeBreadcrumbModule {
}

export const PrimeBreadcrumb = Breadcrumb;
export type PrimeBreadcrumb = Breadcrumb;

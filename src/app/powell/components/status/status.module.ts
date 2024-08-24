import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {StatusComponent} from "@powell/components/status";
import {TemplateModule} from "@powell/directives/template";
import {PrimeCheckIcon, PrimeExclamationTriangleIcon, PrimeInfoCircleIcon, PrimeTimesCircleIcon} from "@powell/primeng";

@NgModule({
  declarations: [StatusComponent],
  exports: [StatusComponent, TemplateModule],
  imports: [
    CommonModule,
    TemplateModule,
    PrimeCheckIcon,
    PrimeExclamationTriangleIcon,
    PrimeInfoCircleIcon,
    PrimeTimesCircleIcon
  ],
})
export class StatusModule {
}

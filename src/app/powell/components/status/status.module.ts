import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {StatusComponent} from "@powell/components/status";
import {TemplateModule} from "@powell/directives/template";
import {$CheckIcon, $ExclamationTriangleIcon, $InfoCircleIcon, $TimesCircleIcon} from "@powell/primeng";

@NgModule({
  declarations: [StatusComponent],
  exports: [StatusComponent, TemplateModule],
  imports: [
    CommonModule,
    TemplateModule,
    $CheckIcon,
    $ExclamationTriangleIcon,
    $InfoCircleIcon,
    $TimesCircleIcon
  ],
})
export class StatusModule {
}

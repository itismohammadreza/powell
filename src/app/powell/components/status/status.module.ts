import {NgModule} from "@angular/core";
import {NgTemplateOutlet} from "@angular/common";
import {StatusComponent} from "@powell/components/status";
import {TemplateModule} from "@powell/directives/template";
import {$CheckIcon, $ExclamationTriangleIcon, $InfoCircleIcon, $TimesCircleIcon} from "@powell/primeng";

@NgModule({
  declarations: [StatusComponent],
  exports: [StatusComponent, TemplateModule],
  imports: [
    NgTemplateOutlet,
    TemplateModule,
    $CheckIcon,
    $ExclamationTriangleIcon,
    $InfoCircleIcon,
    $TimesCircleIcon
  ],
})
export class StatusModule {
}

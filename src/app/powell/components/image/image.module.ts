import {NgModule} from "@angular/core";
import {NgStyle, NgTemplateOutlet} from "@angular/common";
import {ImageComponent} from "@powell/components/image";
import {
  $EyeIcon,
  $FocusTrapModule,
  $ImageModule,
  $RefreshIcon,
  $SearchMinusIcon,
  $SearchPlusIcon,
  $TimesIcon,
  $UndoIcon
} from "@powell/primeng";
import {TemplateModule} from "@powell/directives/template";
import {PinchZoomModule} from "@powell/components/pinch-zoom";

@NgModule({
  declarations: [ImageComponent],
  exports: [ImageComponent, TemplateModule],
  imports: [
    $ImageModule,
    PinchZoomModule,
    NgStyle,
    NgTemplateOutlet,
    $RefreshIcon,
    $EyeIcon,
    $UndoIcon,
    $SearchMinusIcon,
    $SearchPlusIcon,
    $TimesIcon,
    $FocusTrapModule
  ],
})
export class ImageModule {
}

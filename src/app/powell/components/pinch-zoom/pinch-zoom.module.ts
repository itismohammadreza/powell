import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {PinchZoomComponent} from "@powell/components/pinch-zoom";

@NgModule({
  declarations: [PinchZoomComponent],
  exports: [PinchZoomComponent],
  imports: [CommonModule],
})
export class PinchZoomModule {
}

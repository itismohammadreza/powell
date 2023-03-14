import {NgModule} from "@angular/core";
import {ImageModule as PImageModule} from 'primeng/image';
import {CommonModule} from "@angular/common";
import {ImageComponent, PinchZoomComponent} from "@ng/components/image";

@NgModule({
  declarations: [ImageComponent, PinchZoomComponent],
  imports: [PImageModule, CommonModule],
  exports: [ImageComponent]
})
export class ImageModule {
}

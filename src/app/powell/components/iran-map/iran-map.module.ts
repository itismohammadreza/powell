import {NgModule} from "@angular/core";
import {NgStyle} from "@angular/common";
import {IranMapComponent} from "@powell/components/iran-map";
import {LabelStarModule} from "@powell/pipes/label-star";
import {FormFieldModule} from "@powell/components/form-field";

@NgModule({
  declarations: [IranMapComponent],
  exports: [IranMapComponent],
  imports: [
    LabelStarModule,
    NgStyle,
    FormFieldModule,
  ],
})
export class IranMapModule {
}

import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {IranMapComponent} from "@powell/components/iran-map";
import {LabelStarModule} from "@powell/pipes/label-star";
import {ElementAdditionsModule} from "@powell/components/element-additions";

@NgModule({
  declarations: [IranMapComponent],
  exports: [IranMapComponent],
  imports: [
    LabelStarModule,
    CommonModule,
    ElementAdditionsModule,
  ],
})
export class IranMapModule {
}

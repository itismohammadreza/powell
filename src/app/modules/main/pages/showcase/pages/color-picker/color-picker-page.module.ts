import {NgModule} from "@angular/core";
import {ColorPickerModule} from "@powell/components/color-picker";
import {ExtrasModule} from "@modules/main/pages/showcase/extras.module";
import {RouterModule} from "@angular/router";
import {ColorPickerPage} from "@modules/main/pages/showcase/pages/color-picker";
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [ColorPickerPage],
  imports: [
    ColorPickerModule,
    ReactiveFormsModule,
    ExtrasModule,
    RouterModule.forChild([{path: '', component: ColorPickerPage}])
  ],
})
export class ColorPickerPageModule {
}

import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {ReactiveFormsModule} from "@angular/forms";
import {DialogComponent, DialogFormComponent, DynamicDialogComponent} from '.';
import {
  $ConfirmDialogModule,
  $ConfirmPopupModule,
  $DialogModule,
  $DynamicDialogModule,
  $ToastModule
} from "@powell/primeng";
import {SafeModule} from "@powell/pipes/safe";
import {ButtonModule} from "@powell/components/button";
import {AutoCompleteModule} from "@powell/components/auto-complete";
import {CascadeSelectModule} from "@powell/components/cascade-select";
import {CheckboxModule} from "@powell/components/checkbox";
import {ChipsModule} from "@powell/components/chips";
import {ColorPickerModule} from "@powell/components/color-picker";
import {DropdownModule} from "@powell/components/dropdown";
import {DualLabelSwitchModule} from "@powell/components/dual-label-switch";
import {EditorModule} from "@powell/components/editor";
import {FilePickerModule} from "@powell/components/file-picker";
import {FilePicker2Module} from "@powell/components/file-picker2";
import {DatepickerModule} from "@powell/components/datepicker";
import {ImageModule} from "@powell/components/image";
import {InputMaskModule} from "@powell/components/input-mask";
import {InputNumberModule} from "@powell/components/input-number";
import {InputOtpModule} from "@powell/components/input-otp";
import {InputPasswordModule} from "@powell/components/input-password";
import {InputTextModule} from "@powell/components/input-text";
import {InputTextareaModule} from "@powell/components/input-textarea";
import {IranMapModule} from "@powell/components/iran-map";
import {KnobModule} from "@powell/components/knob";
import {ListboxModule} from "@powell/components/listbox";
import {MapModule} from "@powell/components/map";
import {MessageModule} from "@powell/components/message";
import {CheckboxGroupModule} from "src/app/powell/components/checkbox-group";
import {MultiSelectModule} from "@powell/components/multi-select";
import {RadioModule} from "@powell/components/radio";
import {RatingModule} from "@powell/components/rating";
import {SelectButtonModule} from "@powell/components/select-button";
import {SliderModule} from "@powell/components/slider";
import {SwitchModule} from "@powell/components/switch";
import {ToggleButtonModule} from "@powell/components/toggle-button";
import {TreeModule} from "@powell/components/tree";
import {TreeSelectModule} from "@powell/components/tree-select";
import {TriStateCheckboxModule} from "@powell/components/tri-state-checkbox";

@NgModule({
  declarations: [
    DialogComponent,
    DialogFormComponent,
    DynamicDialogComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    $ConfirmDialogModule,
    $ConfirmPopupModule,
    $DialogModule,
    $ToastModule,
    SafeModule,
    AutoCompleteModule,
    ButtonModule,
    CascadeSelectModule,
    CheckboxModule,
    ChipsModule,
    ColorPickerModule,
    DropdownModule,
    DualLabelSwitchModule,
    EditorModule,
    FilePickerModule,
    FilePicker2Module,
    DatepickerModule,
    ImageModule,
    InputMaskModule,
    InputNumberModule,
    InputOtpModule,
    InputPasswordModule,
    InputTextModule,
    InputTextareaModule,
    IranMapModule,
    KnobModule,
    ListboxModule,
    MapModule,
    MessageModule,
    CheckboxGroupModule,
    MultiSelectModule,
    RadioModule,
    RatingModule,
    SelectButtonModule,
    SliderModule,
    SwitchModule,
    ToggleButtonModule,
    TreeModule,
    TreeSelectModule,
    TriStateCheckboxModule
  ],
  exports: [
    $DynamicDialogModule,
    $DialogModule,
  ],
})
export class OverlayModule {
}
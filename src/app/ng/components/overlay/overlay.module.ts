import {NgModule} from '@angular/core';
import {ConfirmationService, MessageService} from "primeng/api";
import {DialogService} from "primeng/dynamicdialog";
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmPopupModule} from 'primeng/confirmpopup';
import {DialogModule} from 'primeng/dialog';
import {DynamicDialogModule} from 'primeng/dynamicdialog';
import {ToastModule} from 'primeng/toast';
import {Dialog2Component, DialogComponent, DialogFormComponent} from '.';
import {OverlayService} from "@ng/api";
import {ButtonModule} from "@ng/components/button";
import {SafeModule} from "@ng/pipes/safe";
import {CommonModule} from "@angular/common";
import {AutoCompleteModule} from "@ng/components/auto-complete";
import {CascadeSelectModule} from "@ng/components/cascade-select";
import {CheckboxModule} from "@ng/components/checkbox";
import {ChipsModule} from "@ng/components/chips";
import {ColorPickerModule} from "@ng/components/color-picker";
import {DropdownModule} from "@ng/components/dropdown";
import {DualLabelSwitchModule} from "@ng/components/dual-label-switch";
import {EditorModule} from "@ng/components/editor";
import {FilePickerModule} from "@ng/components/file-picker";
import {FilePicker2Module} from "@ng/components/file-picker2";
import {GregorianDatepickerModule} from "@ng/components/gregorian-datepicker";
import {ImageModule} from "@ng/components/image";
import {InputMaskModule} from "@ng/components/input-mask";
import {InputNumberModule} from "@ng/components/input-number";
import {InputOtpModule} from "@ng/components/input-otp";
import {InputPasswordModule} from "@ng/components/input-password";
import {InputTextModule} from "@ng/components/input-text";
import {InputTextareaModule} from "@ng/components/input-textarea";
import {MapModule} from "@ng/components/map";
import {IranMapModule} from "@ng/components/iran-map";
import {JalaliDatepickerModule} from "@ng/components/jalali-datepicker";
import {KnobModule} from "@ng/components/knob";
import {ListboxModule} from "@ng/components/listbox";
import {MessageModule} from "@ng/components/message";
import {MultiCheckboxModule} from "@ng/components/multi-checkbox";
import {MultiSelectModule} from "@ng/components/multi-select";
import {RadioModule} from "@ng/components/radio";
import {RatingModule} from "@ng/components/rating";
import {SelectButtonModule} from "@ng/components/select-button";
import {SliderModule} from "@ng/components/slider";
import {SwitchModule} from "@ng/components/switch";
import {ToggleButtonModule} from "@ng/components/toggle-button";
import {TreeModule} from "@ng/components/tree";
import {TreeSelectModule} from "@ng/components/tree-select";
import {TriStateCheckboxModule} from "@ng/components/tri-state-checkbox";
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    DialogComponent,
    DialogFormComponent,
    Dialog2Component
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ConfirmDialogModule,
    ConfirmPopupModule,
    DialogModule,
    DynamicDialogModule,
    ToastModule,
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
    GregorianDatepickerModule,
    ImageModule,
    InputMaskModule,
    InputNumberModule,
    InputOtpModule,
    InputPasswordModule,
    InputTextModule,
    InputTextareaModule,
    IranMapModule,
    JalaliDatepickerModule,
    KnobModule,
    ListboxModule,
    MapModule,
    MessageModule,
    MultiCheckboxModule,
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
    DialogComponent,
    DialogFormComponent,
    Dialog2Component
  ],
  providers: [
    // OverlayService,
    MessageService,
    DialogService,
    ConfirmationService
  ]
})
export class OverlayModule {
}

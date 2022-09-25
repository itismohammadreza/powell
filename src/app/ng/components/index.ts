import {Type} from '@angular/core';
/***************************** FORM *****************************/
import {AutoCompleteComponent} from "@ng/components/auto-complete/auto-complete.component";
import {CascadeSelectComponent} from "@ng/components/cascade-select/cascade-select.component";
import {CheckboxComponent} from "@ng/components/checkbox/checkbox.component";
import {ChipsComponent} from "@ng/components/chips/chips.component";
import {ColorPickerComponent} from "@ng/components/color-picker/color-picker.component";
import {DropdownComponent} from "@ng/components/dropdown/dropdown.component";
import {EditorComponent} from "@ng/components/editor/editor.component";
import {GregorianDatepickerComponent} from "@ng/components/gregorian-datepicker/gregorian-datepicker.component";
import {InputMaskComponent} from "@ng/components/input-mask/input-mask.component";
import {SwitchComponent} from "@ng/components/switch/switch.component";
import {InputTextComponent} from "@ng/components/input-text/input-text.component";
import {InputTextareaComponent} from "@ng/components/input-textarea/input-textarea.component";
import {InputNumberComponent} from "@ng/components/input-number/input-number.component";
import {KnobComponent} from "@ng/components/knob/knob.component";
import {ListboxComponent} from "@ng/components/listbox/listbox.component";
import {MultiCheckboxComponent} from "@ng/components/multi-checkbox/multi-checkbox.component";
import {MultiSelectComponent} from "@ng/components/multi-select/multi-select.component";
import {InputPasswordComponent} from "@ng/components/input-password/input-password.component";
import {RadioComponent} from "@ng/components/radio/radio.component";
import {RatingComponent} from "@ng/components/rating/rating.component";
import {SliderComponent} from "@ng/components/slider/slider.component";
import {SelectButtonComponent} from "@ng/components/select-button/select-button.component";
import {JalaliDatepickerComponent} from "@ng/components/jalali-datepicker/jalali-datepicker.component";
import {ToggleButtonComponent} from "@ng/components/toggle-button/toggle-button.component";
import {TreeSelectComponent} from "@ng/components/tree-select/tree-select.component";
import {TriStateCheckboxComponent} from "@ng/components/tri-state-checkbox/tri-state-checkbox.component";

/***************************** BUTTONS *****************************/
import {ButtonComponent} from "@ng/components/button/button.component";
import {SplitButtonComponent} from "@ng/components/split-button/split-button.component";

/***************************** DATA *****************************/
import {InfiniteScrollComponent} from "@ng/components/infinite-scroll/infinite-scroll.component";
import {MapComponent} from "@ng/components/map/map.component";
import {TableComponent} from "@ng/components/table/table.component";
import {TreeComponent} from "@ng/components/tree/tree.component";

/***************************** OVERLAY *****************************/
import {BottomSheetComponent} from "@ng/components/bottom-sheet/bottom-sheet.component";
import {DialogComponent} from "@ng/components/dialog/dialog.component";
import {DynamicDialogComponent} from "@ng/components/dynamic-dialog/dynamic-dialog.component";
import {Dialog2Component} from "@ng/components/dialog2/dialog2.component";
// import {DialogFormComponent} from "@ng/components/dialog-form/dialog-form.component";

/***************************** UPLOAD *****************************/
import {FilePickerComponent} from "@ng/components/file-picker/file-picker.component";
import {FilePicker2Component} from "@ng/components/file-picker2/file-picker2.component";

/***************************** MENU *****************************/
import {BreadcrumbComponent} from "@ng/components/breadcrumb/breadcrumb.component";

/***************************** MENU *****************************/
import {MessageComponent} from "@ng/components/message/message.component";

/***************************** MEDIA *****************************/
import {ImageComponent} from "@ng/components/image/image.component";
import {ImageSliderComponent} from "@ng/components/image-slider/image-slider.component";

/***************************** MISC *****************************/
import {EmptyComponent} from "@ng/components/empty/empty.component";
import {LoadingComponent} from "@ng/components/loading/loading.component";
import {StatusComponent} from "@ng/components/status/status.component";
import {DualLabelSwitchComponent} from "@ng/components/dual-label-switch/dual-label-switch.component";
import {LoadingContainerComponent} from "@ng/components/loading-container/loading-container.component";
import {DialogFormComponent} from "@ng/components/dialog-form/dialog-form.component";

export const COMPONENTS: Type<any>[] = [
  /***************************** FORM *************************/
  AutoCompleteComponent,
  CascadeSelectComponent,
  CheckboxComponent,
  ChipsComponent,
  ColorPickerComponent,
  DropdownComponent,
  DualLabelSwitchComponent,
  EditorComponent,
  GregorianDatepickerComponent,
  InputMaskComponent,
  SwitchComponent,
  InputNumberComponent,
  InputPasswordComponent,
  InputTextComponent,
  InputTextareaComponent,
  JalaliDatepickerComponent,
  KnobComponent,
  ListboxComponent,
  MultiCheckboxComponent,
  MultiSelectComponent,
  RadioComponent,
  RatingComponent,
  SliderComponent,
  SelectButtonComponent,
  ToggleButtonComponent,
  TreeSelectComponent,
  TriStateCheckboxComponent,
  /***************************** BUTTONS *************************/
  ButtonComponent,
  SplitButtonComponent,
  /***************************** DATA *************************/
  InfiniteScrollComponent,
  MapComponent,
  TableComponent,
  TreeComponent,
  /***************************** OVERLAY *************************/
  BottomSheetComponent,
  DialogComponent,
  DynamicDialogComponent,
  Dialog2Component,
  DialogFormComponent,
  /***************************** UPLOAD *************************/
  FilePickerComponent,
  FilePicker2Component,
  /***************************** MENU *************************/
  BreadcrumbComponent,
  /***************************** MESSAGES *************************/
  MessageComponent,
  /***************************** MEDIA *************************/
  ImageComponent,
  ImageSliderComponent,
  /***************************** MISC *************************/
  EmptyComponent,
  StatusComponent,
  LoadingComponent,
  LoadingContainerComponent
];

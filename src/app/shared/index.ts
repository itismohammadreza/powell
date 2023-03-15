import {Type} from '@angular/core';
import {LogoComponent} from '@shared/components/logo/logo.component';
import {PermissionDirective} from "@shared/directives/permission.directive";
import {AutoCompleteModule} from "@ng/components/auto-complete";
import {BottomSheetModule} from "@ng/components/bottom-sheet";
import {ButtonModule} from "@ng/components/button";
import {CascadeSelectModule} from "@ng/components/cascade-select";
import {CheckboxModule} from "@ng/components/checkbox";
import {ChipsModule} from "@ng/components/chips";
import {ColorPickerModule} from "@ng/components/color-picker";
import {OverlayModule} from "@ng/components/overlay";
import {DropdownModule} from "@ng/components/dropdown";
import {DualLabelSwitchModule} from "@ng/components/dual-label-switch";
import {EditorModule} from "@ng/components/editor";
import {EmptyModule} from "@ng/components/empty";
import {FilePickerModule} from "@ng/components/file-picker";
import {FilePicker2Module} from "@ng/components/file-picker2";
import {GregorianDatepickerModule} from "@ng/components/gregorian-datepicker";
import {ImageModule} from "@ng/components/image";
import {ImageSliderModule} from "@ng/components/image-slider";
import {InfiniteScrollModule} from "@ng/components/infinite-scroll";
import {InputMaskModule} from "@ng/components/input-mask";
import {InputNumberModule} from "@ng/components/input-number";
import {InputOtpModule} from "@ng/components/input-otp";
import {InputPasswordModule} from "@ng/components/input-password";
import {InputTextModule} from "@ng/components/input-text";
import {InputTextareaModule} from "@ng/components/input-textarea";
import {IranMapModule} from "@ng/components/iran-map";
import {JalaliDatepickerModule} from "@ng/components/jalali-datepicker";
import {KnobModule} from "@ng/components/knob";
import {ListboxModule} from "@ng/components/listbox";
import {LoadingContainerModule} from "@ng/components/loading-container";
import {MapModule} from "@ng/components/map";
import {MessageModule} from "@ng/components/message";
import {MultiCheckboxModule} from "@ng/components/multi-checkbox";
import {MultiSelectModule} from "@ng/components/multi-select";
import {RadioModule} from "@ng/components/radio";
import {RatingModule} from "@ng/components/rating";
import {SelectButtonModule} from "@ng/components/select-button";
import {SliderModule} from "@ng/components/slider";
import {SplitButtonModule} from "@ng/components/split-button";
import {StatusModule} from "@ng/components/status";
import {SwitchModule} from "@ng/components/switch";
import {TableModule} from "@ng/components/table";
import {ToggleButtonModule} from "@ng/components/toggle-button";
import {TreeModule} from "@ng/components/tree";
import {TreeSelectModule} from "@ng/components/tree-select";
import {TriStateCheckboxModule} from "@ng/components/tri-state-checkbox";
import {ConfigHandlerModule} from "@ng/directives/config-handler";

export const COMPONENTS: Type<any>[] = [
  LogoComponent,
  PermissionDirective
];

export const PRIME_MODULES: Type<any>[] = [
  AutoCompleteModule,
  BottomSheetModule,
  ButtonModule,
  CascadeSelectModule,
  CheckboxModule,
  ChipsModule,
  ColorPickerModule,
  OverlayModule,
  DropdownModule,
  DualLabelSwitchModule,
  EditorModule,
  EmptyModule,
  FilePickerModule,
  FilePicker2Module,
  GregorianDatepickerModule,
  ImageModule,
  ImageSliderModule,
  InfiniteScrollModule,
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
  LoadingContainerModule,
  MapModule,
  MessageModule,
  MultiCheckboxModule,
  MultiSelectModule,
  RadioModule,
  RatingModule,
  SelectButtonModule,
  SliderModule,
  SplitButtonModule,
  StatusModule,
  SwitchModule,
  TableModule,
  ToggleButtonModule,
  TreeModule,
  TreeSelectModule,
  TriStateCheckboxModule,

  ConfigHandlerModule
];

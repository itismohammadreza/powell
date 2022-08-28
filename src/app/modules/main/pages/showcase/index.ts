import {Type} from '@angular/core';
import {WelcomeComponent} from '@modules/main/pages/showcase/components/welcome/welcome.component';
import {EmojiComponent} from '@modules/main/pages/showcase/components/emoji/emoji.component';
import {BlocksComponent} from '@modules/main/pages/showcase/components/blocks/blocks.component';
import {SpaceComponent} from '@modules/main/pages/showcase/components/space/space.component';
import {BubblesComponent} from '@modules/main/pages/showcase/components/bubbles/bubbles.component';
import {AutoCompletePage} from '@modules/main/pages/showcase/pages/auto-complete/auto-complete.page';
import {ButtonPage} from '@modules/main/pages/showcase/pages/button/button.page';
import {CascadeSelectPage} from '@modules/main/pages/showcase/pages/cascade-select/cascade-select.page';
import {ChipsPage} from '@modules/main/pages/showcase/pages/chips/chips.page';
import {ColorPickerPage} from '@modules/main/pages/showcase/pages/color-picker/color-picker.page';
import {DatePickerPage} from '@modules/main/pages/showcase/pages/date-picker/date-picker.page';
import {DropdownPage} from '@modules/main/pages/showcase/pages/dropdown/dropdown.page';
import {EditorPage} from '@modules/main/pages/showcase/pages/editor/editor.page';
import {FilePickerPage} from '@modules/main/pages/showcase/pages/file-picker/file-picker.page';
import {FilePicker2Page} from '@modules/main/pages/showcase/pages/file-picker2/file-picker2.page';
import {InputMaskPage} from '@modules/main/pages/showcase/pages/input-mask/input-mask.page';
import {InputNumberPage} from '@modules/main/pages/showcase/pages/input-number/input-number.page';
import {InputPasswordPage} from '@modules/main/pages/showcase/pages/input-password/input-password.page';
import {InputTextPage} from '@modules/main/pages/showcase/pages/input-text/input-text.page';
import {InputTextareaPage} from '@modules/main/pages/showcase/pages/input-textarea/input-textarea.page';
import {ListBoxPage} from '@modules/main/pages/showcase/pages/list-box/list-box.page';
import {MapPage} from '@modules/main/pages/showcase/pages/map/map.page';
import {MultiCheckboxPage} from '@modules/main/pages/showcase/pages/multi-checkbox/multi-checkbox.page';
import {MultiSelectPage} from '@modules/main/pages/showcase/pages/multi-select/multi-select.page';
import {RadioPage} from '@modules/main/pages/showcase/pages/radio/radio.page';
import {RatingPage} from '@modules/main/pages/showcase/pages/rating/rating.page';
import {SelectButtonPage} from '@modules/main/pages/showcase/pages/select-button/select-button.page';
import {SingleCheckboxPage} from '@modules/main/pages/showcase/pages/single-checkbox/single-checkbox.page';
import {SliderPage} from '@modules/main/pages/showcase/pages/slider/slider.page';
import {SplitButtonPage} from '@modules/main/pages/showcase/pages/split-button/split-button.page';
import {SwitchPage} from '@modules/main/pages/showcase/pages/switch/switch.page';
import {TablePage} from '@modules/main/pages/showcase/pages/table/table.page';
import {ToggleButtonPage} from '@modules/main/pages/showcase/pages/toggle-button/toggle-button.page';
import {TreePage} from '@modules/main/pages/showcase/pages/tree/tree.page';
import {DynamicFormPage} from '@modules/main/pages/showcase/pages/dynamic-form/dynamic-form.page';
import {ImageSliderPage} from '@modules/main/pages/showcase/pages/image-slider/image-slider.page';
import {DashboardPage} from '@modules/main/pages/showcase/pages/dashboard/dashboard.page';
import {PreviewOptionsComponent} from '@modules/main/pages/showcase/components/preview-options/preview-options.component';
import {KnobPage} from '@modules/main/pages/showcase/pages/knob/knob.page';
import {TreeSelectPage} from '@modules/main/pages/showcase/pages/tree-select/tree-select.page';
import {DatePicker2Page} from '@modules/main/pages/showcase/pages/date-picker2/date-picker2.page';
import {
  DynamicDialogSampleComponent
} from '@modules/main/pages/showcase/components/dynamic-dialog-sample/dynamic-dialog-sample.component';
import {ButtonAsyncPage} from '@modules/main/pages/showcase/pages/button-async/button-async.page';
import {UtilsPage} from "@modules/main/pages/showcase/pages/utils/utils.page";
import {SmokeComponent} from "@modules/main/pages/showcase/components/smoke/smoke.component";

export const COMPONENTS: Type<any>[] = [
  // components
  WelcomeComponent,
  EmojiComponent,
  BlocksComponent,
  SpaceComponent,
  BubblesComponent,
  PreviewOptionsComponent,
  SmokeComponent,
  // pages
  DashboardPage,
  AutoCompletePage,
  ButtonPage,
  ButtonAsyncPage,
  CascadeSelectPage,
  ChipsPage,
  ColorPickerPage,
  DatePickerPage,
  DatePicker2Page,
  DynamicDialogSampleComponent,
  DynamicFormPage,
  DropdownPage,
  EditorPage,
  FilePickerPage,
  FilePicker2Page,
  ImageSliderPage,
  InputMaskPage,
  InputNumberPage,
  InputPasswordPage,
  InputTextPage,
  InputTextareaPage,
  KnobPage,
  ListBoxPage,
  MapPage,
  MultiCheckboxPage,
  MultiSelectPage,
  RadioPage,
  RatingPage,
  SelectButtonPage,
  SingleCheckboxPage,
  SliderPage,
  SplitButtonPage,
  SwitchPage,
  TablePage,
  ToggleButtonPage,
  TreePage,
  TreeSelectPage,
  UtilsPage
];
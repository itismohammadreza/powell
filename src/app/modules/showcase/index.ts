import {Type} from '@angular/core';
import {WelcomeComponent} from '@modules/showcase/components/welcome/welcome.component';
import {EmojiComponent} from '@modules/showcase/components/emoji/emoji.component';
import {BlocksComponent} from '@modules/showcase/components/blocks/blocks.component';
import {SpaceComponent} from '@modules/showcase/components/space/space.component';
import {BubblesComponent} from '@modules/showcase/components/bubbles/bubbles.component';
import {AutoCompletePage} from '@modules/showcase/pages/auto-complete/auto-complete.page';
import {ButtonPage} from '@modules/showcase/pages/button/button.page';
import {CascadeSelectPage} from '@modules/showcase/pages/cascade-select/cascade-select.page';
import {ChipsPage} from '@modules/showcase/pages/chips/chips.page';
import {ColorPickerPage} from '@modules/showcase/pages/color-picker/color-picker.page';
import {DatePickerPage} from '@modules/showcase/pages/date-picker/date-picker.page';
import {DropdownPage} from '@modules/showcase/pages/dropdown/dropdown.page';
import {EditorPage} from '@modules/showcase/pages/editor/editor.page';
import {FilePickerPage} from '@modules/showcase/pages/file-picker/file-picker.page';
import {FilePicker2Page} from '@modules/showcase/pages/file-picker2/file-picker2.page';
import {InputMaskPage} from '@modules/showcase/pages/input-mask/input-mask.page';
import {InputNumberPage} from '@modules/showcase/pages/input-number/input-number.page';
import {InputPasswordPage} from '@modules/showcase/pages/input-password/input-password.page';
import {InputTextPage} from '@modules/showcase/pages/input-text/input-text.page';
import {InputTextareaPage} from '@modules/showcase/pages/input-textarea/input-textarea.page';
import {ListBoxPage} from '@modules/showcase/pages/list-box/list-box.page';
import {MapPage} from '@modules/showcase/pages/map/map.page';
import {MultiCheckboxPage} from '@modules/showcase/pages/multi-checkbox/multi-checkbox.page';
import {MultiSelectPage} from '@modules/showcase/pages/multi-select/multi-select.page';
import {RadioPage} from '@modules/showcase/pages/radio/radio.page';
import {RatingPage} from '@modules/showcase/pages/rating/rating.page';
import {SelectButtonPage} from '@modules/showcase/pages/select-button/select-button.page';
import {SingleCheckboxPage} from '@modules/showcase/pages/single-checkbox/single-checkbox.page';
import {SliderPage} from '@modules/showcase/pages/slider/slider.page';
import {SplitButtonPage} from '@modules/showcase/pages/split-button/split-button.page';
import {SwitchPage} from '@modules/showcase/pages/switch/switch.page';
import {TablePage} from '@modules/showcase/pages/table/table.page';
import {ToggleButtonPage} from '@modules/showcase/pages/toggle-button/toggle-button.page';
import {TreePage} from '@modules/showcase/pages/tree/tree.page';
import {DynamicFormPage} from '@modules/showcase/pages/dynamic-form/dynamic-form.page';
import {ImageSliderPage} from '@modules/showcase/pages/image-slider/image-slider.page';
import {DashboardPage} from '@modules/showcase/pages/dashboard/dashboard.page';
import {PreviewOptionsComponent} from '@modules/showcase/components/preview-options/preview-options.component';
import {KnobPage} from '@modules/showcase/pages/knob/knob.page';
import {TreeSelectPage} from '@modules/showcase/pages/tree-select/tree-select.page';
import {DatePicker2Page} from '@modules/showcase/pages/date-picker2/date-picker2.page';
import {DynamicDialogSampleComponent} from '@modules/showcase/components/dynamic-dialog-sample/dynamic-dialog-sample.component';
import {ButtonAsyncPage} from '@modules/showcase/pages/button-async/button-async.page';

export const COMPONENTS: Type<any>[] = [
  // components
  WelcomeComponent,
  EmojiComponent,
  BlocksComponent,
  SpaceComponent,
  BubblesComponent,
  PreviewOptionsComponent,
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
];

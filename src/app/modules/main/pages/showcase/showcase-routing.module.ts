import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
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
import {KnobPage} from '@modules/main/pages/showcase/pages/knob/knob.page';
import {TreeSelectPage} from '@modules/main/pages/showcase/pages/tree-select/tree-select.page';
import {ButtonAsyncPage} from '@modules/main/pages/showcase/pages/button-async/button-async.page';
import {UtilsPage} from "@modules/main/pages/showcase/pages/utils/utils.page";

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardPage,
    data: {title: 'dashboard'}
  },
  {
    path: 'auto-complete',
    component: AutoCompletePage,
    data: {title: 'auto-complete'}
  },
  {
    path: 'button',
    component: ButtonPage,
    data: {title: 'button'}
  },
  {
    path: 'button-async',
    component: ButtonAsyncPage,
    data: {title: 'button-async'}
  },
  {
    path: 'cascade-select',
    component: CascadeSelectPage,
    data: {title: 'cascade-select'}
  },
  {
    path: 'chips',
    component: ChipsPage,
    data: {title: 'chips'}
  },
  {
    path: 'date-picker',
    component: DatePickerPage,
    data: {title: 'date-picker'}
  },
  {
    path: 'dynamic-form',
    component: DynamicFormPage,
    data: {title: 'dynamic-form'}
  },
  {
    path: 'color-picker',
    component: ColorPickerPage,
    data: {title: 'color-picker'}
  },
  {
    path: 'dropdown',
    component: DropdownPage,
    data: {title: 'dropdown'}
  },
  {
    path: 'editor',
    component: EditorPage,
    data: {title: 'editor'}
  },
  {
    path: 'file-picker',
    component: FilePickerPage,
    data: {title: 'file-picker'}
  },
  {
    path: 'file-picker2',
    component: FilePicker2Page,
    data: {title: 'file-picker2'}
  },
  {
    path: 'image-slider',
    component: ImageSliderPage,
    data: {title: 'image-slider'}
  },
  {
    path: 'mask',
    component: InputMaskPage,
    data: {title: 'mask'}
  },
  {
    path: 'number',
    component: InputNumberPage,
    data: {title: 'number'}
  },
  {
    path: 'password',
    component: InputPasswordPage,
    data: {title: 'password'}
  },
  {
    path: 'text',
    component: InputTextPage,
    data: {title: 'text'}
  },
  {
    path: 'textarea',
    component: InputTextareaPage,
    data: {title: 'textarea'}
  },
  {
    path: 'knob',
    component: KnobPage,
    data: {title: 'knob'}
  },
  {
    path: 'list-box',
    component: ListBoxPage,
    data: {title: 'list-box'}
  },
  {
    path: 'map',
    component: MapPage,
    data: {title: 'map'}
  },
  {
    path: 'multi-checkbox',
    component: MultiCheckboxPage,
    data: {title: 'multi-checkbox'}
  },
  {
    path: 'multi-select',
    component: MultiSelectPage,
    data: {title: 'multi-select'}
  },
  {
    path: 'radio',
    component: RadioPage,
    data: {title: 'radio'}
  },
  {
    path: 'rating',
    component: RatingPage,
    data: {title: 'rating'}
  },
  {
    path: 'select-button',
    component: SelectButtonPage,
    data: {title: 'select-button'}
  },
  {
    path: 'single-checkbox',
    component: SingleCheckboxPage,
    data: {title: 'single-checkbox'}
  },
  {
    path: 'slider',
    component: SliderPage,
    data: {title: 'slider'}
  },
  {
    path: 'split-button',
    component: SplitButtonPage,
    data: {title: 'split-button'}
  },
  {
    path: 'switch',
    component: SwitchPage,
    data: {title: 'switch'}
  },
  {
    path: 'table',
    component: TablePage,
    data: {title: 'table'}
  },
  {
    path: 'toggle-button',
    component: ToggleButtonPage,
    data: {title: 'toggle-button'}
  },
  {
    path: 'tree',
    component: TreePage,
    data: {title: 'tree'}
  },
  {
    path: 'tree-select',
    component: TreeSelectPage,
    data: {title: 'tree-select'}
  },
  {
    path: 'utils',
    component: UtilsPage,
    data: {title: 'utils'}
  },
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShowcaseRoutingModule {
}
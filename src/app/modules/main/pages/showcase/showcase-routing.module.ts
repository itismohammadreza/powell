import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AutoCompletePage} from '@modules/main/pages/showcase/pages/auto-complete/auto-complete.page';
import {ButtonPage} from '@modules/main/pages/showcase/pages/button/button.page';
import {CascadeSelectPage} from '@modules/main/pages/showcase/pages/cascade-select/cascade-select.page';
import {ChipsPage} from '@modules/main/pages/showcase/pages/chips/chips.page';
import {ColorPickerPage} from '@modules/main/pages/showcase/pages/color-picker/color-picker.page';
import {DropdownPage} from '@modules/main/pages/showcase/pages/dropdown/dropdown.page';
import {EditorPage} from '@modules/main/pages/showcase/pages/editor/editor.page';
import {FilePickerPage} from '@modules/main/pages/showcase/pages/file-picker/file-picker.page';
import {FilePicker2Page} from '@modules/main/pages/showcase/pages/file-picker2/file-picker2.page';
import {InputMaskPage} from '@modules/main/pages/showcase/pages/input-mask/input-mask.page';
import {InputNumberPage} from '@modules/main/pages/showcase/pages/input-number/input-number.page';
import {InputPasswordPage} from '@modules/main/pages/showcase/pages/input-password/input-password.page';
import {InputTextPage} from '@modules/main/pages/showcase/pages/input-text/input-text.page';
import {InputTextareaPage} from '@modules/main/pages/showcase/pages/input-textarea/input-textarea.page';
import {ListboxPage} from '@modules/main/pages/showcase/pages/listbox/listbox.page';
import {MapPage} from '@modules/main/pages/showcase/pages/map/map.page';
import {MultiCheckboxPage} from '@modules/main/pages/showcase/pages/multi-checkbox/multi-checkbox.page';
import {MultiSelectPage} from '@modules/main/pages/showcase/pages/multi-select/multi-select.page';
import {RadioPage} from '@modules/main/pages/showcase/pages/radio/radio.page';
import {RatingPage} from '@modules/main/pages/showcase/pages/rating/rating.page';
import {SelectButtonPage} from '@modules/main/pages/showcase/pages/select-button/select-button.page';
import {CheckboxPage} from '@modules/main/pages/showcase/pages/checkbox/checkbox.page';
import {SliderPage} from '@modules/main/pages/showcase/pages/slider/slider.page';
import {SplitButtonPage} from '@modules/main/pages/showcase/pages/split-button/split-button.page';
import {SwitchPage} from '@modules/main/pages/showcase/pages/switch/switch.page';
import {TablePage} from '@modules/main/pages/showcase/pages/table/table.page';
import {ToggleButtonPage} from '@modules/main/pages/showcase/pages/toggle-button/toggle-button.page';
import {TreePage} from '@modules/main/pages/showcase/pages/tree/tree.page';
import {ImageSliderPage} from '@modules/main/pages/showcase/pages/image-slider/image-slider.page';
import {DashboardPage} from '@modules/main/pages/showcase/pages/dashboard/dashboard.page';
import {KnobPage} from '@modules/main/pages/showcase/pages/knob/knob.page';
import {TreeSelectPage} from '@modules/main/pages/showcase/pages/tree-select/tree-select.page';
import {UtilsPage} from "@modules/main/pages/showcase/pages/utils/utils.page";
import {
  GregorianDatepickerPage
} from "@modules/main/pages/showcase/pages/gregorian-datepicker/gregorian-datepicker.page";
import {JalaliDatepickerPage} from "@modules/main/pages/showcase/pages/jalali-datepicker/jalali-datepicker.page";
import {TriStateCheckboxPage} from "@modules/main/pages/showcase/pages/tri-state-checkbox/tri-state-checkbox.page";
import {EmptyPage} from "@modules/main/pages/showcase/pages/empty/empty.page";
import {DualLabelSwitchPage} from "@modules/main/pages/showcase/pages/dual-label-switch/dual-label-switch.page";
import {BottomSheetPage} from "@modules/main/pages/showcase/pages/bottom-sheet/bottom-sheet.page";
import {StatusPage} from "@modules/main/pages/showcase/pages/status/status.page";
import {ImagePage} from "@modules/main/pages/showcase/pages/image/image.page";
import {ConfirmDialogPage} from "@modules/main/pages/showcase/pages/confirm-dialog/confirm-dialog.page";
import {ConfirmPopupPage} from "@modules/main/pages/showcase/pages/confirm-popup/confirm-popup.page";
import {DialogFormPage} from "@modules/main/pages/showcase/pages/dialog-form/dialog-form.page";
import {MessagePage} from "@modules/main/pages/showcase/pages/message/message.page";
import {ToastPage} from "@modules/main/pages/showcase/pages/toast/toast.page";
import {DialogPage} from "@modules/main/pages/showcase/pages/dialog/dialog.page";
import {LoadingContainerPage} from "@modules/main/pages/showcase/pages/loading-container/loading-container.page";
import {InfiniteScrollPage} from "@modules/main/pages/showcase/pages/infinite-scroll/infinite-scroll.page";
import {OpenDialogGuard} from "@core/guard";
import {AnimateOnScrollPage} from "@modules/main/pages/showcase/pages/animate-on-scroll/animate-on-scroll.page";

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardPage,
    title: 'dashboard'
  },
  {
    path: 'animate-on-scroll',
    component: AnimateOnScrollPage,
    title: 'animate-on-scroll'
  },
  {
    path: 'auto-complete',
    component: AutoCompletePage,
    title: 'auto-complete'
  },
  {
    path: 'bottom-sheet',
    component: BottomSheetPage,
    canDeactivate: [OpenDialogGuard],
    title: 'bottom-sheet'
  },
  {
    path: 'button',
    component: ButtonPage,
    title: 'button'
  },
  {
    path: 'cascade-select',
    component: CascadeSelectPage,
    title: 'cascade-select'
  },
  {
    path: 'checkbox',
    component: CheckboxPage,
    title: 'checkbox'
  },
  {
    path: 'chips',
    component: ChipsPage,
    title: 'chips'
  },
  {
    path: 'color-picker',
    component: ColorPickerPage,
    title: 'color-picker'
  },
  {
    path: 'confirm-dialog',
    component: ConfirmDialogPage,
    canDeactivate: [OpenDialogGuard],
    title: 'confirm-dialog'
  },
  {
    path: 'confirm-popup',
    component: ConfirmPopupPage,
    canDeactivate: [OpenDialogGuard],
    title: 'confirm-popup'
  },
  {
    path: 'dialog',
    component: DialogPage,
    canDeactivate: [OpenDialogGuard],
    title: 'dialog'
  },
  {
    path: 'dialog-form',
    component: DialogFormPage,
    canDeactivate: [OpenDialogGuard],
    title: 'dialog-form'
  },
  {
    path: 'dropdown',
    component: DropdownPage,
    title: 'dropdown'
  },
  {
    path: 'dual-label-switch',
    component: DualLabelSwitchPage,
    title: 'dual-label-switch'
  },
  {
    path: 'editor',
    component: EditorPage,
    title: 'editor'
  },
  {
    path: 'empty',
    component: EmptyPage,
    title: 'empty'
  },
  {
    path: 'file-picker',
    component: FilePickerPage,
    title: 'file-picker'
  },
  {
    path: 'file-picker2',
    component: FilePicker2Page,
    title: 'file-picker2'
  },
  {
    path: 'gregorian-datepicker',
    component: GregorianDatepickerPage,
    title: 'gregorian-datepicker'
  },
  {
    path: 'image',
    component: ImagePage,
    title: 'image'
  },
  {
    path: 'image-slider',
    component: ImageSliderPage,
    title: 'image-slider'
  },
  {
    path: 'infinite-scroll',
    component: InfiniteScrollPage,
    title: 'infinite-scroll'
  },
  {
    path: 'input-mask',
    component: InputMaskPage,
    title: 'input-mask'
  },
  {
    path: 'input-number',
    component: InputNumberPage,
    title: 'input-number'
  },
  {
    path: 'input-password',
    component: InputPasswordPage,
    title: 'input-password'
  },
  {
    path: 'input-text',
    component: InputTextPage,
    title: 'input-text'
  },
  {
    path: 'input-textarea',
    component: InputTextareaPage,
    title: 'input-textarea'
  },
  {
    path: 'jalali-datepicker',
    component: JalaliDatepickerPage,
    title: 'jalali-datepicker'
  },
  {
    path: 'knob',
    component: KnobPage,
    title: 'knob'
  },
  {
    path: 'listbox',
    component: ListboxPage,
    title: 'listbox'
  },
  {
    path: 'loading-container',
    component: LoadingContainerPage,
    title: 'loading-container'
  },
  {
    path: 'map',
    component: MapPage,
    title: 'map'
  },
  {
    path: 'message',
    component: MessagePage,
    title: 'message'
  },
  {
    path: 'multi-checkbox',
    component: MultiCheckboxPage,
    title: 'multi-checkbox'
  },
  {
    path: 'multi-select',
    component: MultiSelectPage,
    title: 'multi-select'
  },
  {
    path: 'radio',
    component: RadioPage,
    title: 'radio'
  },
  {
    path: 'rating',
    component: RatingPage,
    title: 'rating'
  },
  {
    path: 'select-button',
    component: SelectButtonPage,
    title: 'select-button'
  },
  {
    path: 'slider',
    component: SliderPage,
    title: 'slider'
  },
  {
    path: 'split-button',
    component: SplitButtonPage,
    title: 'split-button'
  },
  {
    path: 'status',
    component: StatusPage,
    title: 'status'
  },
  {
    path: 'switch',
    component: SwitchPage,
    title: 'switch'
  },
  {
    path: 'table',
    component: TablePage,
    title: 'table'
  },
  {
    path: 'toast',
    component: ToastPage,
    canDeactivate: [OpenDialogGuard],
    title: 'toast'
  },
  {
    path: 'toggle-button',
    component: ToggleButtonPage,
    title: 'toggle-button'
  },
  {
    path: 'tree',
    component: TreePage,
    title: 'tree'
  },
  {
    path: 'tree-select',
    component: TreeSelectPage,
    title: 'tree-select'
  },
  {
    path: 'tri-state-checkbox',
    component: TriStateCheckboxPage,
    title: 'tri-state-checkbox'
  },
  {
    path: 'utils',
    component: UtilsPage,
    title: 'utils'
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

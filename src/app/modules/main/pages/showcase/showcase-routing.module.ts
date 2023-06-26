import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {openDialogGuard} from "@core/guard";

const routes: Routes = [
  {
    path: 'dashboard',
    loadChildren: () => import('./pages/dashboard/dashboard-page.module').then(m => m.DashboardPageModule),
    title: 'dashboard'
  },
  {
    path: 'animate-on-scroll',
    loadChildren: () => import('./pages/animate-on-scroll/animate-on-scroll-page.module').then(m => m.AnimateOnScrollPageModule),
    title: 'animate-on-scroll'
  },
  {
    path: 'auto-complete',
    loadChildren: () => import('./pages/auto-complete/auto-complete-page.module').then(m => m.AutoCompletePageModule),
    title: 'auto-complete'
  },
  {
    path: 'bottom-sheet',
    loadChildren: () => import('./pages/bottom-sheet/bottom-sheet-page.module').then(m => m.BottomSheetPageModule),
    canDeactivate: [openDialogGuard],
    title: 'bottom-sheet'
  },
  {
    path: 'button',
    loadChildren: () => import('./pages/button/button-page.module').then(m => m.ButtonPageModule),
    title: 'button'
  },
  {
    path: 'cascade-select',
    loadChildren: () => import('./pages/cascade-select/cascade-select-page.module').then(m => m.CascadeSelectPageModule),
    title: 'cascade-select'
  },
  {
    path: 'checkbox',
    loadChildren: () => import('./pages/checkbox/checkbox-page.module').then(m => m.CheckboxPageModule),
    title: 'checkbox'
  },
  {
    path: 'chips',
    loadChildren: () => import('./pages/chips/chips-page.module').then(m => m.ChipsPageModule),
    title: 'chips'
  },
  {
    path: 'color-picker',
    loadChildren: () => import('./pages/color-picker/color-picker-page.module').then(m => m.ColorPickerPageModule),
    title: 'color-picker'
  },
  {
    path: 'confirm-dialog',
    loadChildren: () => import('./pages/confirm-dialog/confirm-dialog-page.module').then(m => m.ConfirmDialogPageModule),
    canDeactivate: [openDialogGuard],
    title: 'confirm-dialog'
  },
  {
    path: 'confirm-popup',
    loadChildren: () => import('./pages/confirm-popup/confirm-popup-page.module').then(m => m.ConfirmPopupPageModule),
    canDeactivate: [openDialogGuard],
    title: 'confirm-popup'
  },
  {
    path: 'dialog',
    loadChildren: () => import('./pages/dialog/dialog-page.module').then(m => m.DialogPageModule),
    canDeactivate: [openDialogGuard],
    title: 'dialog'
  },
  {
    path: 'dialog-form',
    loadChildren: () => import('./pages/dialog-form/dialog-form-page.module').then(m => m.DialogFormPageModule),
    canDeactivate: [openDialogGuard],
    title: 'dialog-form'
  },
  {
    path: 'dropdown',
    loadChildren: () => import('./pages/dropdown/dropdown-page.module').then(m => m.DropdownPageModule),
    title: 'dropdown'
  },
  {
    path: 'dual-label-switch',
    loadChildren: () => import('./pages/dual-label-switch/dual-label-switch-page.module').then(m => m.DualLabelSwitchPageModule),
    title: 'dual-label-switch'
  },
  {
    path: 'editor',
    loadChildren: () => import('./pages/editor/editor-page.module').then(m => m.EditorPageModule),
    title: 'editor'
  },
  {
    path: 'empty',
    loadChildren: () => import('./pages/empty/empty-page.module').then(m => m.EmptyPageModule),
    title: 'empty'
  },
  {
    path: 'file-picker',
    loadChildren: () => import('./pages/file-picker/file-picker-page.module').then(m => m.FilePickerPageModule),
    title: 'file-picker'
  },
  {
    path: 'file-picker2',
    loadChildren: () => import('./pages/file-picker2/file-picker2-page.module').then(m => m.FilePicker2PageModule),
    title: 'file-picker2'
  },
  {
    path: 'gregorian-datepicker',
    loadChildren: () => import('./pages/gregorian-datepicker/gregorian-datepicker-page.module').then(m => m.GregorianDatepickerPageModule),
    title: 'gregorian-datepicker'
  },
  {
    path: 'image',
    loadChildren: () => import('./pages/image/image-page.module').then(m => m.ImagePageModule),
    title: 'image'
  },
  {
    path: 'image-slider',
    loadChildren: () => import('./pages/image-slider/image-slider-page.module').then(m => m.ImageSliderPageModule),
    title: 'image-slider'
  },
  {
    path: 'infinite-scroll',
    loadChildren: () => import('./pages/infinite-scroll/infinite-scroll-page.module').then(m => m.InfiniteScrollPageModule),
    title: 'infinite-scroll'
  },
  {
    path: 'input-mask',
    loadChildren: () => import('./pages/input-mask/input-mask-page.module').then(m => m.InputMaskPageModule),
    title: 'input-mask'
  },
  {
    path: 'input-number',
    loadChildren: () => import('./pages/input-number/input-number-page.module').then(m => m.InputNumberPageModule),
    title: 'input-number'
  },
  {
    path: 'input-otp',
    loadChildren: () => import('./pages/input-otp/input-otp-page.module').then(m => m.InputOtpPageModule),
    title: 'input-otp'
  },
  {
    path: 'input-password',
    loadChildren: () => import('./pages/input-password/input-password-page.module').then(m => m.InputPasswordPageModule),
    title: 'input-password'
  },
  {
    path: 'input-text',
    loadChildren: () => import('./pages/input-text/input-text-page.module').then(m => m.InputTextPageModule),
    title: 'input-text'
  },
  {
    path: 'input-textarea',
    loadChildren: () => import('./pages/input-textarea/input-textarea-page.module').then(m => m.InputTextareaPageModule),
    title: 'input-textarea'
  },
  {
    path: 'iran-map',
    loadChildren: () => import('./pages/iran-map/iran-map-page.module').then(m => m.IranMapPageModule),
    title: 'iran-map'
  },
  {
    path: 'jalali-datepicker',
    loadChildren: () => import('./pages/jalali-datepicker/jalali-datepicker-page.module').then(m => m.JalaliDatepickerPageModule),
    title: 'jalali-datepicker'
  },
  {
    path: 'knob',
    loadChildren: () => import('./pages/knob/knob-page.module').then(m => m.KnobPageModule),
    title: 'knob'
  },
  {
    path: 'listbox',
    loadChildren: () => import('./pages/listbox/listbox-page.module').then(m => m.ListboxPageModule),
    title: 'listbox'
  },
  {
    path: 'loading-container',
    loadChildren: () => import('./pages/loading-container/loading-container-page.module').then(m => m.LoadingContainerPageModule),
    title: 'loading-container'
  },
  {
    path: 'map',
    loadChildren: () => import('./pages/map/map-page.module').then(m => m.MapPageModule),
    title: 'map'
  },
  {
    path: 'message',
    loadChildren: () => import('./pages/message/message-page.module').then(m => m.MessagePageModule),
    title: 'message'
  },
  {
    path: 'multi-checkbox',
    loadChildren: () => import('./pages/multi-checkbox/multi-checkbox-page.module').then(m => m.MultiCheckboxPageModule),
    title: 'multi-checkbox'
  },
  {
    path: 'multi-select',
    loadChildren: () => import('./pages/multi-select/multi-select-page.module').then(m => m.MultiSelectPageModule),
    title: 'multi-select'
  },
  {
    path: 'radio',
    loadChildren: () => import('./pages/radio/radio-page.module').then(m => m.RadioPageModule),
    title: 'radio'
  },
  {
    path: 'rating',
    loadChildren: () => import('./pages/rating/rating-page.module').then(m => m.RatingPageModule),
    title: 'rating'
  },
  {
    path: 'select-button',
    loadChildren: () => import('./pages/select-button/select-button-page.module').then(m => m.SelectButtonPageModule),
    title: 'select-button'
  },
  {
    path: 'slider',
    loadChildren: () => import('./pages/slider/slider-page.module').then(m => m.SliderPageModule),
    title: 'slider'
  },
  {
    path: 'split-button',
    loadChildren: () => import('./pages/split-button/split-button-page.module').then(m => m.SplitButtonPageModule),
    title: 'split-button'
  },
  {
    path: 'status',
    loadChildren: () => import('./pages/status/status-page.module').then(m => m.StatusPageModule),
    title: 'status'
  },
  {
    path: 'switch',
    loadChildren: () => import('./pages/switch/switch-page.module').then(m => m.SwitchPageModule),
    title: 'switch'
  },
  {
    path: 'table',
    loadChildren: () => import('./pages/table/table-page.module').then(m => m.TablePageModule),
    title: 'table'
  },
  {
    path: 'toast',
    loadChildren: () => import('./pages/toast/toast-page.module').then(m => m.ToastPageModule),
    canDeactivate: [openDialogGuard],
    title: 'toast'
  },
  {
    path: 'toggle-button',
    loadChildren: () => import('./pages/toggle-button/toggle-button-page.module').then(m => m.ToggleButtonPageModule),
    title: 'toggle-button'
  },
  {
    path: 'tree',
    loadChildren: () => import('./pages/tree/tree-page.module').then(m => m.TreePageModule),
    title: 'tree'
  },
  {
    path: 'tree-select',
    loadChildren: () => import('./pages/tree-select/tree-select-page.module').then(m => m.TreeSelectPageModule),
    title: 'tree-select'
  },
  {
    path: 'tri-state-checkbox',
    loadChildren: () => import('./pages/tri-state-checkbox/tri-state-checkbox-page.module').then(m => m.TriStateCheckboxPageModule),
    title: 'tri-state-checkbox'
  },
  {
    path: 'utils',
    loadChildren: () => import('./pages/utils/utils-page.module').then(m => m.UtilsPageModule),
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

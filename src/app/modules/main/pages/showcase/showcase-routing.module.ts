import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {openDialogGuard} from "@core/guard";

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/dashboard/dashboard-page.module').then(m => m.DashboardPageModule),
    title: 'Home'
  },
  {
    path: 'auto-complete',
    loadChildren: () => import('./pages/auto-complete/auto-complete-page.module').then(m => m.AutoCompletePageModule),
    title: 'Auto Complete'
  },
  {
    path: 'bottom-sheet',
    loadChildren: () => import('./pages/bottom-sheet/bottom-sheet-page.module').then(m => m.BottomSheetPageModule),
    canDeactivate: [openDialogGuard],
    title: 'Bottom Sheet'
  },
  {
    path: 'button',
    loadChildren: () => import('./pages/button/button-page.module').then(m => m.ButtonPageModule),
    title: 'Button'
  },
  {
    path: 'cascade-select',
    loadChildren: () => import('./pages/cascade-select/cascade-select-page.module').then(m => m.CascadeSelectPageModule),
    title: 'Cascade Select'
  },
  {
    path: 'checkbox',
    loadChildren: () => import('./pages/checkbox/checkbox-page.module').then(m => m.CheckboxPageModule),
    title: 'Checkbox'
  },
  {
    path: 'checkbox-group',
    loadChildren: () => import('@modules/main/pages/showcase/pages/checkbox-group/checkbox-group-page.module').then(m => m.CheckboxGroupPageModule),
    title: 'Checkbox Group'
  },
  {
    path: 'chips',
    loadChildren: () => import('./pages/chips/chips-page.module').then(m => m.ChipsPageModule),
    title: 'Chips'
  },
  {
    path: 'color-picker',
    loadChildren: () => import('./pages/color-picker/color-picker-page.module').then(m => m.ColorPickerPageModule),
    title: 'Color Picker'
  },
  {
    path: 'confirm-dialog',
    loadChildren: () => import('./pages/confirm-dialog/confirm-dialog-page.module').then(m => m.ConfirmDialogPageModule),
    canDeactivate: [openDialogGuard],
    title: 'Confirm Dialog'
  },
  {
    path: 'confirm-popup',
    loadChildren: () => import('./pages/confirm-popup/confirm-popup-page.module').then(m => m.ConfirmPopupPageModule),
    canDeactivate: [openDialogGuard],
    title: 'Confirm Popup'
  },
  {
    path: 'dialog',
    loadChildren: () => import('./pages/dialog/dialog-page.module').then(m => m.DialogPageModule),
    canDeactivate: [openDialogGuard],
    title: 'Dialog'
  },
  {
    path: 'dialog-form',
    loadChildren: () => import('./pages/dialog-form/dialog-form-page.module').then(m => m.DialogFormPageModule),
    canDeactivate: [openDialogGuard],
    title: 'Dialog Form'
  },
  {
    path: 'dropdown',
    loadChildren: () => import('./pages/dropdown/dropdown-page.module').then(m => m.DropdownPageModule),
    title: 'Dropdown'
  },
  {
    path: 'dual-label-switch',
    loadChildren: () => import('./pages/dual-label-switch/dual-label-switch-page.module').then(m => m.DualLabelSwitchPageModule),
    title: 'Dual Label Switch'
  },
  {
    path: 'editor',
    loadChildren: () => import('./pages/editor/editor-page.module').then(m => m.EditorPageModule),
    title: 'Editor'
  },
  {
    path: 'empty',
    loadChildren: () => import('./pages/empty/empty-page.module').then(m => m.EmptyPageModule),
    title: 'Empty'
  },
  {
    path: 'file-picker',
    loadChildren: () => import('./pages/file-picker/file-picker-page.module').then(m => m.FilePickerPageModule),
    title: 'File Picker'
  },
  {
    path: 'file-picker2',
    loadChildren: () => import('./pages/file-picker2/file-picker2-page.module').then(m => m.FilePicker2PageModule),
    title: 'File Picker2'
  },
  {
    path: 'gregorian-datepicker',
    loadChildren: () => import('./pages/gregorian-datepicker/gregorian-datepicker-page.module').then(m => m.GregorianDatepickerPageModule),
    title: 'Gregorian Datepicker'
  },
  {
    path: 'image',
    loadChildren: () => import('./pages/image/image-page.module').then(m => m.ImagePageModule),
    title: 'Image'
  },
  {
    path: 'infinite-scroll',
    loadChildren: () => import('./pages/infinite-scroll/infinite-scroll-page.module').then(m => m.InfiniteScrollPageModule),
    title: 'Infinite Scroll'
  },
  {
    path: 'input-mask',
    loadChildren: () => import('./pages/input-mask/input-mask-page.module').then(m => m.InputMaskPageModule),
    title: 'Input Mask'
  },
  {
    path: 'input-number',
    loadChildren: () => import('./pages/input-number/input-number-page.module').then(m => m.InputNumberPageModule),
    title: 'Input Number'
  },
  {
    path: 'input-otp',
    loadChildren: () => import('./pages/input-otp/input-otp-page.module').then(m => m.InputOtpPageModule),
    title: 'Input Otp'
  },
  {
    path: 'input-password',
    loadChildren: () => import('./pages/input-password/input-password-page.module').then(m => m.InputPasswordPageModule),
    title: 'Input Password'
  },
  {
    path: 'input-text',
    loadChildren: () => import('./pages/input-text/input-text-page.module').then(m => m.InputTextPageModule),
    title: 'Input Text'
  },
  {
    path: 'input-textarea',
    loadChildren: () => import('./pages/input-textarea/input-textarea-page.module').then(m => m.InputTextareaPageModule),
    title: 'Input Textarea'
  },
  {
    path: 'iran-map',
    loadChildren: () => import('./pages/iran-map/iran-map-page.module').then(m => m.IranMapPageModule),
    title: 'Iran Map'
  },
  {
    path: 'jalali-datepicker',
    loadChildren: () => import('./pages/jalali-datepicker/jalali-datepicker-page.module').then(m => m.JalaliDatepickerPageModule),
    title: 'Jalali Datepicker'
  },
  {
    path: 'knob',
    loadChildren: () => import('./pages/knob/knob-page.module').then(m => m.KnobPageModule),
    title: 'Knob'
  },
  {
    path: 'listbox',
    loadChildren: () => import('./pages/listbox/listbox-page.module').then(m => m.ListboxPageModule),
    title: 'Listbox'
  },
  {
    path: 'loading-container',
    loadChildren: () => import('./pages/loading-container/loading-container-page.module').then(m => m.LoadingContainerPageModule),
    title: 'Loading Container'
  },
  {
    path: 'map',
    loadChildren: () => import('./pages/map/map-page.module').then(m => m.MapPageModule),
    title: 'Map'
  },
  {
    path: 'message',
    loadChildren: () => import('./pages/message/message-page.module').then(m => m.MessagePageModule),
    title: 'Message'
  },
  {
    path: 'multi-select',
    loadChildren: () => import('./pages/multi-select/multi-select-page.module').then(m => m.MultiSelectPageModule),
    title: 'Multi Select'
  },
  {
    path: 'radio',
    loadChildren: () => import('./pages/radio/radio-page.module').then(m => m.RadioPageModule),
    title: 'Radio'
  },
  {
    path: 'rating',
    loadChildren: () => import('./pages/rating/rating-page.module').then(m => m.RatingPageModule),
    title: 'Rating'
  },
  {
    path: 'select-button',
    loadChildren: () => import('./pages/select-button/select-button-page.module').then(m => m.SelectButtonPageModule),
    title: 'Select Button'
  },
  {
    path: 'slider',
    loadChildren: () => import('./pages/slider/slider-page.module').then(m => m.SliderPageModule),
    title: 'Slider'
  },
  {
    path: 'status',
    loadChildren: () => import('./pages/status/status-page.module').then(m => m.StatusPageModule),
    title: 'Status'
  },
  {
    path: 'switch',
    loadChildren: () => import('./pages/switch/switch-page.module').then(m => m.SwitchPageModule),
    title: 'Switch'
  },
  {
    path: 'table',
    loadChildren: () => import('./pages/table/table-page.module').then(m => m.TablePageModule),
    title: 'Table'
  },
  {
    path: 'toast',
    loadChildren: () => import('./pages/toast/toast-page.module').then(m => m.ToastPageModule),
    canDeactivate: [openDialogGuard],
    title: 'Toast'
  },
  {
    path: 'toggle-button',
    loadChildren: () => import('./pages/toggle-button/toggle-button-page.module').then(m => m.ToggleButtonPageModule),
    title: 'Toggle Button'
  },
  {
    path: 'tree',
    loadChildren: () => import('./pages/tree/tree-page.module').then(m => m.TreePageModule),
    title: 'Tree'
  },
  {
    path: 'tree-select',
    loadChildren: () => import('./pages/tree-select/tree-select-page.module').then(m => m.TreeSelectPageModule),
    title: 'Tree Select'
  },
  {
    path: 'tri-state-checkbox',
    loadChildren: () => import('./pages/tri-state-checkbox/tri-state-checkbox-page.module').then(m => m.TriStateCheckboxPageModule),
    title: 'Tri State Checkbox'
  },
  {
    path: 'utils',
    loadChildren: () => import('./pages/utils/utils-page.module').then(m => m.UtilsPageModule),
    title: 'Utils'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShowcaseRoutingModule {
}

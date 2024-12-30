import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {openDialogGuard} from "@core/guard";

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/dashboard').then(m => m.DashboardPage),
    title: 'Home'
  },
  {
    path: 'auto-complete',
    loadComponent: () => import('./pages/auto-complete').then(m => m.AutoCompletePage),
    title: 'Auto Complete'
  },
  {
    path: 'bottom-sheet',
    loadComponent: () => import('./pages/bottom-sheet').then(m => m.BottomSheetPage),
    canDeactivate: [openDialogGuard],
    title: 'Bottom Sheet'
  },
  {
    path: 'button',
    loadComponent: () => import('./pages/button').then(m => m.ButtonPage),
    title: 'Button'
  },
  {
    path: 'cascade-select',
    loadComponent: () => import('./pages/cascade-select').then(m => m.CascadeSelectPage),
    title: 'Cascade Select'
  },
  {
    path: 'checkbox',
    loadComponent: () => import('./pages/checkbox').then(m => m.CheckboxPage),
    title: 'Checkbox'
  },
  {
    path: 'checkbox-group',
    loadComponent: () => import('@modules/main/pages/showcase/pages/checkbox-group').then(m => m.CheckboxGroupPage),
    title: 'Checkbox Group'
  },
  {
    path: 'color-picker',
    loadComponent: () => import('./pages/color-picker').then(m => m.ColorPickerPage),
    title: 'Color Picker'
  },
  {
    path: 'confirm-dialog',
    loadComponent: () => import('./pages/confirm-dialog').then(m => m.ConfirmDialogPage),
    canDeactivate: [openDialogGuard],
    title: 'Confirm Dialog'
  },
  {
    path: 'confirm-popup',
    loadComponent: () => import('./pages/confirm-popup/confirm-popup.page').then(m => m.ConfirmPopupPage),
    canDeactivate: [openDialogGuard],
    title: 'Confirm Popup'
  },
  {
    path: 'datepicker',
    loadComponent: () => import('./pages/datepicker').then(m => m.DatepickerPage),
    title: 'Datepicker'
  },
  {
    path: 'dialog',
    loadComponent: () => import('./pages/dialog').then(m => m.DialogPage),
    canDeactivate: [openDialogGuard],
    title: 'Dialog'
  },
  {
    path: 'dialog-form',
    loadComponent: () => import('./pages/dialog-form').then(m => m.DialogFormPage),
    canDeactivate: [openDialogGuard],
    title: 'Dialog Form'
  },
  {
    path: 'dual-label-switch',
    loadComponent: () => import('./pages/dual-label-switch').then(m => m.DualLabelSwitchPage),
    title: 'Dual Label Switch'
  },
  {
    path: 'editor',
    loadComponent: () => import('./pages/editor').then(m => m.EditorPage),
    title: 'Editor'
  },
  {
    path: 'empty',
    loadComponent: () => import('./pages/empty').then(m => m.EmptyPage),
    title: 'Empty'
  },
  {
    path: 'file-picker',
    loadComponent: () => import('./pages/file-picker').then(m => m.FilePickerPage),
    title: 'File Picker'
  },
  {
    path: 'file-picker2',
    loadComponent: () => import('./pages/file-picker2').then(m => m.FilePicker2Page),
    title: 'File Picker2'
  },
  {
    path: 'image',
    loadComponent: () => import('./pages/image').then(m => m.ImagePage),
    title: 'Image'
  },
  {
    path: 'infinite-scroll',
    loadComponent: () => import('./pages/infinite-scroll').then(m => m.InfiniteScrollPage),
    title: 'Infinite Scroll'
  },
  {
    path: 'input-mask',
    loadComponent: () => import('./pages/input-mask').then(m => m.InputMaskPage),
    title: 'Input Mask'
  },
  {
    path: 'input-number',
    loadComponent: () => import('./pages/input-number').then(m => m.InputNumberPage),
    title: 'Input Number'
  },
  {
    path: 'input-otp',
    loadComponent: () => import('./pages/input-otp').then(m => m.InputOtpPage),
    title: 'Input Otp'
  },
  {
    path: 'input-password',
    loadComponent: () => import('./pages/input-password').then(m => m.InputPasswordPage),
    title: 'Input Password'
  },
  {
    path: 'input-text',
    loadComponent: () => import('./pages/input-text').then(m => m.InputTextPage),
    title: 'Input Text'
  },
  {
    path: 'input-textarea',
    loadComponent: () => import('./pages/input-textarea').then(m => m.InputTextareaPage),
    title: 'Input Textarea'
  },
  {
    path: 'iran-map',
    loadComponent: () => import('./pages/iran-map').then(m => m.IranMapPage),
    title: 'Iran Map'
  },
  {
    path: 'knob',
    loadComponent: () => import('./pages/knob').then(m => m.KnobPage),
    title: 'Knob'
  },
  {
    path: 'listbox',
    loadComponent: () => import('./pages/listbox').then(m => m.ListboxPage),
    title: 'Listbox'
  },
  {
    path: 'loading-container',
    loadComponent: () => import('./pages/loading-container').then(m => m.LoadingContainerPage),
    title: 'Loading Container'
  },
  {
    path: 'map',
    loadComponent: () => import('./pages/map').then(m => m.MapPage),
    title: 'Map'
  },
  {
    path: 'multi-select',
    loadComponent: () => import('./pages/multi-select').then(m => m.MultiSelectPage),
    title: 'Multi Select'
  },
  {
    path: 'radio',
    loadComponent: () => import('./pages/radio').then(m => m.RadioPage),
    title: 'Radio'
  },
  {
    path: 'rating',
    loadComponent: () => import('./pages/rating').then(m => m.RatingPage),
    title: 'Rating'
  },
  {
    path: 'select',
    loadComponent: () => import('./pages/select').then(m => m.SelectPage),
    title: 'Select'
  },
  {
    path: 'select-button',
    loadComponent: () => import('./pages/select-button').then(m => m.SelectButtonPage),
    title: 'Select Button'
  },
  {
    path: 'slider',
    loadComponent: () => import('./pages/slider').then(m => m.SliderPage),
    title: 'Slider'
  },
  {
    path: 'status',
    loadComponent: () => import('./pages/status').then(m => m.StatusPage),
    title: 'Status'
  },
  {
    path: 'toggle-switch',
    loadComponent: () => import('./pages/toggle-switch').then(m => m.ToggleSwitchPage),
    title: 'ToggleSwitch'
  },
  {
    path: 'table',
    loadComponent: () => import('./pages/table').then(m => m.TablePage),
    title: 'Table'
  },
  {
    path: 'toast',
    loadComponent: () => import('./pages/toast').then(m => m.ToastPage),
    canDeactivate: [openDialogGuard],
    title: 'Toast'
  },
  {
    path: 'toggle-button',
    loadComponent: () => import('./pages/toggle-button').then(m => m.ToggleButtonPage),
    title: 'Toggle Button'
  },
  {
    path: 'tree',
    loadComponent: () => import('./pages/tree').then(m => m.TreePage),
    title: 'Tree'
  },
  {
    path: 'tree-select',
    loadComponent: () => import('./pages/tree-select').then(m => m.TreeSelectPage),
    title: 'Tree Select'
  },
  {
    path: 'utils',
    loadComponent: () => import('./pages/utils').then(m => m.UtilsPage),
    title: 'Utils'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShowcaseRoutingModule {
}

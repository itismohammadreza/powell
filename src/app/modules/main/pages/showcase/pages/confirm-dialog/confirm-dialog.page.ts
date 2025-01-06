import {Component} from '@angular/core';
import {NgConfirmDialogOptions} from "@powell/models";
import {ButtonModule} from "@powell/components/button";
import {PreviewBase, PreviewComponent, PreviewOption} from "@modules/main/pages/showcase/components";

@Component({
  selector: 'ng-confirm-dialog-page',
  templateUrl: './confirm-dialog.page.html',
  styleUrls: ['./confirm-dialog.page.scss'],
  imports: [
    ButtonModule,
    PreviewComponent
  ]
})
export class ConfirmDialogPage extends PreviewBase {
  override previewOptions: PreviewOption[] = [
    {field: 'closable', value: true},
    {field: 'message', value: 'Are you sure?'},
    {field: 'header', value: 'Confirmation'},
    {field: 'acceptLabel', value: 'Yes'},
    {field: 'rejectLabel', value: 'No'},
    {field: 'acceptIcon', value: ''},
    {field: 'rejectIcon', value: ''},
    {field: 'acceptVisible', value: true},
    {field: 'rejectVisible', value: true},
    {field: 'acceptSeverity', value: 'primary'},
    {field: 'acceptAppearance', value: 'basic'},
    {field: 'buttonSize', value: 'small'},
    {field: 'rejectSeverity', value: 'primary'},
    {field: 'rejectAppearance', value: 'outlined'},
    {field: 'closeOnEscape', value: false},
    {field: 'dismissableMask', value: false},
    {field: 'defaultFocus', value: 'accept'},
    {field: 'blockScroll', value: false},
    {field: 'buttonFull', value: false},
    {field: 'rtl', value: this.config.rtl},
  ];

  confirmDialog: NgConfirmDialogOptions = {
    closable: true,
    message: 'Are you sure?',
    icon: '',
    header: 'Confirmation',
    acceptLabel: 'Yes',
    rejectLabel: 'No',
    acceptIcon: '',
    rejectIcon: '',
    acceptVisible: true,
    rejectVisible: true,
    acceptSeverity: 'primary',
    acceptAppearance: 'basic',
    buttonSize: 'small',
    rejectSeverity: 'primary',
    rejectAppearance: 'outlined',
    closeOnEscape: false,
    dismissableMask: false,
    defaultFocus: 'accept',
    blockScroll: false,
    buttonFull: false,
    rtl: this.config.rtl,
    style: {width: '400px'}
  }

  override onOptionChange(event: any) {
    this.confirmDialog[event.field] = event.value;
  }

  showConfirmDialog() {
    this.overlayService.showConfirmDialog(this.confirmDialog)
  }
}

import {Component} from '@angular/core';
import {ButtonModule} from "@powell/components/button";
import {PreviewBase, PreviewComponent, PreviewOption} from "@modules/main/pages/showcase/components";
import {ConfirmOptions} from "@powell/models";

@Component({
  selector: 'app-confirm-dialog-page',
  templateUrl: './confirm-dialog.page.html',
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
    {field: 'acceptSeverity', selectOptions: 'severities', value: 'primary'},
    {field: 'acceptAppearance', selectOptions: 'appearances', value: 'basic'},
    {field: 'buttonSize', selectOptions: 'sizes', value: 'small'},
    {field: 'rejectSeverity', selectOptions: 'severities', value: 'danger'},
    {field: 'rejectAppearance', selectOptions: 'appearances', value: 'outlined'},
    {field: 'closeOnEscape', value: false},
    {field: 'dismissableMask', value: false},
    {field: 'defaultFocus', selectOptions: 'defaultFocusTypes', value: 'accept'},
    {field: 'blockScroll', value: false},
    {field: 'position', selectOptions: 'dialogPositions', value: 'center'},
    {field: 'rtl', value: this.config.rtl},
  ];

  confirmDialog: ConfirmOptions = {
    closable: true,
    message: 'Are you sure you want to proceed?',
    icon: '',
    header: 'Confirmation',
    acceptLabel: 'Yes',
    rejectLabel: 'No',
    acceptIcon: '',
    rejectIcon: '',
    acceptVisible: true,
    rejectVisible: true,
    closeOnEscape: false,
    dismissableMask: false,
    defaultFocus: 'accept',
    blockScroll: false,
    rtl: this.config.rtl,
    style: {width: '400px'},
    acceptButtonProps: {
      severity: this.getOption('acceptSeverity'),
      appearance: this.getOption('acceptAppearance')
    },
    rejectButtonProps: {
      severity: this.getOption('rejectSeverity'),
      appearance: this.getOption('rejectAppearance')
    }
  }

  override onOptionChange(event: PreviewOption) {
    switch (event.field) {
      case 'acceptSeverity':
        this.confirmDialog.acceptButtonProps.severity = event.value;
        break;
      case 'acceptAppearance':
        this.confirmDialog.acceptButtonProps.appearance = event.value;
        break;

      case 'rejectSeverity':
        this.confirmDialog.rejectButtonProps.appearance = event.value;
        break;
      case 'rejectAppearance':
        this.confirmDialog.rejectButtonProps.appearance = event.value;
        break;
    }
    this.confirmDialog[event.field] = event.value;
  }

  showConfirmDialog() {
    this.overlayService.showConfirmDialog(this.confirmDialog)
  }
}

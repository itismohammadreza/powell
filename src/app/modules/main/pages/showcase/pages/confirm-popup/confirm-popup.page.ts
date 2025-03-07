import {Component} from '@angular/core';
import {NgConfirmOptions} from "@powell/models";
import {ButtonModule} from "@powell/components/button";
import {PreviewBase, PreviewComponent, PreviewOption} from "@modules/main/pages/showcase/components";

@Component({
  selector: 'ng-confirm-popup-page',
  templateUrl: './confirm-popup.page.html',
  styleUrls: ['./confirm-popup.page.scss'],
  imports: [
    ButtonModule,
    PreviewComponent
  ]
})
export class ConfirmPopupPage extends PreviewBase {
  override previewOptions: PreviewOption[] = [
    {field: 'message', value: 'Are you sure?'},
    {field: 'icon', value: 'pi pi-exclamation-triangle'},
    {field: 'acceptLabel', value: 'Yes'},
    {field: 'rejectLabel', value: 'No'},
    {field: 'acceptIcon', value: ''},
    {field: 'rejectIcon', value: ''},
    {field: 'acceptVisible', value: true},
    {field: 'rejectVisible', value: true},
    {field: 'acceptSeverity', options: 'severities', value: 'primary'},
    {field: 'acceptAppearance', options: 'appearances', value: 'basic'},
    {field: 'buttonSize', options: 'sizes', value: 'small'},
    {field: 'rejectSeverity', options: 'severities', value: 'danger'},
    {field: 'rejectAppearance', options: 'appearances', value: 'outlined'},
    {field: 'closeOnEscape', value: false},
    {field: 'defaultFocus', options: 'defaultFocusTypes', value: 'accept'},
    {field: 'blockScroll', value: false},
    {field: 'buttonFull', value: false},
    {field: 'rtl', value: this.config.rtl},
  ];

  confirmPopup: NgConfirmOptions = {
    message: 'Are you sure?',
    icon: 'pi pi-exclamation-triangle',
    acceptLabel: 'Yes',
    rejectLabel: 'No',
    acceptIcon: '',
    rejectIcon: '',
    acceptVisible: true,
    rejectVisible: true,
    closeOnEscape: false,
    defaultFocus: 'accept',
    blockScroll: false,
    rtl: this.config.rtl,
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
        this.confirmPopup.acceptButtonProps.severity = event.value;
        break;
      case 'acceptAppearance':
        this.confirmPopup.acceptButtonProps.appearance = event.value;
        break;

      case 'rejectSeverity':
        this.confirmPopup.rejectButtonProps.appearance = event.value;
        break;
      case 'rejectAppearance':
        this.confirmPopup.rejectButtonProps.appearance = event.value;
        break;
    }
    this.confirmPopup[event.field] = event.value;
  }

  showConfirmPopup(event: MouseEvent) {
    this.overlayService.showConfirmPopup({...this.confirmPopup, target: event.target})
  }
}

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
    {field: 'defaultFocus', value: 'accept'},
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
    defaultFocus: 'accept',
    rtl: this.config.rtl
  }

  override onOptionChange(event: any) {
    this.confirmPopup[event.field] = event.value;
  }

  showConfirmPopup(event) {
    this.overlayService.showConfirmPopup({...this.confirmPopup, target: event.target})
  }
}

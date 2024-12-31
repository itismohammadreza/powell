import {Component} from '@angular/core';
import {NgToastOptions} from "@powell/models";
import {ButtonModule} from "@powell/components/button";
import {PreviewBase, PreviewComponent, PreviewOption} from "@modules/main/pages/showcase/components";

@Component({
  selector: 'ng-toast-page',
  templateUrl: './toast.page.html',
  styleUrls: ['./toast.page.scss'],
  imports: [
    ButtonModule,
    PreviewComponent
  ]
})
export class ToastPage extends PreviewBase {
  override previewOptions: PreviewOption[] = [
    {field: 'life', value: 3000},
    {field: 'sticky', value: false},
    {field: 'rtl', value: this.config.rtl},
    {field: 'summary', value: 'Some Summary'},
    {field: 'closable', value: false},
    {field: 'severity', value: 'info'},
    {field: 'icon', value: 'pi pi-info'},
    {field: 'detail', value: 'Some Detail'},
    {field: 'preventDuplicates', value: false},
    {field: 'position', value: 'top-right'},
  ];

  toast: NgToastOptions = {
    life: 3000,
    sticky: false,
    rtl: this.config.rtl,
    summary: 'Some Summary',
    closable: false,
    severity: 'info',
    icon: 'pi pi-info',
    detail: 'Some Detail',
    preventDuplicates: false,
    position: 'top-right'
  }

  override onOptionChange(event: any) {
    this.toast[event.field] = event.value;
  }

  showToast() {
    this.overlayService.showToast(this.toast)
  }
}

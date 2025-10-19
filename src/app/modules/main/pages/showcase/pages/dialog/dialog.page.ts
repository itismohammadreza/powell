import {Component} from '@angular/core';
import {DialogOptions} from "@powell/models";
import {ButtonModule} from "@powell/components/button";
import {PreviewBase, PreviewComponent, PreviewOption} from "@modules/main/pages/showcase/components";

@Component({
  selector: 'app-dialog-page',
  templateUrl: './dialog.page.html',
  imports: [
    ButtonModule,
    PreviewComponent
  ]
})
export class DialogPage extends PreviewBase {
  override previewOptions: PreviewOption[] = [
    {field: 'header', value: 'Dialog'},
    {field: 'draggable', value: false},
    {field: 'resizable', value: false},
    {field: 'modal', value: true},
    {field: 'position', selectOptions: 'dialogPositions', value: 'center'},
    {field: 'blockScroll', value: false},
    {field: 'closeOnEscape', value: false},
    {field: 'dismissableMask', value: false},
    {field: 'closable', value: true},
    {field: 'showHeader', value: true},
    {field: 'maximizable', value: true},
    {field: 'rtl', value: this.config.rtl},
    {field: 'content', value: 'Some content inside dialog.'},
  ];

  dialog: DialogOptions = {
    header: 'Dialog',
    draggable: false,
    resizable: false,
    modal: true,
    position: 'center',
    blockScroll: false,
    closeOnEscape: false,
    dismissableMask: false,
    closable: true,
    showHeader: true,
    maximizable: true,
    rtl: this.config.rtl,
    content: 'Some content inside dialog.',
  }

  override onOptionChange(event: PreviewOption) {
    this.dialog[event.field] = event.value;
  }

  showDialog() {
    this.overlayService.showDialog(this.dialog)
  }
}

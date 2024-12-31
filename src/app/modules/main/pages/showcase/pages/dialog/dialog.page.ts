import {Component} from '@angular/core';
import {NgDialogOptions} from "@powell/models";
import {ButtonModule} from "@powell/components/button";
import {PreviewBase, PreviewComponent, PreviewOption} from "@modules/main/pages/showcase/components";

@Component({
  selector: 'ng-dialog-page',
  templateUrl: './dialog.page.html',
  styleUrls: ['./dialog.page.scss'],
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
    {field: 'position', value: 'center'},
    {field: 'blockScroll', value: false},
    {field: 'closeOnEscape', value: false},
    {field: 'dismissableMask', value: false},
    {field: 'closable', value: true},
    {field: 'showHeader', value: true},
    {field: 'maximizable', value: true},
    {field: 'buttonIcon', value: ''},
    {field: 'buttonIconPos', value: 'right'},
    {field: 'buttonFull', value: false},
    {field: 'buttonLabel', value: 'Ok'},
    {field: 'buttonSeverity', value: 'primary'},
    {field: 'buttonAppearance', value: 'basic'},
    {field: 'buttonSize', value: 'small'},
    {field: 'rtl', value: this.config.rtl},
    {field: 'content', value: 'Some content inside dialog.'},
  ];

  dialog: NgDialogOptions = {
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
    buttonIcon: '',
    buttonIconPos: 'right',
    buttonFull: false,
    buttonLabel: 'Ok',
    buttonSeverity: 'primary',
    buttonAppearance: 'basic',
    buttonSize: 'small',
    rtl: this.config.rtl,
    content: 'Some content inside dialog.',
  }

  override onOptionChange(event: any) {
    this.dialog[event.field] = event.value;
  }

  showDialog() {
    this.overlayService.showDialog(this.dialog)
  }
}

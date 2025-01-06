import {Component, ViewChild} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {FilePickerComponent, FilePickerModule} from "@powell/components/file-picker";
import {PreviewBase, PreviewComponent, PreviewOption} from "@modules/main/pages/showcase/components";

@Component({
  selector: 'ng-file-picker-page',
  templateUrl: './file-picker.page.html',
  styleUrls: ['./file-picker.page.scss'],
  imports: [
    FilePickerModule,
    ReactiveFormsModule,
    PreviewComponent
  ]
})
export class FilePickerPage extends PreviewBase {
  @ViewChild(FilePickerComponent, {static: true}) declare cmpRef: FilePickerComponent;

  override previewOptions: PreviewOption[] = [
    {field: 'label', value: 'label'},
    {field: 'labelWidth', value: 100},
    {field: 'hint', value: ''},
    {field: 'rtl', value: this.config.rtl},
    {field: 'showRequiredStar', value: this.config.showRequiredStar},
    {field: 'labelPosition', options: 'fixLabelPositions', value: this.config.fixLabelPosition},
    {field: 'followConfig', value: this.config.followConfig},
    {field: 'multiple', value: true},
    {field: 'accept', value: 'image/*'},
    {field: 'disabled', value: false},
    {field: 'maxFileSize', value: 1000000},
    {field: 'fileLimit', value: 0},
    {field: 'previewWidth', value: 50},
    {field: 'chooseLabel', value: 'انتخاب'},
    {field: 'uploadLabel', value: 'آپلود'},
    {field: 'cancelLabel', value: 'انصراف'},
    {field: 'chooseIcon', value: 'pi pi-plus'},
    {field: 'uploadIcon', value: 'pi pi-upload'},
    {field: 'cancelIcon', value: 'pi pi-times'},
    {field: 'showUploadButton', value: true},
    {field: 'showCancelButton', value: true},
    {field: 'mode', value: 'advanced'},
  ];
}

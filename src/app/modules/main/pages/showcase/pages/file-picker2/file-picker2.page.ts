import {Component, ViewChild} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {FilePicker2Component, FilePicker2Module} from "@powell/components/file-picker2";
import {PreviewBase, PreviewComponent, PreviewOption} from "@modules/main/pages/showcase/components";

@Component({
  selector: 'ng-file-picker2-page',
  templateUrl: './file-picker2.page.html',
  imports: [
    FilePicker2Module,
    ReactiveFormsModule,
    PreviewComponent
  ]
})
export class FilePicker2Page extends PreviewBase {
  @ViewChild(FilePicker2Component) declare cmpRef: FilePicker2Component;

  override previewOptions: PreviewOption[] = [
    {field: 'label', value: 'label'},
    {field: 'labelWidth', value: 100},
    {field: 'hint', value: ''},
    {field: 'rtl', value: this.config.rtl},
    {field: 'showRequiredStar', value: this.config.showRequiredStar},
    {field: 'labelPosition', options: 'fixLabelPositions', value: this.config.fixLabelPosition},
    {field: 'followConfig', value: this.config.followConfig},
    {field: 'disabled', value: false},
    {field: 'readonly', value: false},
    {field: 'multiple', value: false},
    {field: 'accept', value: ''},
    {field: 'maxFileSize', value: 10000000000},
    {field: 'fileLimit', value: 20000},
    {field: 'chooseLabel', value: 'choose'},
    {field: 'fluid', value: false},
  ];
}

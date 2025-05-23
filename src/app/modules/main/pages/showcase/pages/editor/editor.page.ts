import {Component, ViewChild} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {EditorComponent, EditorModule} from "@powell/components/editor";
import {PreviewBase, PreviewComponent, PreviewOption} from "@modules/main/pages/showcase/components";

@Component({
  selector: 'ng-editor-page',
  templateUrl: './editor.page.html',
  imports: [
    EditorModule,
    ReactiveFormsModule,
    PreviewComponent
  ]
})
export class EditorPage extends PreviewBase {
  @ViewChild(EditorComponent) declare cmpRef: EditorComponent;

  override previewOptions: PreviewOption[] = [
    {field: 'label', value: 'label'},
    {field: 'labelWidth', value: 100},
    {field: 'hint', value: ''},
    {field: 'rtl', value: this.config.rtl},
    {field: 'showRequiredStar', value: this.config.showRequiredStar},
    {field: 'labelPosition', selectOptions: 'fixLabelPositions', value: this.config.fixLabelPosition},
    {field: 'disabled', value: false},
    {field: 'readonly', value: false},
    {field: 'followConfig', value: this.config.followConfig},
  ];
}

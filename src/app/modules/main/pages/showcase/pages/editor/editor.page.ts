import {Component, ViewChild} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {EditorComponent, EditorModule} from "@powell/components/editor";
import {PreviewBase, PreviewComponent, PreviewOption} from "@modules/main/pages/showcase/components";

@Component({
  selector: 'ng-editor-page',
  templateUrl: './editor.page.html',
  styleUrls: ['./editor.page.scss'],
  imports: [
    EditorModule,
    ReactiveFormsModule,
    PreviewComponent
  ]
})
export class EditorPage extends PreviewBase {
  @ViewChild(EditorComponent, {static: true}) declare cmpRef: EditorComponent;

  override previewOptions: PreviewOption[] = [
    {field: 'label', value: 'label'},
    {field: 'labelWidth', value: 100},
    {field: 'hint', value: ''},
    {field: 'rtl', value: this.config.rtl},
    {field: 'showRequiredStar', value: this.config.showRequiredStar},
    {field: 'icon', value: ''},
    {field: 'labelPos', value: this.config.fixLabelPos},
    {field: 'disabled', value: false},
    {field: 'readonly', value: false},
    {field: 'followConfig', value: this.config.followConfig},
  ];
}

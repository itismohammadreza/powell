import {Component, ViewChild} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {AutoCompleteComponent, AutoCompleteModule} from "@powell/components/auto-complete";
import {PreviewBase, PreviewComponent, PreviewOption} from "@modules/main/pages/showcase/components";
import {$AutoCompleteCompleteEvent} from "@powell/primeng";

@Component({
  selector: 'auto-complete-page',
  templateUrl: './auto-complete.page.html',
  imports: [
    AutoCompleteModule,
    PreviewComponent,
    ReactiveFormsModule,
  ]
})
export class AutoCompletePage extends PreviewBase {
  @ViewChild(AutoCompleteComponent) declare cmpRef: AutoCompleteComponent;

  override previewOptions: PreviewOption[] = [
    {field: 'label', value: 'label'},
    {field: 'labelWidth', value: 100},
    {field: 'hint', value: ''},
    {field: 'rtl', value: this.config.rtl},
    {field: 'showRequiredStar', value: this.config.showRequiredStar},
    {field: 'labelPosition', selectOptions: 'labelPositions', value: this.config.labelPosition},
    {field: 'additions', selectOptions: 'additions', value: 'none'},
    {field: 'followConfig', value: this.config.followConfig},
    {field: 'placeholder', value: ''},
    {field: 'readonly', value: false},
    {field: 'disabled', value: false},
    {field: 'maxlength', value: 100},
    {field: 'size', selectOptions: 'sizes', value: this.config.inputSize},
    {field: 'unique', value: true},
    {field: 'showClear', value: true},
    {field: 'dropdown', value: false},
    {field: 'multiple', value: false},
    {field: 'emptyMessage', value: ''},
    {field: 'variant', selectOptions: 'variants', value: this.config.inputStyle},
    {field: 'fluid', value: false},
  ];

  items: any[] = [];

  search(event: $AutoCompleteCompleteEvent) {
    this.items = [...Array(10).keys()].map(item => event.query + '-' + item);
  }
}

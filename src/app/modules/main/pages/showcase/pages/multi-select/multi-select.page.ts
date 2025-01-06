import {Component, ViewChild} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {MultiSelectComponent, MultiSelectModule} from "@powell/components/multi-select";
import {PreviewBase, PreviewComponent, PreviewOption} from "@modules/main/pages/showcase/components";

@Component({
  selector: 'ng-multi-select-page',
  templateUrl: './multi-select.page.html',
  styleUrls: ['./multi-select.page.scss'],
  imports: [
    MultiSelectModule,
    ReactiveFormsModule,
    PreviewComponent
  ]
})
export class MultiSelectPage extends PreviewBase {
  @ViewChild(MultiSelectComponent, {static: true}) declare cmpRef: MultiSelectComponent;

  override previewOptions: PreviewOption[] = [
    {field: 'label', value: 'label'},
    {field: 'labelWidth', value: 100},
    {field: 'hint', value: ''},
    {field: 'rtl', value: this.config.rtl},
    {field: 'showRequiredStar', value: this.config.showRequiredStar},
    {field: 'icon', value: ''},
    {field: 'labelPos', value: this.config.labelPos},
    {field: 'iconPos', value: 'left'},
    {field: 'addon', value: ''},
    {field: 'followConfig', value: this.config.followConfig},
    {field: 'disabled', value: false},
    {field: 'fluid', value: false},
    {field: 'readonly', value: false},
    {field: 'variant', value: this.config.inputStyle},
    {field: 'displaySelectedLabel', value: true},
    {field: 'maxSelectedLabels', value: 3},
    {field: 'selectionLimit', value: ''},
    {field: 'selectedItemsLabel', value: 'ellipsis'},
    {field: 'showToggleAll', value: true},
    {field: 'resetFilterOnHide', value: false},
    {field: 'showHeader', value: true},
    {field: 'autofocusFilter', value: false},
    {field: 'filter', value: true},
    {field: 'overlayVisible', value: false},
    {field: 'display', value: 'comma'},
    {field: 'size', value: this.config.inputSize},
    {field: 'showClear', value: true},
    {field: 'placeholder', value: ''},
  ];
}

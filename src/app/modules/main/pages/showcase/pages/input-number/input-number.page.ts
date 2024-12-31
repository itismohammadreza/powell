import {Component, ViewChild} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {InputNumberComponent, InputNumberModule} from "@powell/components/input-number";
import {PreviewBase, PreviewComponent, PreviewOption} from "@modules/main/pages/showcase/components";

@Component({
  selector: 'ng-input-number-page',
  templateUrl: './input-number.page.html',
  styleUrls: ['./input-number.page.scss'],
  imports: [
    InputNumberModule,
    ReactiveFormsModule,
    PreviewComponent
  ]
})
export class InputNumberPage extends PreviewBase {
  @ViewChild(InputNumberComponent, {static: true}) declare cmpRef: InputNumberComponent;

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
    {field: 'showButtons', value: true},
    {field: 'format', value: true},
    {field: 'buttonLayout', value: 'stacked'},
    {field: 'placeholder', value: ''},
    {field: 'size', value: this.config.inputSize},
    {field: 'maxlength', value: ''},
    {field: 'min', value: 0},
    {field: 'max', value: 100},
    {field: 'readonly', value: false},
    {field: 'step', value: 1},
    {field: 'allowEmpty', value: true},
    {field: 'useGrouping', value: true},
    {field: 'variant', value: this.config.inputStyle},
    {field: 'prefix', value: ''},
    {field: 'suffix', value: ''},
    {field: 'showClear', value: true},
    {field: 'disabled', value: false},
    {field: 'fluid', value: false},
  ];
}

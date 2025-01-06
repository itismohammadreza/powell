import {Component, ViewChild} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {SelectComponent, SelectModule} from "@powell/components/select";
import {PreviewBase, PreviewComponent, PreviewOption} from "@modules/main/pages/showcase/components";

@Component({
  selector: 'ng-select-page',
  templateUrl: './select.page.html',
  styleUrls: ['./select.page.scss'],
  imports: [
    SelectModule,
    ReactiveFormsModule,
    PreviewComponent
  ]
})
export class SelectPage extends PreviewBase {
  @ViewChild(SelectComponent, {static: true}) declare cmpRef: SelectComponent;

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
    {field: 'async', value: false},
    {field: 'filter', value: false},
    {field: 'readonly', value: false},
    {field: 'editable', value: false},
    {field: 'placeholder', value: ''},
    {field: 'variant', value: this.config.inputStyle},
    {field: 'resetFilterOnHide', value: false},
    {field: 'checkmark', value: false},
    {field: 'dropdownIcon', value: ''},
    {field: 'showClear', value: true},
    {field: 'size', value: this.config.inputSize},
    {field: 'maxlength', value: 100},
    {field: 'focusOnHover', value: false},
    {field: 'autofocusFilter', value: false},
    {field: 'fluid', value: false},
    {field: 'disabled', value: false},
  ];
}

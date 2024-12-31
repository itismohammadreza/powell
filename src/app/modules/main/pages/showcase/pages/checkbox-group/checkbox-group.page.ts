import {Component, ViewChild} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {CheckboxGroupComponent, CheckboxGroupModule} from "@powell/components/checkbox-group";
import {PreviewBase, PreviewComponent, PreviewOption} from "@modules/main/pages/showcase/components";

@Component({
  selector: 'ng-checkbox-group-page',
  templateUrl: './checkbox-group.page.html',
  styleUrls: ['./checkbox-group.page.scss'],
  imports: [
    CheckboxGroupModule,
    ReactiveFormsModule,
    PreviewComponent
  ]
})
export class CheckboxGroupPage extends PreviewBase {
  @ViewChild(CheckboxGroupComponent, {static: true}) declare cmpRef: CheckboxGroupComponent;

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
    {field: 'orientation', value: 'vertical'},
    {field: 'async', value: false},
    {field: 'disabled', value: false},
    {field: 'size', value: this.config.inputSize},
    {field: 'readonly', value: false},
    {field: 'variant', value: this.config.inputStyle},
  ];

  options: any[] = [
    {label: 'Australia', value: 'AU'},
    {label: 'Brazil', value: 'BR'},
    {label: 'China', value: 'CN'},
    {label: 'Egypt', value: 'EG'},
    {label: 'France', value: 'FR'},
    {label: 'Germany', value: 'DE'},
    {label: 'India', value: 'IN'},
    {label: 'Japan', value: 'JP'},
    {label: 'Spain', value: 'ES'},
    {label: 'United States', value: 'US'}
  ];
}

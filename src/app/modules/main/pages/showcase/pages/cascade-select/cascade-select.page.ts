import {Component, ViewChild} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {CascadeSelectComponent, CascadeSelectModule} from "@powell/components/cascade-select";
import {PreviewBase, PreviewComponent, PreviewOption} from "@modules/main/pages/showcase/components";

@Component({
  selector: 'cascade-select-page',
  templateUrl: './cascade-select.page.html',
  imports: [
    CascadeSelectModule,
    ReactiveFormsModule,
    PreviewComponent
  ]
})
export class CascadeSelectPage extends PreviewBase {
  @ViewChild(CascadeSelectComponent) declare cmpRef: CascadeSelectComponent;

  override previewOptions: PreviewOption[] = [
    {field: 'label', value: 'label'},
    {field: 'labelWidth', value: 100},
    {field: 'hint', value: ''},
    {field: 'rtl', value: this.config.rtl},
    {field: 'showRequiredStar', value: this.config.showRequiredStar},
    {field: 'labelPosition', selectOptions: 'labelPositions', value: this.config.labelPosition},
    {field: 'additions', selectOptions: 'additions', value: 'none'},
    {field: 'followConfig', value: this.config.followConfig},
    {field: 'size', selectOptions: 'sizes', value: this.config.inputSize},
    {field: 'disabled', value: false},
    {field: 'placeholder', value: ''},
    {field: 'showClear', value: true},
    {field: 'variant', selectOptions: 'variants', value: this.config.inputVariant},
    {field: 'fluid', value: true},
  ];

  override options: SafeAny[] = [
    {
      name: 'Australia',
      code: 'AU',
      states: [
        {
          name: 'New South Wales',
          cities: [
            {cname: 'Sydney', code: 'A-SY'},
            {cname: 'Newcastle', code: 'A-NE'},
            {cname: 'Wollongong', code: 'A-WO'}
          ]
        },
        {
          name: 'Queensland',
          cities: [
            {cname: 'Brisbane', code: 'A-BR'},
            {cname: 'Townsville', code: 'A-TO'}
          ]
        }
      ]
    },
    {
      name: 'Canada',
      code: 'CA',
      states: [
        {
          name: 'Quebec',
          cities: [
            {cname: 'Montreal', code: 'C-MO'},
            {cname: 'Quebec City', code: 'C-QU'}
          ]
        },
        {
          name: 'Ontario',
          cities: [
            {cname: 'Ottawa', code: 'C-OT'},
            {cname: 'Toronto', code: 'C-TO'}
          ]
        }
      ]
    },
    {
      name: 'United States',
      code: 'US',
      states: [
        {
          name: 'California',
          cities: [
            {cname: 'Los Angeles', code: 'US-LA'},
            {cname: 'San Diego', code: 'US-SD'},
            {cname: 'San Francisco', code: 'US-SF'}
          ]
        },
        {
          name: 'Florida',
          cities: [
            {cname: 'Jacksonville', code: 'US-JA'},
            {cname: 'Miami', code: 'US-MI'},
            {cname: 'Tampa', code: 'US-TA'},
            {cname: 'Orlando', code: 'US-OR'}
          ]
        },
        {
          name: 'Texas',
          cities: [
            {cname: 'Austin', code: 'US-AU'},
            {cname: 'Dallas', code: 'US-DA'},
            {cname: 'Houston', code: 'US-HO'}
          ]
        }
      ]
    }
  ];

}

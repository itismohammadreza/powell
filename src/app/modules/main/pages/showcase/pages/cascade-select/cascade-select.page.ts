import {Component, ViewChild} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {CascadeSelectComponent, CascadeSelectModule} from "@powell/components/cascade-select";
import {PreviewBase, PreviewComponent, PreviewOption} from "@modules/main/pages/showcase/components";

@Component({
  selector: 'ng-cascade-select-page',
  templateUrl: './cascade-select.page.html',
  styleUrls: ['./cascade-select.page.scss'],
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
    {field: 'labelPosition', options: 'labelPositions', value: this.config.labelPosition},
    {field: 'additions', options: 'additions', value: 'none'},
    {field: 'followConfig', value: this.config.followConfig},
    {field: 'size', options: 'sizes', value: this.config.inputSize},
    {field: 'disabled', value: false},
    {field: 'placeholder', value: ''},
    {field: 'showClear', value: true},
    {field: 'variant', options: 'variants', value: this.config.inputStyle},
    {field: 'fluid', value: true},
  ];

  override options: any[] = [
    {
      name: 'Australia',
      value: 'AU',
      states: [
        {
          name: 'New South Wales',
          cities: [
            {label: 'Sydney', value: 'A-SY'},
            {label: 'Newcastle', value: 'A-NE'},
            {label: 'Wollongong', value: 'A-WO'}
          ]
        },
        {
          name: 'Queensland',
          cities: [
            {label: 'Brisbane', value: 'A-BR'},
            {label: 'Townsville', value: 'A-TO'}
          ]
        }
      ]
    },
    {
      name: 'Canada',
      value: 'CA',
      states: [
        {
          name: 'Quebec',
          cities: [
            {label: 'Montreal', value: 'C-MO'},
            {label: 'Quebec City', value: 'C-QU'}
          ]
        },
        {
          name: 'Ontario',
          cities: [
            {label: 'Ottawa', value: 'C-OT'},
            {label: 'Toronto', value: 'C-TO'}
          ]
        }
      ]
    },
    {
      name: 'United States',
      value: 'US',
      states: [
        {
          name: 'California',
          cities: [
            {label: 'Los Angeles', value: 'US-LA'},
            {label: 'San Diego', value: 'US-SD'},
            {label: 'San Francisco', value: 'US-SF'}
          ]
        },
        {
          name: 'Florida',
          cities: [
            {label: 'Jacksonville', value: 'US-JA'},
            {label: 'Miami', value: 'US-MI'},
            {label: 'Tampa', value: 'US-TA'},
            {label: 'Orlando', value: 'US-OR'}
          ]
        },
        {
          name: 'Texas',
          cities: [
            {label: 'Austin', value: 'US-AU'},
            {label: 'Dallas', value: 'US-DA'},
            {label: 'Houston', value: 'US-HO'}
          ]
        }
      ]
    }
  ];

}

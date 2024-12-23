import {Component, inject} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {NgAddon, NgIconPosition, NgInputVariant, NgLabelPosition, NgSize} from '@powell/models';
import {ConfigService} from "@powell/api";
import {CascadeSelectModule} from "@powell/components/cascade-select";
import {ExtrasModule} from "@modules/main/pages/showcase/extras.module";
import {
  PreviewOptionsComponent
} from "@modules/main/pages/showcase/components/preview-options/preview-options.component";

@Component({
  selector: 'ng-cascade-select-page',
  templateUrl: './cascade-select.page.html',
  styleUrls: ['./cascade-select.page.scss'],
  imports: [
    CascadeSelectModule,
    ReactiveFormsModule,
    ExtrasModule,
    PreviewOptionsComponent
  ]
})
export class CascadeSelectPage {
  private configService = inject(ConfigService);

  form = new FormGroup({
    c1: new FormControl(null, [Validators.required]),
  });
  binding: any;

  label: string = 'label';
  variant: NgInputVariant = this.configService.get().inputStyle;
  labelWidth: number = 100;
  hint: string = '';
  rtl: boolean = this.configService.get().rtl;
  showRequiredStar: boolean = this.configService.get().showRequiredStar;
  icon: string = '';
  labelPos: NgLabelPosition = this.configService.get().labelPos;
  iconPos: NgIconPosition = 'left';
  addon: NgAddon;
  inputSize: NgSize = this.configService.get().inputSize;
  followConfig: boolean = this.configService.get().followConfig;
  // native properties
  disabled: boolean = false;
  placeholder: string = '';
  showClear: boolean = true;

  options: any[] = [
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

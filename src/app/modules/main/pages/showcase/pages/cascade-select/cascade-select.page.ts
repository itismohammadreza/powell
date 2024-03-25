import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {NgAddon, NgIconPosition, NgLabelPosition, NgSize} from '@powell/models';
import {ConfigService} from "@powell/api";

@Component({
  selector: 'ng-cascade-select-page',
  templateUrl: './cascade-select.page.html',
  styleUrls: ['./cascade-select.page.scss']
})
export class CascadeSelectPage {
  form = new FormGroup({
    c1: new FormControl(null, [Validators.required]),
  });
  binding: any;

  label: string = 'label';
  filled: boolean = this.configService.getConfig().filled;
  labelWidth: number = 100;
  hint: string = '';
  rtl: boolean = this.configService.getConfig().rtl;
  showRequiredStar: boolean = this.configService.getConfig().showRequiredStar;
  icon: string = '';
  labelPos: NgLabelPosition = this.configService.getConfig().labelPos;
  iconPos: NgIconPosition = 'left';
  addon: NgAddon;
  inputSize: NgSize = this.configService.getConfig().inputSize;
  disableConfigChangeEffect: boolean = this.configService.getConfig().disableConfigChangeEffect;
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

  constructor(private configService: ConfigService) {
  }
}

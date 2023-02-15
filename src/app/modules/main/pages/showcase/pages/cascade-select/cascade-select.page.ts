import {Component, Inject} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {NgAddon, NgLabelPosition} from '@ng/models/forms';
import {NgIconPosition, NgSize} from '@ng/models/offset';
import {NgConfig} from "@ng/models/config";

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
  filled: boolean = false;
  labelWidth: number = 100;
  hint: string = '';
  rtl: boolean = this.ngConfig.rtl;
  icon: string = '';
  labelPos: NgLabelPosition = this.ngConfig.labelPos;
  iconPos: NgIconPosition = 'left';
  inputSize: NgSize = 'md';
  addon: NgAddon;
  // native properties
  disabled: boolean = false;
  placeholder: string = '';
  showClear: boolean = true;

  options = [
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

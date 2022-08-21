import {Component} from '@angular/core';
import {UntypedFormControl, UntypedFormGroup, Validators} from '@angular/forms';
import {NgAddon, NgLabelPosition} from '@ng/models/forms';
import {NgPosition, NgSize} from '@ng/models/offset';

@Component({
  selector: 'ng-cascade-select-page',
  templateUrl: './cascade-select.page.html',
  styleUrls: ['./cascade-select.page.scss']
})
export class CascadeSelectPage {
  form = new UntypedFormGroup({
    c1: new UntypedFormControl(null, [Validators.required]),
  });
  binding: any;

  label: string = 'label';
  filled: boolean = false;
  labelWidth: number = 100;
  hint: string = '';
  rtl: boolean = true;
  icon: string = 'pi pi-home';
  labelPos: NgLabelPosition = 'fix-side';
  iconPos: NgPosition = 'left';
  inputSize: NgSize = 'md';
  addon: NgAddon = {
    before: {
      type: 'icon',
      icon: 'pi pi-home',
    },
    after: {
      type: 'button',
      label: 'home',
    },
  };
  // native properties
  disabled: boolean = false;
  placeholder: string = '';
  showClear: boolean = false

  options = [
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

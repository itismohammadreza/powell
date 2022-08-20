import {Component} from '@angular/core';

@Component({
  selector: 'ng-dynamic-form-page',
  templateUrl: './dynamic-form.page.html',
  styleUrls: ['./dynamic-form.page.scss']
})
export class DynamicFormPage {
  config = [
    {
      type: 'text',
      formControlName: 'text1'
    }, {
      type: 'text',
      formControlName: 'text2'
    }
  ];
}

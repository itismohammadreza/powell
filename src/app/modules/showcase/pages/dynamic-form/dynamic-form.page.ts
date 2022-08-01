import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ng-dynamic-form-page',
  templateUrl: './dynamic-form.page.html',
  styleUrls: ['./dynamic-form.page.scss']
})
export class DynamicFormPage implements OnInit {
  config = [
    {
      type: 'text',
      formControlName: 'text1'
    }, {
      type: 'text',
      formControlName: 'text2'
    }
  ];

  ngOnInit(): void {
  }
}

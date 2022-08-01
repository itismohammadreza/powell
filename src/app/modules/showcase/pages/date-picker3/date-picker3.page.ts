import {Component, OnInit} from '@angular/core';
import {UntypedFormControl, UntypedFormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'ng-date-picker3-page',
  templateUrl: './date-picker3.page.html',
  styleUrls: ['./date-picker3.page.scss']
})
export class DatePicker3Page implements OnInit {
  form = new UntypedFormGroup({
    c1: new UntypedFormControl(null, [Validators.required]),
  });
  binding;
  submit() {}
  ngOnInit(): void {}
}

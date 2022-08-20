import {Component} from '@angular/core';
import {UntypedFormControl, UntypedFormGroup, Validators} from '@angular/forms';
import {NgLabelPosition} from '@ng/models/forms';
import {NgOrientation} from '@ng/models/offset';

@Component({
  selector: 'ng-slider-page',
  templateUrl: './slider.page.html',
  styleUrls: ['./slider.page.scss'],
})
export class SliderPage {
  form = new UntypedFormGroup({
    c1: new UntypedFormControl(null, [Validators.required]),
  });
  binding;

  label: string = 'label';
  labelWidth: number = 100;
  hint: string = '';
  rtl: boolean = true;
  labelPos: NgLabelPosition = 'fix-side';
  // native properties
  animate: boolean = false;
  disabled: boolean = false;
  min: number = 0;
  max: number = 100;
  orientation: NgOrientation = 'horizontal';
  step: number = 1;
  range: boolean = false;

  submit() {
  }
}

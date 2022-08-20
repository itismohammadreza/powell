import {Component} from '@angular/core';
import {UntypedFormControl, UntypedFormGroup, Validators} from '@angular/forms';
import {NgColor} from '@ng/models/color';
import {NgError, NgLabelPosition} from '@ng/models/forms';

@Component({
  selector: 'ng-file-picker2-page',
  templateUrl: './file-picker2.page.html',
  styleUrls: ['./file-picker2.page.scss'],
})
export class FilePicker2Page {
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
  showImagePreview: boolean = true;
  disabled: boolean = false;
  readonly: boolean = false;
  multiple: boolean = true;
  accept: string = '';
  color: NgColor = 'primary';
  fileLimit: number = 20000;
  chooseLabel: string = 'انتخاب';

  submit() {
  }
}

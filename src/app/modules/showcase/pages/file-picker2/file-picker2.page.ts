import {Component, OnInit} from '@angular/core';
import {UntypedFormControl, UntypedFormGroup, Validators} from '@angular/forms';
import {NgColor} from '@ng/models/color';
import {NgLabelPosition} from '@ng/models/forms';

@Component({
  selector: 'ng-file-picker2-page',
  templateUrl: './file-picker2.page.html',
  styleUrls: ['./file-picker2.page.scss'],
})
export class FilePicker2Page implements OnInit{
  form = new UntypedFormGroup({
    c1: new UntypedFormControl(null, [Validators.required]),
  });
  binding;
  submit() {}
  ngOnInit(): void {}

  label: string;
  labelWidth: number;
  hint: string;
  rtl: boolean = false;
  showRequiredStar: boolean = true;
  showImagePreview: boolean = true;
  labelPos: NgLabelPosition = 'fix-top';
  disabled: boolean = false;
  readonly: boolean = false;
  multiple: boolean = true;
  accept: string;
  color: NgColor = 'primary';
  fileLimit: number = 20000;
  resultType: 'base64' | 'file' = 'base64';
  chooseLabel: string = 'انتخاب';
}

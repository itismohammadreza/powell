import {Component} from '@angular/core';
import {UntypedFormControl, FormGroup, Validators} from '@angular/forms';
import {NgFixLabelPosition} from '@ng/models/forms';
import {GlobalConfig} from "@core/global.config";

@Component({
  selector: 'ng-editor-page',
  templateUrl: './editor.page.html',
  styleUrls: ['./editor.page.scss'],
})
export class EditorPage {
  form = new FormGroup({
    c1: new UntypedFormControl(null, [Validators.required]),
  });
  binding;

  label: string = 'label';
  labelWidth: number = 100;
  hint: string = '';
  rtl: boolean = GlobalConfig.rtl;
  labelPos: NgFixLabelPosition = 'fix-side';
  // native properties
  disabled: boolean = false;
  readonly: boolean = false;
}

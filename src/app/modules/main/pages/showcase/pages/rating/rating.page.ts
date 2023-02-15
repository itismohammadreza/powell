import {Component} from '@angular/core';
import {UntypedFormControl, FormGroup, Validators} from '@angular/forms';
import {NgFixLabelPosition} from '@ng/models/forms';
import {GlobalConfig} from "@core/global.config";

@Component({
  selector: 'ng-rating-page',
  templateUrl: './rating.page.html',
  styleUrls: ['./rating.page.scss'],
})
export class RatingPage {
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
  stars: number = 5;
  cancel: boolean = true;
  disabled: boolean = false;
  readonly: boolean = false;
  iconOnClass: string = 'pi pi-star-fill';
  iconOffClass: string = 'pi pi-star';
  iconCancelClass: string = 'pi pi-ban';
}

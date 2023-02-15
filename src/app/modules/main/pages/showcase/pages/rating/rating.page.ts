import {Component, Inject} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {NgFixLabelPosition} from '@ng/models/forms';
import {NgGlobal} from "@ng/ng-global";

@Component({
  selector: 'ng-rating-page',
  templateUrl: './rating.page.html',
  styleUrls: ['./rating.page.scss'],
})
export class RatingPage {
  form = new FormGroup({
    c1: new FormControl(null, [Validators.required]),
  });
  binding;

  label: string = 'label';
  labelWidth: number = 100;
  hint: string = '';
  rtl: boolean = NgGlobal.config.rtl;
  labelPos: NgFixLabelPosition = NgGlobal.config.fixLabelPos;
  // native properties
  stars: number = 5;
  cancel: boolean = true;
  disabled: boolean = false;
  readonly: boolean = false;
  iconOnClass: string = 'pi pi-star-fill';
  iconOffClass: string = 'pi pi-star';
  iconCancelClass: string = 'pi pi-ban';
}

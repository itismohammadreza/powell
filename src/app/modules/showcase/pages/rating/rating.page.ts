import {Component, OnInit} from '@angular/core';
import {UntypedFormControl, UntypedFormGroup, Validators} from '@angular/forms';
import {NgLabelPosition} from '@ng/models/forms';

@Component({
  selector: 'ng-rating-page',
  templateUrl: './rating.page.html',
  styleUrls: ['./rating.page.scss'],
})
export class RatingPage implements OnInit {
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
  labelPos: NgLabelPosition = 'fix-top';
  stars: number = 5;
  cancel: boolean = true;
  disabled: boolean = false;
  readonly: boolean = false;
  iconOnClass: string = 'pi pi-star';
  iconOffClass: string = 'pi pi-star-o';
  iconCancelClass: string = 'pi pi-ban';
  iconOnStyle: any;
  iconOffStyle: any;
  iconCancelStyle: any;
}

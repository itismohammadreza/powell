import {Component, OnInit} from '@angular/core';
import {UntypedFormControl, UntypedFormGroup, Validators} from '@angular/forms';
import {NgLabelPosition} from "@ng/models/forms";

@Component({
  selector: 'ng-switch-page',
  templateUrl: './switch.page.html',
  styleUrls: ['./switch.page.scss'],
})
export class SwitchPage implements OnInit {
  form = new UntypedFormGroup({
    c1: new UntypedFormControl(null, [Validators.required]),
  });
  binding;
  label: string = 'label'
  labelPos: NgLabelPosition = 'fix-side'
  rtl: boolean = false

  submit() {
  }

  ngOnInit(): void {
  }
}

import {Component, Input, OnInit} from '@angular/core';
import {UntypedFormControl, UntypedFormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'ng-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss']
})
export class DynamicFormComponent implements OnInit {
  @Input() config: any[];
  form: UntypedFormGroup = new UntypedFormGroup({});

  ngOnInit(): void {
    for (const configElement of this.config) {
      this.form.addControl(configElement.formControlName, new UntypedFormControl('', [Validators.required]));
    }
  }

  onSubmit() {
  }

}

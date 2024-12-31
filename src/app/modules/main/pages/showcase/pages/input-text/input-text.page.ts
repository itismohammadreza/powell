import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {InputTextComponent, InputTextModule} from "@powell/components/input-text";
import {PreviewBase, PreviewComponent, PreviewOption} from "@modules/main/pages/showcase/components";

@Component({
  selector: 'ng-input-text-page',
  templateUrl: './input-text.page.html',
  styleUrls: ['./input-text.page.scss'],
  imports: [
    InputTextModule,
    ReactiveFormsModule,
    PreviewComponent
  ]
})
export class InputTextPage extends PreviewBase implements OnInit {
  @ViewChild(InputTextComponent, {static: true}) declare cmpRef: InputTextComponent;

  override previewOptions: PreviewOption[] = [
    {field: 'label', value: 'label'},
    {field: 'labelWidth', value: 100},
    {field: 'hint', value: ''},
    {field: 'rtl', value: this.config.rtl},
    {field: 'showRequiredStar', value: this.config.showRequiredStar},
    {field: 'icon', value: ''},
    {field: 'labelPos', value: this.config.labelPos},
    {field: 'iconPos', options: 'iconPositions', value: 'left'},
    {field: 'addon', options: 'addons', value: 'none'},
    {field: 'followConfig', value: this.config.followConfig},
    {field: 'readonly', value: false},
    {field: 'disabled', value: false},
    {field: 'maxlength', value: 100},
    {field: 'placeholder', value: ''},
    {field: 'keyFilter', options: 'keyFilters', value: /.*/g},
    {field: 'showClear', value: true},
    {field: 'variant', options: 'variants', value: this.config.inputStyle},
    {field: 'size', value: this.config.inputSize},
    {field: 'fluid', value: false},
  ]

  override form = new FormGroup({
    c1: new FormControl(null, [Validators.required, Validators.minLength(5), Validators.email, this.akbarValidator]),
  });

  akbarValidator(control: FormControl) {
    return control.value == 'akbar' ? {akbarDenied: true} : null
  }

  getLengthMessage() {
    return `${this.form.get('c1').value} is not valid length`;
  }
}

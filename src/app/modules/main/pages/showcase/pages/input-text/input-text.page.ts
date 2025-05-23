import {Component, ViewChild} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {InputTextComponent, InputTextModule} from "@powell/components/input-text";
import {PreviewBase, PreviewComponent, PreviewOption} from "@modules/main/pages/showcase/components";

@Component({
  selector: 'ng-input-text-page',
  templateUrl: './input-text.page.html',
  imports: [
    InputTextModule,
    ReactiveFormsModule,
    PreviewComponent
  ]
})
export class InputTextPage extends PreviewBase {
  @ViewChild(InputTextComponent) declare cmpRef: InputTextComponent;

  override previewOptions: PreviewOption[] = [
    {field: 'label', value: 'label'},
    {field: 'labelWidth', value: 100},
    {field: 'hint', value: ''},
    {field: 'rtl', value: this.config.rtl},
    {field: 'showRequiredStar', value: this.config.showRequiredStar},
    {field: 'labelPosition', selectOptions: 'labelPositions', value: this.config.labelPosition},
    {field: 'additions', selectOptions: 'additions', value: 'none'},
    {field: 'followConfig', value: this.config.followConfig},
    {field: 'readonly', value: false},
    {field: 'disabled', value: false},
    {field: 'maxlength', value: 100},
    {field: 'placeholder', value: ''},
    {field: 'keyFilter', selectOptions: 'keyFilters', value: /.*/g},
    {field: 'showClear', value: true},
    {field: 'variant', selectOptions: 'variants', value: this.config.inputStyle},
    {field: 'size', selectOptions: 'sizes', value: this.config.inputSize},
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

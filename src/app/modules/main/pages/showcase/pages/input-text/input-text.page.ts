import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {NgAddon, NgIconPosition, NgInputType, NgKeyFilter, NgLabelPosition, NgSize} from '@powell/models';
import {ConfigService, UtilsService} from "@powell/api";

@Component({
  selector: 'ng-input-text-page',
  templateUrl: './input-text.page.html',
  styleUrls: ['./input-text.page.scss'],
})
export class InputTextPage {
  form = new FormGroup({
    c1: new FormControl(null, [Validators.required, Validators.minLength(5), Validators.email, this.akbarValidator]),
  });
  binding;

  label: string = 'label';
  filled: boolean = this.configService.getConfig().filled;
  labelWidth: number = 100;
  hint: string = '';
  rtl: boolean = this.configService.getConfig().rtl;
  showRequiredStar: boolean = this.configService.getConfig().showRequiredStar;
  icon: string = '';
  labelPos: NgLabelPosition = this.configService.getConfig().labelPos;
  iconPos: NgIconPosition = 'left';
  addon: NgAddon;
  inputSize: NgSize = this.configService.getConfig().inputSize;
  disableConfigChangeEffect: boolean = this.configService.getConfig().disableConfigChangeEffect;
  // native properties
  readonly: boolean = false;
  disabled: boolean = false;
  maxlength: number = 100;
  placeholder: string = '';
  type: NgInputType = 'text';
  keyFilter: NgKeyFilter | RegExp = /.*/g;
  showClear: boolean = true;
  form2 = new FormGroup({
    c1: new FormControl(),
    c2: new FormGroup({
      c21: new FormControl(),
      c22: new FormControl(),
      c23: new FormGroup({
        c231: new FormControl(),
        c232: new FormControl()
      })
    })
  })

  constructor(private configService: ConfigService, private utl: UtilsService) {
    setTimeout(() => {
      console.log(this.utl.getDirtyControls(this.form2))
    }, 5000)
  }

  akbarValidator(control: FormControl) {
    return control.value == 'akbar' ? {akbarDenied: true} : null
  }

  getLengthMessage() {
    return `${this.form.get('c1').value} is not valid length`;
  }
}

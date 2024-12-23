import {Component, inject} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {NgColorFormat, NgIconPosition, NgInputVariant, NgLabelPosition, NgSize} from '@powell/models';
import {ConfigService} from "@powell/api";
import {ColorPickerModule} from "@powell/components/color-picker";
import {ExtrasModule} from "@modules/main/pages/showcase/extras.module";
import {
  PreviewOptionsComponent
} from "@modules/main/pages/showcase/components/preview-options/preview-options.component";

@Component({
  selector: 'ng-color-picker-page',
  templateUrl: './color-picker.page.html',
  styleUrls: ['./color-picker.page.scss'],
  imports: [
    ColorPickerModule,
    ReactiveFormsModule,
    ExtrasModule,
    PreviewOptionsComponent
  ]
})
export class ColorPickerPage {
  private configService = inject(ConfigService);

  form = new FormGroup({
    c1: new FormControl(null, [Validators.required]),
  });
  binding;

  label: string = 'label';
  variant: NgInputVariant = this.configService.get().inputStyle;
  labelWidth: number = 100;
  hint: string = '';
  rtl: boolean = this.configService.get().rtl;
  showRequiredStar: boolean = this.configService.get().showRequiredStar;
  icon: string = '';
  labelPos: NgLabelPosition = this.configService.get().labelPos;
  iconPos: NgIconPosition = 'left';
  inputSize: NgSize = this.configService.get().inputSize;
  placeholder: string = '';
  readonly: boolean = false;
  disabled: boolean = false;
  followConfig: boolean = this.configService.get().followConfig;
  // native properties
  maxlength: number = 7;
  inline: boolean = false;
  format: NgColorFormat = 'hex';
}

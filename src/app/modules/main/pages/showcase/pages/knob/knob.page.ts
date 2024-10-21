import {Component, inject} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {NgFixLabelPosition} from '@powell/models';
import {ConfigService} from "@powell/api";
import {KnobModule} from "@powell/components/knob";
import {ExtrasModule} from "@modules/main/pages/showcase/extras.module";
import {
  PreviewOptionsComponent
} from "@modules/main/pages/showcase/components/preview-options/preview-options.component";

@Component({
  selector: 'ng-knob-page',
  templateUrl: './knob.page.html',
  styleUrls: ['./knob.page.scss'],
  standalone: true,
  imports: [
    KnobModule,
    ReactiveFormsModule,
    ExtrasModule,
    PreviewOptionsComponent
  ]
})
export class KnobPage {
  private configService = inject(ConfigService);

  form = new FormGroup({
    c1: new FormControl(null, [Validators.required]),
  });
  binding;

  label: string = 'label';
  labelWidth: number = 100;
  hint: string = '';
  rtl: boolean = this.configService.get().rtl;
  showRequiredStar: boolean = this.configService.get().showRequiredStar;
  labelPos: NgFixLabelPosition = this.configService.get().fixLabelPos;
  followConfig: boolean = this.configService.get().followConfig;
  // native properties
  size: number = 100;
  disabled: boolean = false;
  readonly: boolean = false;
  step: number = 1;
  min: number = 0;
  max: number = 100;
  valueColor: string = "var(--primary-color, Black)";
  rangeColor: string = "var(--surface-border, LightGray)";
  textColor: string = "var(--text-color-secondary, Black)";
  strokeWidth: number = 14;
  showValue: boolean = true;
  valueTemplate: string = '{value}';
}

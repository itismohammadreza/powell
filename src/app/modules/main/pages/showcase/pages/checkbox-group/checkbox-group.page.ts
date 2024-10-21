import {Component, inject} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {NgFixLabelPosition, NgInputVariant, NgOrientation} from '@powell/models';
import {ConfigService} from "@powell/api";
import {CheckboxGroupModule} from "@powell/components/checkbox-group";
import {ExtrasModule} from "@modules/main/pages/showcase/extras.module";
import {
  PreviewOptionsComponent
} from "@modules/main/pages/showcase/components/preview-options/preview-options.component";

@Component({
  selector: 'ng-checkbox-group-page',
  templateUrl: './checkbox-group.page.html',
  styleUrls: ['./checkbox-group.page.scss'],
  standalone: true,
  imports: [
    CheckboxGroupModule,
    ReactiveFormsModule,
    ExtrasModule,
    PreviewOptionsComponent
  ]
})
export class CheckboxGroupPage {
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
  labelPos: NgFixLabelPosition = this.configService.get().fixLabelPos;
  followConfig: boolean = this.configService.get().followConfig;
  // native properties
  orientation: NgOrientation = 'vertical';
  disabled: boolean = false;
  readonly: boolean = false;

  options: any[] = [
    {label: 'Australia', value: 'AU'},
    {label: 'Brazil', value: 'BR'},
    {label: 'China', value: 'CN'},
    {label: 'Egypt', value: 'EG'},
    {label: 'France', value: 'FR'},
    {label: 'Germany', value: 'DE'},
    {label: 'India', value: 'IN'},
    {label: 'Japan', value: 'JP'},
    {label: 'Spain', value: 'ES'},
    {label: 'United States', value: 'US'}
  ];
}

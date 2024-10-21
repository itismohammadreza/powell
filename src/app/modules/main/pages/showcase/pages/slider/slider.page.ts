import {Component, inject} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {NgFixLabelPosition, NgOrientation} from '@powell/models';
import {ConfigService} from "@powell/api";
import {SliderModule} from "@powell/components/slider";
import {ExtrasModule} from "@modules/main/pages/showcase/extras.module";
import {
  PreviewOptionsComponent
} from "@modules/main/pages/showcase/components/preview-options/preview-options.component";

@Component({
  selector: 'ng-slider-page',
  templateUrl: './slider.page.html',
  styleUrls: ['./slider.page.scss'],
  standalone: true,
  imports: [
    SliderModule,
    ReactiveFormsModule,
    ExtrasModule,
    PreviewOptionsComponent
  ]
})
export class SliderPage {
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
  animate: boolean = true;
  disabled: boolean = false;
  min: number = 0;
  max: number = 100;
  orientation: NgOrientation = 'horizontal';
  step: number = 1;
  range: boolean = false;
}

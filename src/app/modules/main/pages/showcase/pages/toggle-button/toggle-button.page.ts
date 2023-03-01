import {Component, Inject} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {NgFixLabelPosition} from "@ng/models/forms";
import {NgIconPosition} from "@ng/models/offset";
import {ConfigService} from "@ng/services";

@Component({
  selector: 'ng-toggle-button-page',
  templateUrl: './toggle-button.page.html',
  styleUrls: ['./toggle-button.page.scss'],
})
export class ToggleButtonPage {
  form = new FormGroup({
    c1: new FormControl(null, [Validators.required]),
  });
  binding;

  label: string = 'label';
  labelWidth: number = 100;
  hint: string = '';
  rtl: boolean = this.configService.getConfig().rtl;
  showRequiredStar: boolean = this.configService.getConfig().showRequiredStar;
  labelPos: NgFixLabelPosition = this.configService.getConfig().fixLabelPos;
  disableConfigChangeEffect: boolean;
  // native properties
  onLabel: string = '';
  offLabel: string = '';
  onIcon: string = 'pi pi-check';
  offIcon: string = 'pi pi-times';
  iconPos: NgIconPosition = 'left';
  disabled: boolean = false;

  constructor(private configService: ConfigService) {
  }
}

import {Component, inject} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {NgFixLabelPosition, NgIconPosition} from "@powell/models";
import {ConfigService} from "@powell/api";

@Component({
  selector: 'ng-toggle-button-page',
  templateUrl: './toggle-button.page.html',
  styleUrls: ['./toggle-button.page.scss'],
})
export class ToggleButtonPage {
  private configService = inject(ConfigService);

  form = new FormGroup({
    c1: new FormControl(null, [Validators.requiredTrue]),
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
  onLabel: string = '';
  offLabel: string = '';
  onIcon: string = 'pi pi-check';
  offIcon: string = 'pi pi-times';
  iconPos: NgIconPosition = 'left';
  disabled: boolean = false;
}

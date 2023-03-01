import {Component, Inject} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {NgColor} from '@ng/models/color';
import {NgFixLabelPosition} from '@ng/models/forms';
import {ConfigService} from "@ng/services";

@Component({
  selector: 'ng-file-picker2-page',
  templateUrl: './file-picker2.page.html',
  styleUrls: ['./file-picker2.page.scss'],
})
export class FilePicker2Page {
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
  disabled: boolean = false;
  readonly: boolean = false;
  multiple: boolean = true;
  accept: string = '';
  color: NgColor = 'primary';
  fileLimit: number = 20000;
  chooseLabel: string = 'انتخاب';

  constructor(private configService: ConfigService) {
  }
}

import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {NgFixLabelPosition} from "@ng/models";
import {ConfigService} from "@ng/services";

@Component({
  selector: 'ng-iran-map-page',
  templateUrl: './iran-map.page.html',
  styleUrls: ['./iran-map.page.scss']
})
export class IranMapPage {
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
  disabled: boolean = false;
  disableConfigChangeEffect: boolean = this.configService.getConfig().disableConfigChangeEffect;
  selectionLimit: number = 31;

  constructor(private configService: ConfigService) {
  }
}

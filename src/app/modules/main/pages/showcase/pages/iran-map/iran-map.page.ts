import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {NgFixLabelPosition} from "@powell/models";
import {ConfigService} from "@powell/api";

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
  multiple: boolean = false;
  async: boolean = false;

  constructor(private configService: ConfigService) {
  }

  onChangeAsync({loadingCallback}) {
    setTimeout(() => {
      loadingCallback()
    }, 3000)
  }
}

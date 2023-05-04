import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {NgAddon, NgFixLabelPosition} from "@powell/models";
import {ConfigService} from "@powell/api";

@Component({
  selector: 'ng-map-page',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage {
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
  addon: NgAddon;
  disabled: boolean = false;
  multiple: boolean = false;
  clearMarkerOnClick: boolean = true;
  showClear: boolean = true;
  disableConfigChangeEffect: boolean = this.configService.getConfig().disableConfigChangeEffect;
  // native properties
  readonly: boolean = false;

  constructor(private configService: ConfigService) {
  }
}

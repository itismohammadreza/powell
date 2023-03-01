import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {NgFixLabelPosition} from "@ng/models/forms";
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
  labelPos: NgFixLabelPosition = this.configService.getConfig().fixLabelPos;
  disabled: boolean = false;

  constructor(private configService: ConfigService) {
  }
}

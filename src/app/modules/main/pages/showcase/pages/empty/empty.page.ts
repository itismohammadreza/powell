import {Component} from '@angular/core';
import {NgEmptyIcon} from "@ng/models";
import {ConfigService} from "@ng/services";

@Component({
  selector: 'ng-empty-page',
  templateUrl: './empty.page.html',
  styleUrls: ['./empty.page.scss']
})
export class EmptyPage {
  constructor(private configService: ConfigService) {
  }

  imageType: NgEmptyIcon = 'box1';
  icon: string = '';
  text: string = '';
  rtl: boolean = this.configService.getConfig().rtl;
  disableConfigChangeEffect: boolean = this.configService.getConfig().disableConfigChangeEffect;
}

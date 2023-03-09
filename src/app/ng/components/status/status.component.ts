import {Component, Input} from '@angular/core';
import {NgStatus} from "@ng/models";
import {ConfigService} from "@ng/services";

@Component({
  selector: 'ng-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss']
})
export class StatusComponent {
  @Input() status: NgStatus = "success";
  @Input() icon: string;
  @Input() imageSrc: string;
  @Input() text: string;
  @Input() subText: string;
  @Input() rtl: boolean = this.configService.getConfig().rtl;
  @Input() disableConfigChangeEffect: boolean = this.configService.getConfig().disableConfigChangeEffect;

  constructor(private configService: ConfigService) {
  }
}

import {Component, Inject, Input} from '@angular/core';
import {NgStatus} from "@ng/models/offset";
import {NgConfig} from "@ng/models/config";

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
  @Input() rtl: boolean = this.ngConfig.rtl;

  constructor(@Inject('NG_CONFIG') private ngConfig: NgConfig) {
  }
}

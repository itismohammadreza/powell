import {Component, Input} from '@angular/core';
import {NgStatus} from "@ng/models/offset";
import {NgGlobal} from "@ng/ng-global";

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
  @Input() rtl: boolean = NgGlobal.config.rtl;
}

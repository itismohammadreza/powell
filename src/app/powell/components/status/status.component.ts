import {Component, Input} from '@angular/core';
import {NgStatusIcon} from "@powell/models";

@Component({
  selector: 'ng-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss'],
})
export class StatusComponent {
  @Input() status: NgStatusIcon = "success";
  @Input() icon: string;
  @Input() imageSrc: string;
  @Input() text: string;
  @Input() subText: string;
  @Input() rtl: boolean;
  @Input() disableConfigChangeEffect: boolean;
}

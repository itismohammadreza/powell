import {Component, Input} from '@angular/core';
import {NgStatus} from "@ng/models";
import {ConfigHandler} from "@ng/api";

@Component({
  selector: 'ng-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss']
})
export class StatusComponent extends ConfigHandler {
  @Input() status: NgStatus = "success";
  @Input() icon: string;
  @Input() imageSrc: string;
  @Input() text: string;
  @Input() subText: string;
  @Input() rtl: boolean;
  @Input() disableConfigChangeEffect: boolean;

  constructor() {
    super();
  }
}

import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {NgStatus} from "@powell/models";
import {ConfigHandler} from "@powell/api";

@Component({
  selector: 'ng-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
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

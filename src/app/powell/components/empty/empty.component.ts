import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {NgEmptyIcon} from "@powell/models";
import {ConfigHandler} from "@powell/api";

@Component({
  selector: 'ng-empty',
  templateUrl: './empty.component.html',
  styleUrls: ['./empty.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmptyComponent extends ConfigHandler {
  @Input() imageType: NgEmptyIcon = 'box2';
  @Input() icon: string;
  @Input() imageSrc: string;
  @Input() text: string;
  @Input() rtl: boolean;
  @Input() disableConfigChangeEffect: boolean;

  constructor() {
    super();
  }
}

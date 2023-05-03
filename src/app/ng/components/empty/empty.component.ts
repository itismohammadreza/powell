import {Component, Input} from '@angular/core';
import {NgEmptyIcon} from "@ng/models";
import {ConfigHandler} from "@ng/api";

@Component({
  selector: 'ng-empty',
  templateUrl: './empty.component.html',
  styleUrls: ['./empty.component.scss']
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

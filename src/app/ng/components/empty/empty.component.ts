import {Component, Input} from '@angular/core';
import {GlobalConfig} from '@core/global.config';
import {NgEmptyIcon} from "@ng/models/offset";

@Component({
  selector: 'ng-empty',
  templateUrl: './empty.component.html',
  styleUrls: ['./empty.component.scss'],
})
export class EmptyComponent {
  @Input() imageType: NgEmptyIcon = 'box2';
  @Input() icon: string;
  @Input() imageSrc: string;
  @Input() text: string;
  @Input() rtl: boolean = GlobalConfig.rtl;
}

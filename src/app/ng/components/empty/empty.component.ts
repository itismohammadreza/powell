import {Component, Input} from '@angular/core';
import {NgEmptyIcon} from "@ng/models/offset";
import {NgConfig} from "@ng/models/config";

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
  @Input() rtl: boolean = this.ngConfig.rtl;
}

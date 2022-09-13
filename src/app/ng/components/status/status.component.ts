import {Component, Input} from '@angular/core';
import {NgStatus} from "@ng/models/offset";

@Component({
  selector: 'ng-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss']
})
export class StatusComponent {
  @Input() status: NgStatus = "success";
  @Input() icon: string;
  @Input() imageSrc: string;
  @Input() title: string;
  @Input() subtitle: string;
}
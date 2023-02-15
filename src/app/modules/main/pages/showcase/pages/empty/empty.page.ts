import {Component} from '@angular/core';
import {NgEmptyIcon} from "@ng/models/offset";

@Component({
  selector: 'ng-empty-page',
  templateUrl: './empty.page.html',
  styleUrls: ['./empty.page.scss']
})
export class EmptyPage {
  imageType: NgEmptyIcon = 'box1';
  icon: string = '';
  text: string = '';
}

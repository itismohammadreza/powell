import {Component} from '@angular/core';

@Component({
  selector: 'ng-not-found-page',
  templateUrl: './not-found.page.html',
  styleUrls: ['./not-found.page.scss']
})
export class NotFoundPage {
  constructor(@Inject('NG_CONFIG') private ngConfig: NgConfig) {
  }
}

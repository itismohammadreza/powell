import {Component} from '@angular/core';

@Component({
  selector: 'ng-auth-page',
  styleUrls: ['auth.page.scss'],
  templateUrl: './auth.page.html',
})
export class AuthPage {
  constructor(@Inject('NG_CONFIG') private ngConfig: NgConfig) {
  }
}

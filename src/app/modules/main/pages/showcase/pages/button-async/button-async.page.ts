import {Component} from '@angular/core';
import {UserService} from '@core/http';
import {NgButtonAppearance} from "@ng/models/button";
import {NgIconPosition, NgSize} from "@ng/models/offset";
import {NgColor} from "@ng/models/color";

@Component({
  selector: 'ng-button-async-page',
  templateUrl: './button-async.page.html',
  styleUrls: ['./button-async.page.scss']
})
export class ButtonAsyncPage {
  constructor(private userService: UserService) {
  }

  label: string = 'Sample';
  icon: string = 'pi pi-user';
  full: boolean = false;
  badge: string = '2';
  rounded: boolean = false;
  raised: boolean = false;
  appearance: NgButtonAppearance = 'basic';
  disabled: boolean = false;
  iconPos: NgIconPosition = 'left';
  color: NgColor = 'primary';
  badgeColor: NgColor = 'secondary';
  size: NgSize = 'md';
  newLabel: string = 'New Label';
  newColor: NgColor = 'secondary';

  async onClick(callback: any) {
    await this.userService.get().toPromise();
    callback();
  }
}

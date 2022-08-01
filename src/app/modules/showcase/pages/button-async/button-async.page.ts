import {Component, OnInit} from '@angular/core';
import {UserService} from '@core/http';
import {NgButtonAppearance, NgButtonType} from "@ng/models/button";
import {NgPosition, NgSize} from "@ng/models/offset";
import {NgColor} from "@ng/models/color";

@Component({
  selector: 'ng-button-async-page',
  templateUrl: './button-async.page.html',
  styleUrls: ['./button-async.page.scss']
})
export class ButtonAsyncPage implements OnInit {

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
  iconPos: NgPosition = 'left';
  type: NgButtonType = 'button';
  color: NgColor = 'primary';
  badgeColor: NgColor = 'secondary';
  size: NgSize = 'md';
  newLabel: string;
  newColor: NgColor;

  ngOnInit(): void {
  }

  async onClick(callback: any) {
    await this.userService.get().toPromise();
    callback();
  }
}

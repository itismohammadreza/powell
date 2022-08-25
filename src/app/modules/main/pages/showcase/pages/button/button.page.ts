import {Component} from '@angular/core';
import {NgButtonAppearance} from '@ng/models/button';
import {NgPosition, NgSize} from '@ng/models/offset';
import {NgColor} from '@ng/models/color';

@Component({
  selector: 'ng-button-page',
  templateUrl: './button.page.html',
  styleUrls: ['./button.page.scss']
})
export class ButtonPage {
  label: string = 'Sample';
  icon: string = 'pi pi-user';
  full: boolean = false;
  badge: string = '2';
  rounded: boolean = false;
  raised: boolean = false;
  appearance: NgButtonAppearance = 'basic';
  disabled: boolean = false;
  iconPos: NgPosition = 'left';
  color: NgColor = 'primary';
  badgeColor: NgColor = 'secondary';
  size: NgSize = 'md';
}

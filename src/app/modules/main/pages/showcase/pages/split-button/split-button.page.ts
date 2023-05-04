import {Component} from '@angular/core';
import {NgButtonAppearance, NgColor, NgIconPosition, NgSize} from "@powell/models";
import {ConfigService} from "@powell/api";
import {PrimeMenuItem} from "@powell/primeng/api";

@Component({
  selector: 'ng-split-button-page',
  templateUrl: './split-button.page.html',
  styleUrls: ['./split-button.page.scss'],
})
export class SplitButtonPage {
  appearance: NgButtonAppearance = 'outlined';
  rounded: boolean = false;
  raised: boolean = false;
  color: NgColor = 'primary';
  full: boolean = false;
  size: NgSize = 'md';
  rtl: boolean = this.configService.getConfig().rtl;
  disableConfigChangeEffect: boolean = this.configService.getConfig().disableConfigChangeEffect;
  // native properties
  label: string = 'Label';
  icon: string = '';
  iconPos: NgIconPosition = 'left';
  disabled: boolean = false;

  items: PrimeMenuItem[] = [
    {label: 'Update', icon: 'pi pi-refresh'},
    {label: 'Delete', icon: 'pi pi-times'},
    {label: 'Angular.io', icon: 'pi pi-info', url: 'http://angular.io'},
    {separator: true},
    {label: 'Setup', icon: 'pi pi-cog', routerLink: ['/setup']}
  ];

  constructor(private configService: ConfigService) {
  }
}

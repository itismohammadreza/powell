import {Component} from '@angular/core';
import {MenuItem} from "primeng/api";
import {NgButtonAppearance} from "@ng/models/button";
import {NgColor} from "@ng/models/color";
import {NgPosition, NgSize} from "@ng/models/offset";

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
  rtl: boolean = false;
  label: string = 'Label';
  icon: string = '';
  iconPos: NgPosition = 'left';
  disabled: boolean = false;

  items: MenuItem[] = [
    {label: 'Update', icon: 'pi pi-refresh'},
    {label: 'Delete', icon: 'pi pi-times'},
    {label: 'Angular.io', icon: 'pi pi-info', url: 'http://angular.io'},
    {separator: true},
    {label: 'Setup', icon: 'pi pi-cog', routerLink: ['/setup']}
  ];
}
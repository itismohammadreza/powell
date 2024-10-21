import {Component} from '@angular/core';
import {NgButtonAppearance, NgColor, NgIconPosition, NgSize} from '@powell/models';
import {ButtonModule} from "@powell/components/button";
import {ExtrasModule} from "@modules/main/pages/showcase/extras.module";
import {
  PreviewOptionsComponent
} from "@modules/main/pages/showcase/components/preview-options/preview-options.component";

@Component({
  selector: 'ng-button-page',
  templateUrl: './button.page.html',
  styleUrls: ['./button.page.scss'],
  standalone: true,
  imports: [
    ButtonModule,
    ExtrasModule,
    PreviewOptionsComponent
  ]
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
  iconPos: NgIconPosition = 'left';
  color: NgColor = 'primary';
  badgeColor: NgColor = 'secondary';
  size: NgSize = 'md';
  async: boolean = false;
  newLabel: string = 'New Label';
  newColor: NgColor = 'secondary';

  onClickAsync({loadingCallback}) {
    setTimeout(() => {
      loadingCallback(true)
    }, 3000)
  }
}

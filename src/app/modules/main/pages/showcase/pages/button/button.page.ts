import {Component} from '@angular/core';
import {NgButtonAppearance, NgIconPosition, NgSeverity, NgSize} from '@powell/models';
import {ButtonModule} from "@powell/components/button";
import {ExtrasModule} from "@modules/main/pages/showcase/extras.module";
import {
  PreviewOptionsComponent
} from "@modules/main/pages/showcase/components/preview-options/preview-options.component";

@Component({
  selector: 'ng-button-page',
  templateUrl: './button.page.html',
  styleUrls: ['./button.page.scss'],
  imports: [
    ButtonModule,
    ExtrasModule,
    PreviewOptionsComponent
  ]
})
export class ButtonPage {
  appearance: NgButtonAppearance = 'basic';
  full: boolean = false;
  badgeSeverity: NgSeverity = 'secondary';
  async: boolean = false;
  newLabel: string = 'New Label';
  newSeverity: NgSeverity = 'secondary';
  iconPos: NgIconPosition = 'left';
  icon: string = 'pi pi-user';
  badge: string = '2';
  label: string = 'Sample';
  disabled: boolean = false;
  raised: boolean = false;
  rounded: boolean = false;
  severity: NgSeverity = 'primary';
  size: NgSize = 'small';

  onClickAsync({loadingCallback}) {
    setTimeout(() => {
      loadingCallback(true)
    }, 3000)
  }
}

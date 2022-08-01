import {Component, Input} from '@angular/core';

@Component({
  selector: 'ng-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.scss'],
})
export class LogoComponent {
  @Input() width: string = '100px';
}

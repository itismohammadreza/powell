import {Component, Input} from '@angular/core';
import {RouterModule} from "@angular/router";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'ng-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.scss'],
  imports: [RouterModule, CommonModule],
  host: {
    class: 'inline-block',
  }
})
export class LogoComponent {
  @Input() width: string = '100px';
  @Input() type: 'light-vertical' | 'light-horizontal' | 'dark-vertical' | 'dark-horizontal' | 'logo-only' = 'dark-horizontal';
  @Input() src: string = null;
  @Input() link: string[] = ['/'];
  @Input() disableNavigation: boolean = false;
}

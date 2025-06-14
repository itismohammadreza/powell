import {Component, Input} from '@angular/core';
import {RouterModule} from "@angular/router";
import {NgClass} from "@angular/common";

@Component({
  selector: 'logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.scss'],
  imports: [RouterModule, NgClass],
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

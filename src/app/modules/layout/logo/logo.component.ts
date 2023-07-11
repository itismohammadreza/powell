import {Component, Input} from '@angular/core';
import {RouterModule} from "@angular/router";

@Component({
  selector: 'ng-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.scss'],
  standalone: true,
  imports: [RouterModule]
})
export class LogoComponent {
  @Input() width: string = '100px';
  @Input() link: string[] = ['/'];
  @Input() disableNavigation: boolean = false;
}

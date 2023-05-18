import {Component} from '@angular/core';
import {StatusModule} from "@powell/components/status";

@Component({
  selector: 'ng-not-found-page',
  templateUrl: './not-found.page.html',
  styleUrls: ['./not-found.page.scss'],
  standalone: true,
  imports: [StatusModule]
})
export class NotFoundPage {
}

import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'ng-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss'],
})
export class NotFoundComponent implements OnInit {
  message: string = 'صفحه ای که به دنبال آن بودید یافت نشد';

  ngOnInit(): void {
  }
}

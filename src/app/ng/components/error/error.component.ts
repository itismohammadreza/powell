import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'ng-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit {
  message: string = 'خطایی رخ داده است';

  ngOnInit(): void {
  }

}

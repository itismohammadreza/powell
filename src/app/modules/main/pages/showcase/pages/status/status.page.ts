import {Component, OnInit} from '@angular/core';
import {NgStatus} from "@ng/models/offset";

@Component({
  selector: 'ng-status-page',
  templateUrl: './status.page.html',
  styleUrls: ['./status.page.scss']
})
export class StatusPage {
  status: NgStatus = 'info';
  icon: string = '';
  title: string = '';
  subtitle: string = '';
}

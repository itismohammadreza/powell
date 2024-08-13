import {Component, Input, OnInit} from '@angular/core';
import {NgEmptyIcon} from "@powell/models";
import {ConfigService} from "@powell/api";

@Component({
  selector: 'ng-empty',
  templateUrl: './empty.component.html',
  styleUrls: ['./empty.component.scss'],
})
export class EmptyComponent implements OnInit {
  @Input() imageType: NgEmptyIcon = 'box2';
  @Input() icon: string;
  @Input() imageSrc: string;
  @Input() text: string;
  @Input() rtl: boolean;
  @Input() disableConfigChangeEffect: boolean;

  constructor(private configService: ConfigService) {
  }

  ngOnInit() {
    this.configService.applyConfigToComponent(this);
  }
}

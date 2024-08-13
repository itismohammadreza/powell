import {Component, inject, Input, OnInit} from '@angular/core';
import {NgEmptyIcon} from "@powell/models";
import {ConfigService} from "@powell/api";

@Component({
  selector: 'ng-empty',
  templateUrl: './empty.component.html',
  styleUrls: ['./empty.component.scss'],
})
export class EmptyComponent implements OnInit {
  private configService = inject(ConfigService);

  @Input() imageType: NgEmptyIcon = 'box2';
  @Input() icon: string;
  @Input() imageSrc: string;
  @Input() text: string;
  @Input() rtl: boolean;
  @Input() followConfig: boolean;

  ngOnInit() {
    this.configService.applyConfigToComponent(this);
  }
}

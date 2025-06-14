import {Component, inject, Input, OnInit} from '@angular/core';
import {EmptyIcon} from "@powell/models";
import {ConfigService} from "@powell/api";

@Component({
  selector: 'pw-empty',
  templateUrl: './empty.component.html',
  standalone: false
})
export class EmptyComponent implements OnInit {
  private configService = inject(ConfigService);

  @Input() imageType: EmptyIcon = 'box2';
  @Input() icon: string;
  @Input() imageSrc: string;
  @Input() text: string;
  @Input() rtl: boolean;
  @Input() followConfig: boolean;

  ngOnInit() {
    this.configService.configureComponent(this, true);
  }
}

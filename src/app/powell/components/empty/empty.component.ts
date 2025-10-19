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
  @Input() icon: Optional<string>;
  @Input() imageSrc: Optional<string>;
  @Input() text: Optional<string>;
  @Input() rtl: Optional<boolean>;
  @Input() followConfig: Optional<boolean>;

  ngOnInit() {
    this.configService.configureComponent(this, true);
  }
}

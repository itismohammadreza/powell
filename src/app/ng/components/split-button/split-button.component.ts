import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgButtonAppearance} from '@ng/models/button';
import {NgColor} from '@ng/models/color';
import {NgPosition, NgSize} from '@ng/models/offset';
import {MenuItem} from 'primeng/api';

@Component({
  selector: 'ng-split-button',
  templateUrl: './split-button.component.html',
  styleUrls: ['./split-button.component.scss'],
})
export class SplitButtonComponent implements OnInit {
  @Input() label: string;
  @Input() items: MenuItem[];
  @Input() icon: string;
  @Input() iconPos: NgPosition = 'left';
  @Input() appendTo: any;
  @Input() appearance: NgButtonAppearance = 'outlined';
  @Input() disabled: boolean;
  @Input() rtl: boolean;
  @Input() rounded: boolean;
  @Input() raised: boolean;
  @Input() badge: string | number = 2;
  @Input() badgeColor: NgColor = 'primary';
  @Input() color: NgColor = 'primary';
  @Input() size: NgSize = 'md';
  @Output() onClick = new EventEmitter();
  @Output() onDropdownClick = new EventEmitter();

  ngOnInit(): void {}

  emitter(name: string, event: any) {
    (this[name] as EventEmitter<any>).emit(event);
  }

}

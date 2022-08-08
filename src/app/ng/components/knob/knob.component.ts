import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgError, NgLabelPosition} from '@ng/models/forms';

@Component({
  selector: 'ng-knob',
  templateUrl: './knob.component.html',
  styleUrls: ['./knob.component.scss']
})
export class KnobComponent implements OnInit {
  @Input() value: any;
  @Input() label: string;
  @Input() labelWidth: number;
  @Input() hint: string;
  @Input() rtl: boolean;
  @Input() showRequiredStar: boolean = true;
  @Input() labelPos: NgLabelPosition = 'fix-top';
  @Input() errors: NgError;
  // native properties
  @Input() size: number = 100;
  @Input() disabled: boolean;
  @Input() readonly: boolean;
  @Input() step: number;
  @Input() min: number = 0;
  @Input() max: number = 100;
  @Input() valueColor: string;
  @Input() rangeColor: number;
  @Input() textColor: number;
  @Input() strokeWidth: number = 14;
  @Input() showValue: boolean = true;
  @Input() valueTemplate: string = '{value}';
  @Input() style: any;
  @Input() styleClass: string;
  @Output() onChange = new EventEmitter();

  ngOnInit(): void {
  }

}

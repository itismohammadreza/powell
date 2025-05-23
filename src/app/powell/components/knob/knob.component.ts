import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  forwardRef,
  inject,
  Injector,
  Input,
  OnInit,
  Output
} from '@angular/core';
import {
  AbstractControl,
  ControlContainer,
  ControlValueAccessor,
  FormControlName,
  FormGroup,
  FormGroupDirective,
  NG_VALUE_ACCESSOR,
  NgControl
} from "@angular/forms";
import {takeUntil} from "rxjs";
import {NgCssObject, NgFixLabelPosition, NgValidation} from '@powell/models';
import {DestroyService} from "@core/utils";
import {$dt, $uuid} from "@powell/primeng";
import {ConfigService} from "@powell/api";

@Component({
  selector: 'ng-knob',
  templateUrl: './knob.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => KnobComponent),
      multi: true
    },
    DestroyService
  ],
  standalone: false
})
export class KnobComponent implements OnInit, ControlValueAccessor {
  private cd = inject(ChangeDetectorRef);
  private injector = inject(Injector);
  private configService = inject(ConfigService);
  private destroy$ = inject(DestroyService);

  @Input() value: any;
  @Input() label: string;
  @Input() labelWidth: number;
  @Input() hint: string;
  @Input() rtl: boolean;
  @Input() showRequiredStar: boolean;
  @Input() labelPosition: NgFixLabelPosition;
  @Input() validation: NgValidation;
  @Input() followConfig: boolean;
  @Input() id: string = $uuid();
  // native properties
  @Input() styleClass: string;
  @Input() style: NgCssObject;
  @Input() ariaLabel: string;
  @Input() ariaLabelledBy: string;
  @Input() tabindex: number;
  @Input() valueColor: string = $dt('knob.value.background').variable;
  @Input() rangeColor: string = $dt('knob.range.background').variable;
  @Input() textColor: string = $dt('knob.text.color').variable;
  @Input() valueTemplate: string = '{value}';
  @Input() name: string;
  @Input() size: number = 100;
  @Input() step: number = 1;
  @Input() min: number = 0;
  @Input() max: number = 100;
  @Input() strokeWidth: number = 14;
  @Input() disabled: boolean;
  @Input() showValue: boolean = true;
  @Input() readonly: boolean = false;
  @Output() onChange = new EventEmitter<number>();

  ngControl: NgControl;
  onModelChange: Function = () => {
  };
  onModelTouched: Function = () => {
  };

  ngOnInit() {
    let parentForm: FormGroup;
    let rootForm: FormGroupDirective;
    let currentControl: AbstractControl;
    const controlContainer = this.injector.get(
      ControlContainer,
      null,
      {optional: true, host: true, skipSelf: true}
    ) as FormGroupDirective;
    this.ngControl = this.injector.get(NgControl, null);
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
      currentControl = this.ngControl.control;
      if (controlContainer) {
        parentForm = controlContainer.control;
        rootForm = controlContainer.formDirective as FormGroupDirective;
        if (this.ngControl instanceof FormControlName) {
          currentControl = parentForm.get(this.ngControl.name.toString());
        }
        rootForm.ngSubmit.pipe(takeUntil(this.destroy$)).subscribe(() => {
          if (!this.disabled) {
            currentControl.markAsTouched();
          }
        });
      }
    }
    this.configService.configureComponent(this, true);
  }

  _onChange(event: number) {
    this.onChange.emit(event);
    this.onModelChange(event);
  }

  writeValue(value: any) {
    this.value = value;
    this.cd.markForCheck();
  }

  registerOnChange(fn) {
    this.onModelChange = fn;
  }

  registerOnTouched(fn) {
    this.onModelTouched = fn;
  }

  setDisabledState(val: boolean) {
    this.disabled = val;
    this.cd.markForCheck();
  }
}

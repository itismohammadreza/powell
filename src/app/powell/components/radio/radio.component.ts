import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  forwardRef,
  inject,
  Injector,
  Input,
  OnInit,
  Output,
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
} from '@angular/forms';
import {takeUntil} from "rxjs";
import {CssObject, FixLabelPosition, InputVariant, Orientation, Size, Validation} from '@powell/models';
import {DestroyService} from "@powell/utils";
import {$RadioButtonClickEvent, $uuid} from "@powell/primeng";
import {ConfigService} from "@powell/api";

@Component({
  selector: 'pw-radio',
  templateUrl: './radio.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RadioComponent),
      multi: true
    },
    DestroyService
  ],
  standalone: false
})
export class RadioComponent implements OnInit, ControlValueAccessor {
  private cd = inject(ChangeDetectorRef);
  private injector = inject(Injector);
  private configService = inject(ConfigService);
  private destroy$ = inject(DestroyService);

  @Input() value: Optional<SafeAny>;
  @Input() label: Optional<string>;
  @Input() labelWidth: Optional<number>;
  @Input() hint: Optional<string>;
  @Input() rtl: boolean = false;
  @Input() showRequiredStar: boolean = false;
  @Input() labelPosition: Optional<FixLabelPosition>;
  @Input() validation: Optional<Validation>;
  @Input() followConfig: boolean = false;
  @Input() orientation: Orientation = 'vertical';
  @Input() options: Optional<SafeAny[]>;
  @Input() optionLabel: string = 'label';
  @Input() optionValue: string = 'value';
  @Input() optionDisabled: string = 'disabled';
  // native properties
  @Input() name: string = $uuid();

  @Input() set disabled(disabled: boolean) {
    this._disabled = disabled;
    this.options?.forEach(option => {
      option[this.optionDisabled] = disabled
    })
  };

  get disabled() {
    return this._disabled;
  }

  @Input() variant: Optional<InputVariant>;
  @Input() size: Optional<Size>;
  @Input() tabindex: Optional<number>;
  @Input() id: string = $uuid();
  @Input() ariaLabelledBy: Optional<string>;
  @Input() ariaLabel: Optional<string>;
  @Input() autofocus: boolean = false;
  @Input() binary: boolean = false;
  @Output() onChange = new EventEmitter<$RadioButtonClickEvent>();
  @Output() onFocus = new EventEmitter<Event>();
  @Output() onBlur = new EventEmitter<Event>();

  _disabled: boolean = false;
  ngControl: Nullable<NgControl> = null;
  onModelChange: Fn = () => {
  };
  onModelTouched: Fn = () => {
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
      currentControl = this.ngControl.control!;
      if (controlContainer) {
        parentForm = controlContainer.control;
        rootForm = controlContainer.formDirective as FormGroupDirective;
        if (this.ngControl instanceof FormControlName) {
          currentControl = parentForm.get(this.ngControl.name!.toString())!;
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

  _onChange(event: $RadioButtonClickEvent) {
    this.onChange.emit(event);
    this.onModelChange(this.value);
  }

  _onBlur(event: Event) {
    this.onBlur.emit(event);
    this.onModelTouched();
  }

  _onFocus(event: Event) {
    this.onFocus.emit(event);
  }

  writeValue(value: SafeAny) {
    this.value = value;
    this.cd.markForCheck();
  }

  registerOnChange(fn: Fn) {
    this.onModelChange = fn;
  }

  registerOnTouched(fn: Fn) {
    this.onModelTouched = fn;
  }

  setDisabledState(val: boolean) {
    this.disabled = val;
    this.cd.markForCheck();
  }
}

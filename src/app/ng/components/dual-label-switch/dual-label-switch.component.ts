import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  forwardRef,
  InjectFlags,
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
  FormGroupDirective,
  NG_VALUE_ACCESSOR,
  NgControl,
  UntypedFormGroup
} from "@angular/forms";
import {NgError, NgFixLabelPosition} from "@ng/models/forms";

@Component({
  selector: 'ng-dual-label-switch',
  templateUrl: './dual-label-switch.component.html',
  styleUrls: ['./dual-label-switch.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DualLabelSwitchComponent),
      multi: true,
    },
  ],
})
export class DualLabelSwitchComponent implements OnInit, ControlValueAccessor {
  @Input() value: any;
  @Input() label: string;
  @Input() labelLeft: string;
  @Input() labelRight: string;
  @Input() labelLeftValue: string = 'left';
  @Input() labelRightValue: string = 'right';
  @Input() labelWidth: number;
  @Input() hint: string;
  @Input() rtl: boolean;
  @Input() showRequiredStar: boolean = true;
  @Input() labelPos: NgFixLabelPosition = 'fix-top';
  @Input() errors: NgError;
  @Input() async: boolean;
  // native properties
  @Input() style: any;
  @Input() styleClass: string;
  @Input() tabindex: any;
  @Input() disabled: boolean;
  @Input() readonly: boolean;
  @Output() onChange = new EventEmitter();
  @Output() onChangeAsync = new EventEmitter();

  loading: boolean;
  inputId: string;
  controlContainer: FormGroupDirective;
  ngControl: NgControl;
  onModelChange: any = (_: any) => {
  };
  onModelTouched: any = () => {
  };

  constructor(private cd: ChangeDetectorRef, private injector: Injector) {
  }

  ngOnInit() {
    this.inputId = this.getId();
    let parentForm: UntypedFormGroup;
    let rootForm: FormGroupDirective;
    let currentControl: AbstractControl;
    this.controlContainer = this.injector.get(
      ControlContainer,
      null,
      InjectFlags.Optional || InjectFlags.Host || InjectFlags.SkipSelf
    ) as FormGroupDirective;
    this.ngControl = this.injector.get(NgControl, null);
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
      // by default we suppose the ngControl is and instance of NgModel.
      currentControl = this.ngControl.control;
      if (this.controlContainer) {
        parentForm = this.controlContainer.control;
        rootForm = this.controlContainer.formDirective as FormGroupDirective;
        // only when we have a formGroup (here is : controlContainer), we also may have formControlName instance.
        // so we check this condition when we have a controlContainer and overwrite currentControl value.
        if (this.ngControl instanceof FormControlName) {
          currentControl = parentForm.get(this.ngControl.name.toString());
        }
        rootForm.ngSubmit.subscribe(() => {
          if (!this.disabled) {
            currentControl.markAsTouched();
          }
        });
      }
    }
    this.setInitValue()
  }

  ngAfterViewInit() {
    if (this.showRequiredStar && this.isRequired()) {
      if (this.label) {
        this.label += ' *';
      }
      this.cd.detectChanges();
    }
  }

  setInitValue() {
    if (!this.value) {
      this.value = this.labelLeftValue;
      this.onModelChange(this.value)
    }
  }

  _onChange(event) {
    if (this.async) {
      this.loading = true;
      this.disabled = true;
      this.cd.detectChanges();
      this.onChangeAsync.emit({loadingCallback: this.removeLoading, value: event.checked});
    } else {
      this.onModelChange(event.checked);
      this.onChange.emit(event);
    }
  }

  removeLoading = (ok: boolean = true) => {
    this.loading = false;
    this.disabled = false;
    if (!ok) {
      this.value = !this.value;
    }
  };

  getId() {
    return "id" + Math.random().toString(16).slice(2)
  }

  isInvalid() {
    if (this.ngControl) {
      const control = this.ngControl.control;
      return (control.touched || control.dirty) && control.invalid;
    }
  }

  showError(errorType: string): boolean {
    return (
      this.isInvalid() && this.ngControl.control.hasError(errorType.toLowerCase())
    );
  }

  showHint() {
    let hasError = false;
    for (const error in this.errors) {
      if (this.showError(error)) {
        hasError = true
      }
      ;
    }
    return !hasError;
  }

  isRequired(): boolean {
    if (this.ngControl) {
      const control = this.ngControl.control;
      if (control.validator) {
        const validator = control.validator({} as AbstractControl);
        if (validator && validator.required) {
          return true;
        }
      }
    }
    return false;
  }

  writeValue(value: any) {
    this.value = value;
    this.setInitValue()
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

import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  forwardRef,
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
  FormGroupDirective,
  NG_VALUE_ACCESSOR,
  NgControl,
  FormGroup,
} from '@angular/forms';
import {NgFixLabelPosition, NgValidation} from '@ng/models/forms';
import {NgOrientation} from '@ng/models/offset';
import {GlobalConfig} from "@core/global.config";

@Component({
  selector: 'ng-multi-checkbox',
  templateUrl: './multi-checkbox.component.html',
  styleUrls: ['./multi-checkbox.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MultiCheckboxComponent),
      multi: true,
    },
  ],
})
export class MultiCheckboxComponent implements OnInit, AfterViewInit, ControlValueAccessor {
  @Input() value: any[];
  @Input() label: string;
  @Input() filled: boolean;
  @Input() labelWidth: number;
  @Input() hint: string;
  @Input() rtl: boolean = GlobalConfig.rtl;
  @Input() showRequiredStar: boolean = true;
  @Input() labelPos: NgFixLabelPosition = GlobalConfig.defaultFixLabelPos;
  @Input() validation: NgValidation;
  @Input() options: any[];
  @Input() optionLabel: string = 'label';
  @Input() optionValue: string = 'value';
  @Input() optionDisabled: string = 'disabled';
  @Input() orientation: NgOrientation = 'vertical';

  // native properties
  @Input('disabled') set setDisabled(disabled: boolean) {
    this.disabled = disabled;
    this.options.forEach(option => {
      option[this.optionDisabled] = disabled
    })
  };

  @Input('readonly') set setReadonly(readonly: boolean) {
    this.readonly = readonly;
  }

  @Input() style: any;
  @Input() styleClass: string;
  @Input() checkboxIcon: string = 'pi pi-check';
  @Output() onChange = new EventEmitter();

  readonly: boolean = false;
  disabled: boolean = false;
  groupName: string;
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
    this.options?.forEach((item) => {
      Object.assign(item, {id: this.getId()});
    });
    this.groupName = this.getId();
    this.inputId = this.getId();
    let parentForm: FormGroup;
    let rootForm: FormGroupDirective;
    let currentControl: AbstractControl;
    this.controlContainer = this.injector.get(
      ControlContainer,
      null,
      {optional: true, host: true, skipSelf: true}
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
  }

  ngAfterViewInit() {
    if (this.showRequiredStar && this.isRequired()) {
      if (this.label) {
        this.label += ' *';
      }
      this.cd.detectChanges();
    }
  }

  _onChange() {
    this.onChange.emit(this.value);
    this.onModelChange(this.value);
  }

  getId() {
    return "id" + Math.random().toString(16).slice(2)
  }

  isInvalid() {
    if (this.ngControl) {
      const control = this.ngControl.control;
      return (!this.disabled && (control.touched || control.dirty) && control.invalid);
    }
    return false
  }

  hasError(type: string): boolean {
    return this.isInvalid() && this.ngControl.control.hasError(type);
  }

  showHint() {
    let hasError = false;
    for (const errorKey in this.validation) {
      if (this.hasError(errorKey)) {
        hasError = true;
      }
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

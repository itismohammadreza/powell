import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
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
  FormControl,
  FormControlName,
  FormGroup,
  FormGroupDirective,
  NG_VALUE_ACCESSOR,
  NgControl,
  UntypedFormGroup
} from "@angular/forms";
import {NgFixLabelPosition, NgValidation} from "@ng/models/forms";
import {GlobalConfig} from "@core/global.config";

@Component({
  selector: 'ng-input-otp',
  templateUrl: './input-otp.component.html',
  styleUrls: ['./input-otp.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputOtpComponent),
      multi: true
    }
  ],
})
export class InputOtpComponent implements OnInit, AfterViewInit, ControlValueAccessor {
  @Input('value') set value(v: any) {
    this.setValue(v)
  };
  @Input() label: string;
  @Input() filled: boolean;
  @Input() labelWidth: number;
  @Input() hint: string;
  @Input() rtl: boolean = false;
  @Input() showRequiredStar: boolean = true;
  @Input() labelPos: NgFixLabelPosition = GlobalConfig.defaultFixLabelPos;
  @Input() validation: NgValidation;
  @Input() readonly: boolean;
  @Input() disabled: boolean;
  @Input() placeholder: string;
  @Input() style: any;
  @Input() styleClass: string;
  @Input() inputStyle: any;
  @Input() inputStyleClass: string;
  @Input() inputCount: number = 4;
  @Input() allowedKeyCodes: string[];
  @Input() numbersOnly: boolean = true;
  @Input() autoFocusFirst: boolean;
  @Output() onChange = new EventEmitter<string>();

  form: FormGroup;
  controlContainer: FormGroupDirective;
  ngControl: NgControl;
  onModelChange: any = (_: any) => {
  };
  onModelTouched: any = () => {
  };

  constructor(private el: ElementRef, private cd: ChangeDetectorRef, private injector: Injector) {
  }

  ngOnInit() {
    this.form = new FormGroup({});
    for (let index = 0; index < this.inputCount; index++) {
      this.form.addControl(this.getControlName(index), new FormControl());
    }
    this.form.valueChanges.subscribe(() => {
      this.transformKeys(this.form.controls).forEach((k) => {
        const val = this.form.controls[k].value;
        if (val && val.length > 1) {
          if (val.length >= this.inputCount) {
            this.setValue(val);
          } else {
            this.rebuildValue();
          }
        }
      });
    });
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
  }

  ngAfterViewInit(): void {
    if (this.autoFocusFirst) {
      const input = this.getNthInput(0);
      this.focusInput(input);
    }
    if (this.showRequiredStar && this.isRequired()) {
      if (this.label) {
        this.label += ' *';
      }
      this.cd.detectChanges();
    }
  }

  _onBlur() {
    this.onModelTouched();
  }

  isInvalid() {
    if (this.ngControl) {
      const control = this.ngControl.control;
      return (!this.disabled && (control.touched || control.dirty) && control.invalid);
    }
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
  };

  getControlName(idx: number) {
    return `ctrl_${idx}`;
  }

  onKeyDown(event: KeyboardEvent) {
    if (this.isSpacebar(event)) {
      event.preventDefault();
      return false;
    }
  }

  onKeyUp(event: any, index: number) {
    const nextInputEl = this.getNthInput(index + 1);
    const prevInputEl = this.getNthInput(index - 1);

    if (this.isRightArrow(event)) {
      event.preventDefault();
      this.selectInput(nextInputEl);
      return;
    }
    if (this.isLeftArrow(event)) {
      event.preventDefault();
      this.selectInput(prevInputEl);
      return;
    }
    if (this.isBackspaceOrDelete(event) && !event.target.value) {
      this.selectInput(prevInputEl);
      this.rebuildValue();
      return;
    }

    if (!event.target.value) {
      return;
    }

    if (this.isValidKeyCode(event)) {
      this.selectInput(nextInputEl);
    }
    this.rebuildValue();
  }

  isNumber(value: any) {
    return value && /^\d*\.?\d*$/.test(value);
  }

  selectInput(input: HTMLInputElement) {
    if (input) {
      this.focusInput(input)
      if (input.setSelectionRange) {
        setTimeout(() => {
          input.setSelectionRange(0, 1);
        }, 0);
      }
    }
  }

  isValidKeyCode(event: any) {
    const inp = event.key;
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    return (
      isMobile ||
      /[a-zA-Z0-9-_]/.test(inp) ||
      (this.allowedKeyCodes && this.allowedKeyCodes.includes(event.keyCode))
    );
  }

  setValue(value: any) {
    if (this.numbersOnly && isNaN(value)) {
      return;
    }
    this.form.reset();
    if (!value) {
      this.rebuildValue();
      return;
    }
    value = value.toString().replace(/\s/g, '');
    Array.from(value).forEach((c, idx) => {
      if (this.form.get(this.getControlName(idx))) {
        this.form.get(this.getControlName(idx)).setValue(c);
      }
    });
    if (this.autoFocusFirst) {
      const indexOfElementToFocus = value.length < this.inputCount ? value.length : (this.inputCount - 1);
      let input = this.getNthInput(indexOfElementToFocus);
      this.focusInput(input)
    }
    this.rebuildValue();
  }

  rebuildValue() {
    let value = '';
    this.transformKeys(this.form.controls).forEach(k => {
      if (this.form.controls[k].value) {
        let ctrlVal = this.form.controls[k].value;
        let isLengthExceed = ctrlVal.length > 1;
        ctrlVal = ctrlVal[0];
        value += ctrlVal;
        if (isLengthExceed) {
          this.form.controls[k].setValue(ctrlVal);
        }
      }
    });
    this.onChange.emit(value);
    this.onModelChange(value);
  }

  onPaste(event: any) {
    let clipboardData = event.clipboardData || window['clipboardData'];
    let pastedData: string;
    if (clipboardData) {
      pastedData = clipboardData.getData('Text');
    }
    event.stopPropagation();
    event.preventDefault();
    if (!pastedData || (this.numbersOnly && !this.isNumber(pastedData))) {
      return;
    }
    this.setValue(pastedData);
  }

  transformKeys(value: any): string[] {
    return Object.keys(value);
  }

  isBackspaceOrDelete(event: KeyboardEvent) {
    return this.isKey(event, 'Backspace;Delete;Del');
  }

  isRightArrow(event: KeyboardEvent) {
    return this.isKey(event, 'ArrowRight;Right')
  }

  isLeftArrow(event: KeyboardEvent) {
    return this.isKey(event, 'ArrowLeft;Left')
  }

  isSpacebar(event: KeyboardEvent) {
    return this.isKey(event, 'Spacebar; ')
  }

  isKey(event: KeyboardEvent, keys: string) {
    let keysToCheck = keys.split(';');
    return keysToCheck.some(k => k === event.key);
  }

  getKeyFilter() {
    return this.numbersOnly ? 'num' : /.*/g;
  }

  getNthInput(index: number) {
    const inputs = this.el.nativeElement.querySelectorAll('input');
    return inputs[index] as HTMLInputElement;
  }

  focusInput(input: HTMLInputElement) {
    if (input && input.focus) {
      input.focus();
    }
  }

  writeValue(value: any) {
    this.setValue(value);
  }

  registerOnChange(fn) {
    this.onModelChange = fn;
  }

  registerOnTouched(fn) {
  }
}

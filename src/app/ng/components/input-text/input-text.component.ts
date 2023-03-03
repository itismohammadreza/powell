import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
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
} from '@angular/forms';
import {NgAddon, NgInputMode, NgInputType, NgKeyFilter, NgLabelPosition, NgValidation} from '@ng/models/forms';
import {NgIconPosition, NgSize} from '@ng/models/offset';
import {ConfigService} from "@ng/services";

@Component({
  selector: 'ng-input-text',
  templateUrl: './input-text.component.html',
  styleUrls: ['./input-text.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputTextComponent),
      multi: true
    }
  ],
})
export class InputTextComponent implements OnInit, AfterViewInit, ControlValueAccessor {
  @Input() value: any;
  @Input() label: string;
  @Input() filled: boolean = this.configService.getConfig().filled;
  @Input() labelWidth: number;
  @Input() hint: string;
  @Input() rtl: boolean = this.configService.getConfig().rtl;
  @Input() showRequiredStar: boolean = this.configService.getConfig().showRequiredStar;
  @Input() icon: string;
  @Input() labelPos: NgLabelPosition = this.configService.getConfig().labelPos;
  @Input() iconPos: NgIconPosition = 'left';
  @Input() addon: NgAddon;
  @Input() validation: NgValidation;
  @Input() inputSize: NgSize = this.configService.getConfig().inputSize;
  @Input() disableConfigChangeEffect: boolean = this.configService.getConfig().disableConfigChangeEffect;
  @Input() readonly: boolean;
  @Input() disabled: boolean;
  @Input() maxlength: number;
  @Input() placeholder: string;
  @Input() type: NgInputType = 'text';
  @Input() inputMode: NgInputMode = 'text';
  @Input() keyFilter: NgKeyFilter | RegExp;
  @Input() showClear: boolean;
  @Input() style: any;
  @Input() styleClass: string;
  @Input() inputStyle: any;
  @Input() inputStyleClass: string;
  @Input() autocomplete: any;
  @Output() onInput = new EventEmitter();
  @Output() onClick = new EventEmitter();
  @Output() onChange = new EventEmitter();
  @Output() onKeyDown = new EventEmitter();
  @Output() onKeyUp = new EventEmitter();
  @Output() onBlur = new EventEmitter();
  @Output() onFocus = new EventEmitter();
  @Output() onClear = new EventEmitter();
  @Output() onPaste = new EventEmitter();
  @Output() onBeforeBtnClick = new EventEmitter();
  @Output() onAfterBtnClick = new EventEmitter();

  inputId: string;
  controlContainer: FormGroupDirective;
  ngControl: NgControl;
  onModelChange: any = (_: any) => {
  };
  onModelTouched: any = () => {
  };

  constructor(private cd: ChangeDetectorRef,
              private injector: Injector,
              private el: ElementRef,
              private configService: ConfigService) {
  }

  ngOnInit() {
    if (!this.keyFilter) {
      this.keyFilter = /.*/g;
    }
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
      currentControl = this.ngControl.control;
      if (this.controlContainer) {
        parentForm = this.controlContainer.control;
        rootForm = this.controlContainer.formDirective as FormGroupDirective;

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
      if (this.placeholder) {
        this.placeholder += ' *';
      }
      this.cd.detectChanges();
    }
  }

  _onChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.onChange.emit(event);
    this.onModelChange(inputElement.value);
  }

  _onInput(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.onInput.emit(event);
    this.onModelChange(inputElement.value);
    this.setInputDirection();
  }

  _onBlur() {
    this.onBlur.emit();
    this.onModelTouched();
  }

  clear() {
    this.value = null;
    this.onModelChange(this.value);
    this.onClear.emit();
  }

  emitter(name: string, event: any) {
    (this[name] as EventEmitter<any>).emit(event);
  }

  _onKeyDown(event: KeyboardEvent) {
    const inputElement = event.target as HTMLInputElement;
    this.onKeyDown.emit(event);
    this.onModelChange(inputElement.value);
  }

  _onKeyUp(event: KeyboardEvent) {
    const inputElement = event.target as HTMLInputElement;
    this.onKeyUp.emit(event);
    this.onModelChange(inputElement.value);
  }

  getId() {
    return 'id' + Math.random().toString(16).slice(2);
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
  };

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

  setInputDirection() {
    const inputEl = this.el.nativeElement.querySelector('input');
    const rgx = /^[-!$%^&*()_+|~=`{}\[\]:\";'<>?,.\/]*[A-Za-z]/;
    const isAscii = rgx.test(this.value);

    if (isAscii) {
      inputEl.style.direction = 'ltr';
      inputEl.style.textAlign = 'left';
    } else {
      inputEl.style.direction = 'rtl';
      inputEl.style.textAlign = 'right';
    }
  };
}

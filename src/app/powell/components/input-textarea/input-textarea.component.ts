import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  Injector,
  Input,
  OnDestroy,
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
import {Subject, takeUntil} from "rxjs";
import {NgAddon, NgIconPosition, NgLabelPosition, NgValidation} from '@powell/models';

@Component({
  selector: 'ng-input-textarea',
  templateUrl: './input-textarea.component.html',
  styleUrls: ['./input-textarea.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputTextareaComponent),
      multi: true
    }
  ]
})
export class InputTextareaComponent implements OnInit, ControlValueAccessor, OnDestroy {
  @Input() value: any;
  @Input() label: string;
  @Input() filled: boolean;
  @Input() labelWidth: number;
  @Input() hint: string;
  @Input() rtl: boolean;
  @Input() showRequiredStar: boolean;
  @Input() icon: string;
  @Input() labelPos: NgLabelPosition;
  @Input() iconPos: NgIconPosition = 'left';
  @Input() addon: NgAddon;
  @Input() validation: NgValidation;
  @Input() disableConfigChangeEffect: boolean;
  @Input() rows: number;
  @Input() cols: number;
  @Input() autoResize: boolean;
  @Input() readonly: boolean;
  @Input() disabled: boolean;
  @Input() maxlength: number;
  @Input() placeholder: string;
  @Input() style: any;
  @Input() styleClass: string;
  @Input() inputStyle: any;
  @Input() inputStyleClass: string;
  @Output() onResize = new EventEmitter();
  @Output() onInput = new EventEmitter();
  @Output() onChange = new EventEmitter();
  @Output() onKeyDown = new EventEmitter();
  @Output() onKeyUp = new EventEmitter();
  @Output() onBlur = new EventEmitter();
  @Output() onFocus = new EventEmitter();

  inputId: string;
  ngControl: NgControl;
  destroy$ = new Subject();
  onModelChange: any = (_: any) => {
  };
  onModelTouched: any = () => {
  };

  constructor(private cd: ChangeDetectorRef,
              private injector: Injector,
              private el: ElementRef) {
  }

  ngOnInit() {
    this.inputId = this.getId();
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
  }

  _onResize(event: any) {
    this.onResize.emit(event);
  }

  _onChange(event: any) {
    const inputElement = event.target as HTMLTextAreaElement;
    this.onChange.emit(event);
    this.onModelChange(inputElement.value);
  }

  _onInput(event: any) {
    const inputElement = event.target as HTMLTextAreaElement;
    this.onInput.emit(event);
    this.onModelChange(inputElement.value);
    this.setTextareaDirection();
  }

  _onBlur() {
    this.onBlur.emit();
    this.onModelTouched();
  }

  emitter(name: string, event: any) {
    (this[name] as EventEmitter<any>).emit(event);
  }

  _onKeyDown(event: KeyboardEvent) {
    const inputElement = event.target as HTMLTextAreaElement;
    this.onKeyDown.emit(event);
    this.onModelChange(inputElement.value);
  }

  _onKeyUp(event: KeyboardEvent) {
    const inputElement = event.target as HTMLTextAreaElement;
    this.onKeyUp.emit(event);
    this.onModelChange(inputElement.value);
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

  setTextareaDirection() {
    const textareaEl = this.el.nativeElement.querySelector('textarea');
    const rgx = /^[-!$%^&*()_+|~=`{}\[\]:\";'<>?,.\/]*[A-Za-z]/;
    const isAscii = rgx.test(this.value);
    if (isAscii) {
      if (this.value) {
        textareaEl.style.direction = 'ltr';
        textareaEl.style.textAlign = 'left';
      } else {
        textareaEl.style.direction = this.rtl ? 'rtl' : 'ltr';
        textareaEl.style.textAlign = this.rtl ? 'right' : 'left';
      }
    } else {
      if (this.value) {
        textareaEl.style.direction = 'rtl';
        textareaEl.style.textAlign = 'right';
      } else {
        textareaEl.style.direction = this.rtl ? 'rtl' : 'ltr';
        textareaEl.style.textAlign = this.rtl ? 'right' : 'left';
      }
    }
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}

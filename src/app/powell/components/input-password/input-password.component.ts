import {
  AfterContentInit,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  EventEmitter,
  forwardRef,
  Injector,
  Input, OnDestroy,
  OnInit,
  Output,
  QueryList,
  TemplateRef
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
import {NgAddon, NgIconPosition, NgLabelPosition, NgSize, NgValidation} from '@powell/models';
import {TemplateDirective} from '@powell/directives/template';
import {ConfigHandler} from "@powell/api";

@Component({
  selector: 'ng-input-password',
  templateUrl: './input-password.component.html',
  styleUrls: ['./input-password.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputPasswordComponent),
      multi: true
    }
  ]
})
export class InputPasswordComponent implements OnInit, AfterContentInit, ControlValueAccessor, OnDestroy {
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
  @Input() inputSize: NgSize;
  @Input() disableConfigChangeEffect: boolean;
  // native properties
  @Input() promptLabel: string = 'لطفا رمز عبور را وارد کنید';
  @Input() mediumRegex: string = '/^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})./';
  @Input() strongRegex: string = '/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/';
  @Input() weakLabel: string = 'ضعیف';
  @Input() mediumLabel: string = 'متوسط';
  @Input() strongLabel: string = 'قوی';
  @Input() feedback: boolean = true;
  @Input() toggleMask: boolean;
  @Input() appendTo: any;
  @Input() disabled: boolean;
  @Input() inputStyle: any;
  @Input() inputStyleClass: string;
  @Input() style: any;
  @Input() styleClass: string;
  @Input() placeholder: string;
  @Input() showClear: boolean;
  @Output() onInput = new EventEmitter();
  @Output() onChange = new EventEmitter();
  @Output() onKeyDown = new EventEmitter();
  @Output() onKeyUp = new EventEmitter();
  @Output() onBlur = new EventEmitter();
  @Output() onFocus = new EventEmitter();
  @Output() onClear = new EventEmitter();
  @Output() onBeforeBtnClick = new EventEmitter();
  @Output() onAfterBtnClick = new EventEmitter();
  @ContentChildren(TemplateDirective) templates: QueryList<TemplateDirective>;

  inputId: string;
  controlContainer: FormGroupDirective;
  ngControl: NgControl;
  destroy$ = new Subject();
  contentTemplate: TemplateRef<any>;
  headerTemplate: TemplateRef<any>;
  footerTemplate: TemplateRef<any>;
  onModelChange: any = (_: any) => {
  };
  onModelTouched: any = () => {
  };

  constructor(private cd: ChangeDetectorRef, private injector: Injector) {
  }

  ngOnInit() {
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
        rootForm.ngSubmit.pipe(takeUntil(this.destroy$)).subscribe(() => {
          if (!this.disabled) {
            currentControl.markAsTouched();
          }
        });
      }
    }
  }

  ngAfterContentInit() {
    this.templates.forEach((item: TemplateDirective) => {
      switch (item.getType()) {
        case 'content':
          this.contentTemplate = item.templateRef;
          break;

        case 'header':
          this.headerTemplate = item.templateRef;
          break;

        case 'footer':
          this.footerTemplate = item.templateRef;
          break;
      }
    });
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
  }

  _onBlur() {
    this.onBlur.emit();
    this.onModelTouched();
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

  _onClear() {
    this.onClear.emit();
    this.onModelChange(null);
  }

  emitter(name: string, event: any) {
    (this[name] as EventEmitter<any>).emit(event);
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

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}

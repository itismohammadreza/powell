import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  forwardRef,
  InjectFlags,
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
  NgModel,
  UntypedFormGroup,
} from '@angular/forms';
import {NgError, NgLabelPosition} from '@ng/models/forms';
import {NgOrientation} from '@ng/models/offset';

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
  @Input() options: any[];
  @Input() optionLabel: string = 'label';
  @Input() optionValue: string = 'value';
  @Input() optionDisabled: string = 'disabled';
  @Input() label: string;
  @Input() labelWidth: number;
  @Input() hint: string;
  @Input() rtl: boolean;
  @Input() showRequiredStar: boolean = true;
  @Input() labelPos: NgLabelPosition = 'fix-top';
  @Input() orientation: NgOrientation = 'vertical';
  @Input() errors: NgError;
  // native properties
  @Input() disabled: boolean;
  @Input() tabindex: any;
  @Input() ariaLabelledBy: string;
  @Input() ariaLabel: string;
  @Input() style: any;
  @Input() styleClass: string;
  @Input() labelStyleClass: string;
  @Input() checkboxIcon: string = 'pi pi-check';
  @Input() readonly: boolean;
  @Input() trueValue: any;
  @Input() falseValue: any;
  @Output() onChange = new EventEmitter();

  groupName: string;
  inputId: string;
  controlContainer: FormGroupDirective;
  ngControl: NgControl;

  constructor(private cd: ChangeDetectorRef, private injector: Injector) {
  }

  onModelChange: any = (_: any) => {
  };

  onModelTouched: any = () => {
  };

  ngOnInit() {
    let parentForm: UntypedFormGroup;
    let rootForm: FormGroupDirective;
    let currentControl: AbstractControl;
    this.inputId = this.getId();
    this.groupName = this.getId();
    this.options.forEach((item) => {
      Object.assign(item, {id: this.getId()});
    });
    this.controlContainer = this.injector.get(
      ControlContainer,
      null,
      InjectFlags.Optional || InjectFlags.Host || InjectFlags.SkipSelf
    ) as FormGroupDirective;
    this.ngControl = this.injector.get(NgControl, null);
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
    if (this.controlContainer && this.ngControl) {
      parentForm = this.controlContainer.control;
      rootForm = this.controlContainer.formDirective as FormGroupDirective;
      if (this.ngControl instanceof NgModel) {
        currentControl = this.ngControl.control;
      } else if (this.ngControl instanceof FormControlName) {
        currentControl = parentForm.get(this.ngControl.name.toString());
      }
      rootForm.ngSubmit.subscribe(() => {
        if (!this.disabled) {
          currentControl.markAsTouched();
        }
      });
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
      return (control.touched || control.dirty) && control.invalid;
    }
  }

  showError(errorType: string): boolean {
    return (
      this.isInvalid() && this.ngControl.control.hasError(errorType.toLowerCase())
    );
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

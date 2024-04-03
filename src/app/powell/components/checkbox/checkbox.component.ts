import {
  AfterContentInit,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  EventEmitter,
  forwardRef,
  Injector,
  Input,
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
import {takeUntil} from "rxjs";
import {NgAsyncEvent, NgCssObject, NgValidation} from '@powell/models';
import {DestroyService} from "@core/utils";
import {PrimeCheckboxChangeEvent, PrimeUniqueComponentId} from "@powell/primeng/api";
import {TemplateDirective} from "@powell/directives/template";

@Component({
  selector: 'ng-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxComponent),
      multi: true
    },
    DestroyService
  ]
})
export class CheckboxComponent implements OnInit, AfterContentInit, ControlValueAccessor {
  @Input() value: any;
  @Input() label: string;
  @Input() filled: boolean;
  @Input() hint: string;
  @Input() rtl: boolean;
  @Input() showRequiredStar: boolean;
  @Input() validation: NgValidation;
  @Input() onLabel: string;
  @Input() offLabel: string;
  @Input() async: boolean;
  @Input() showAsyncLoading: boolean = true;
  @Input() disableConfigChangeEffect: boolean;
  // native properties
  @Input() disabled: boolean;
  @Input() binary: boolean = false;
  @Input() ariaLabelledBy: string;
  @Input() ariaLabel: string;
  @Input() tabindex: number;
  @Input() inputId: string = PrimeUniqueComponentId();
  @Input() style: NgCssObject;
  @Input() styleClass: string;
  @Input() labelStyleClass: string;
  @Input() checkboxIcon: string;
  @Input() readonly: boolean = false;
  @Input() trueValue: any = true;
  @Input() falseValue: any = false;
  @Output() onChange = new EventEmitter<PrimeCheckboxChangeEvent>();
  @Output() onFocus = new EventEmitter<Event>();
  @Output() onBlur = new EventEmitter<Event>();
  @Output() onChangeAsync = new EventEmitter<NgAsyncEvent<PrimeCheckboxChangeEvent>>();
  @ContentChildren(TemplateDirective) templates: QueryList<TemplateDirective>;

  loading: boolean;
  ngControl: NgControl;
  templateMap: Record<string, TemplateRef<any>> = {};
  onModelChange: Function = () => {
  };
  onModelTouched: Function = () => {
  };

  constructor(private cd: ChangeDetectorRef,
              private injector: Injector,
              private destroy$: DestroyService) {
  }

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
    this.setLabel();
  }

  ngAfterContentInit() {
    this.templates.forEach(item => {
      const name = item.getType();
      this.templateMap[name] = item.templateRef;
    });
  }

  setLabel() {
    if (this.onLabel && this.offLabel) {
      if (this.value) {
        this.label = this.onLabel;
      } else {
        this.label = this.offLabel;
      }
    }
  }

  _onChange(event: PrimeCheckboxChangeEvent) {
    if (this.async) {
      this.loading = true;
      this.disabled = true;
      this.cd.detectChanges();
      this.onChangeAsync.emit({loadingCallback: this.removeLoading, event});
    } else {
      this.onModelChange(event.checked);
      this.onChange.emit(event);
      this.setLabel();
    }
  }

  _onBlur(event: Event) {
    this.onBlur.emit(event);
    this.onModelTouched();
  }

  _onFocus(event: Event) {
    this.onFocus.emit(event);
  }

  removeLoading = (ok: boolean = true) => {
    this.loading = false;
    this.disabled = false;
    if (!ok) {
      this.value = !this.value;
    }
    this.onModelChange(this.value);
    this.setLabel();
  };

  isInvalid() {
    if (this.ngControl) {
      const control = this.ngControl.control;
      return (!this.disabled && (control.touched || control.dirty) && control.invalid);
    }
    return false
  }

  hasError(type: string) {
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
    this.setLabel();
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

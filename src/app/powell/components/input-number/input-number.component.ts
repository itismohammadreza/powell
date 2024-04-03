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
  TemplateRef,
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
import {
  NgAddon,
  NgCssObject,
  NgIconPosition,
  NgLabelPosition,
  NgNumberButtonLayout,
  NgNumberLocaleMatcher,
  NgNumberMode,
  NgSize,
  NgValidation
} from '@powell/models';
import {DestroyService} from "@core/utils";
import {PrimeInputNumberInputEvent, PrimeUniqueComponentId} from "@powell/primeng/api";
import {TemplateDirective} from "@powell/directives/template";

@Component({
  selector: 'ng-input-number',
  templateUrl: './input-number.component.html',
  styleUrls: ['./input-number.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputNumberComponent),
      multi: true
    },
    DestroyService
  ]
})
export class InputNumberComponent implements OnInit, AfterContentInit, ControlValueAccessor {
  @Input() value: number;
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
  @Input() showButtons: boolean = false;
  @Input() format: boolean = true;
  @Input() buttonLayout: NgNumberButtonLayout = 'stacked';
  @Input() inputId: string = PrimeUniqueComponentId();
  @Input() styleClass: string;
  @Input() style: NgCssObject;
  @Input() placeholder: string;
  @Input() size: number;
  @Input() maxlength: number;
  @Input() tabindex: number;
  @Input() title: string;
  @Input() ariaLabelledBy: string;
  @Input() ariaLabel: string;
  @Input() ariaRequired: boolean = false;
  @Input() name: string;
  @Input() required: boolean = false;
  @Input() autocomplete: string;
  @Input() min: number;
  @Input() max: number;
  @Input() incrementButtonClass: string;
  @Input() decrementButtonClass: string;
  @Input() incrementButtonIcon: string;
  @Input() decrementButtonIcon: string;
  @Input() readonly: boolean = false;
  @Input() step: number = 1;
  @Input() allowEmpty: boolean = true;
  @Input() locale: string;
  @Input() localeMatcher: NgNumberLocaleMatcher = 'best fit';
  @Input() mode: NgNumberMode = 'decimal';
  @Input() currency: string;
  @Input() currencyDisplay: string;
  @Input() useGrouping: boolean = true;
  @Input() minFractionDigits: number;
  @Input() maxFractionDigits: number;
  @Input() prefix: string;
  @Input() suffix: string;
  @Input() inputStyle: NgCssObject;
  @Input() inputStyleClass: string;
  @Input() showClear: boolean = false;
  @Input() disabled: boolean;
  @Output() onInput = new EventEmitter<PrimeInputNumberInputEvent>();
  @Output() onFocus = new EventEmitter<Event>();
  @Output() onBlur = new EventEmitter<Event>();
  @Output() onKeyDown = new EventEmitter<KeyboardEvent>();
  @Output() onClear = new EventEmitter<void>();
  @ContentChildren(TemplateDirective) templates: QueryList<TemplateDirective>;

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
  }

  ngAfterContentInit() {
    this.templates.forEach(item => {
      const name = item.getType();
      this.templateMap[name] = item.templateRef;
    });
  }

  _onInput(event: any) {
    this.onInput.emit(event);
    this.onModelChange(event.value);
  }

  _onBlur(event: Event) {
    this.onBlur.emit(event);
    this.onModelTouched();
  }

  _onClear() {
    this.onClear.emit();
    this.onModelChange(null);
  }

  _onFocus(event: Event) {
    this.onFocus.emit(event);
  }

  _onKeyDown(event: KeyboardEvent) {
    this.onKeyDown.emit(event);
  }

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

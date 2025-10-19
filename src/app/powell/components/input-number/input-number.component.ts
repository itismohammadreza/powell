import {
  AfterContentInit,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  EventEmitter,
  forwardRef,
  inject,
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
  CssObject,
  InputVariant,
  LabelPosition,
  NumberButtonLayout,
  NumberLocaleMatcher,
  NumberMode,
  Size,
  Validation
} from '@powell/models';
import {DestroyService} from "@powell/utils";
import {$InputNumberInputEvent, $uuid} from "@powell/primeng";
import {TemplateDirective} from "@powell/directives/template";
import {ConfigService} from "@powell/api";

@Component({
  selector: 'pw-input-number',
  templateUrl: './input-number.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputNumberComponent),
      multi: true
    },
    DestroyService
  ],
  standalone: false
})
export class InputNumberComponent implements OnInit, AfterContentInit, ControlValueAccessor {
  private cd = inject(ChangeDetectorRef);
  private injector = inject(Injector);
  private configService = inject(ConfigService);
  private destroy$ = inject(DestroyService);

  @Input() value: Optional<number>;
  @Input() label: Optional<string>;
  @Input() labelWidth: Optional<number>;
  @Input() hint: Optional<string>;
  @Input() rtl: Optional<boolean>;
  @Input() showRequiredStar: Optional<boolean>;
  @Input() labelPosition: Optional<LabelPosition>;
  @Input() validation: Optional<Validation>;
  @Input() followConfig: Optional<boolean>;
  // native properties
  @Input() required: boolean = false;
  @Input() disabled: boolean = false;
  @Input() name: Optional<string>;
  @Input() fluid: boolean = false;
  @Input() variant: InputVariant = 'outlined';
  @Input() size: Optional<Size>;
  @Input() inputSize: Optional<number>;
  @Input() pattern: Optional<string>;
  @Input() min: Optional<number>;
  @Input() max: Optional<number>;
  @Input() step: Optional<number>;
  @Input() minlength: Optional<number>;
  @Input() maxlength: Optional<number>;
  @Input() showButtons: boolean = false;
  @Input() format: boolean = true;
  @Input() buttonLayout: NumberButtonLayout = 'stacked';
  @Input() inputId: string = $uuid();
  @Input() placeholder: Optional<string>;
  @Input() tabindex: Optional<number>;
  @Input() title: Optional<string>;
  @Input() ariaLabelledBy: Optional<string>;
  @Input() ariaDescribedBy: Optional<string>;
  @Input() ariaLabel: Optional<string>;
  @Input() ariaRequired: boolean = false;
  @Input() autocomplete: Optional<string>;
  @Input() incrementButtonClass: Optional<string>;
  @Input() decrementButtonClass: Optional<string>;
  @Input() incrementButtonIcon: Optional<string>;
  @Input() decrementButtonIcon: Optional<string>;
  @Input() readonly: boolean = false;
  @Input() allowEmpty: boolean = true;
  @Input() locale: Optional<string>;
  @Input() localeMatcher: NumberLocaleMatcher = 'best fit';
  @Input() mode: NumberMode = 'decimal';
  @Input() currency: Optional<string>;
  @Input() currencyDisplay: Optional<SafeAny>;
  @Input() useGrouping: boolean = true;
  @Input() minFractionDigits: Optional<number>;
  @Input() maxFractionDigits: Optional<number>;
  @Input() prefix: Optional<string>;
  @Input() suffix: Optional<string>;
  @Input() inputStyle: Optional<CssObject>;
  @Input() inputStyleClass: Optional<string>;
  @Input() showClear: boolean = false;
  @Input() autofocus: boolean = false;
  @Output() onInput = new EventEmitter<$InputNumberInputEvent>();
  @Output() onFocus = new EventEmitter<Event>();
  @Output() onBlur = new EventEmitter<Event>();
  @Output() onKeyDown = new EventEmitter<KeyboardEvent>();
  @Output() onClear = new EventEmitter<void>();
  @ContentChildren(TemplateDirective) templates: Optional<QueryList<TemplateDirective>>;

  ngControl: Nullable<NgControl> = null;
  templateMap: Record<string, TemplateRef<SafeAny>> = {};
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
    this.configService.configureComponent(this);
  }

  ngAfterContentInit() {
    this.templates?.forEach(item => {
      const name = item.type;
      this.templateMap[name] = item.templateRef;
    });
  }

  _onInput(event: SafeAny) {
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

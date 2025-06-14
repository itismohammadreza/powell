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

  @Input() value: number;
  @Input() label: string;
  @Input() labelWidth: number;
  @Input() hint: string;
  @Input() rtl: boolean;
  @Input() showRequiredStar: boolean;
  @Input() labelPosition: LabelPosition;
  @Input() validation: Validation;
  @Input() followConfig: boolean;
  // native properties
  @Input() showButtons: boolean = false;
  @Input() format: boolean = true;
  @Input() buttonLayout: NumberButtonLayout = 'stacked';
  @Input() inputId: string = $uuid();
  @Input() styleClass: string;
  @Input() style: CssObject;
  @Input() placeholder: string;
  @Input() size: Size;
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
  @Input() localeMatcher: NumberLocaleMatcher = 'best fit';
  @Input() mode: NumberMode = 'decimal';
  @Input() currency: string;
  @Input() currencyDisplay: string;
  @Input() useGrouping: boolean = true;
  @Input() variant: InputVariant;
  @Input() minFractionDigits: number;
  @Input() maxFractionDigits: number;
  @Input() prefix: string;
  @Input() suffix: string;
  @Input() inputStyle: CssObject;
  @Input() inputStyleClass: string;
  @Input() showClear: boolean = false;
  @Input() autofocus: boolean = false;
  @Input() disabled: boolean;
  @Input() fluid: boolean;
  @Output() onInput = new EventEmitter<$InputNumberInputEvent>();
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
    this.configService.configureComponent(this);
  }

  ngAfterContentInit() {
    this.templates.forEach(item => {
      const name = item.type;
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

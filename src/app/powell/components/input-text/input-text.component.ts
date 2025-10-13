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
import { takeUntil } from "rxjs";
import {
  CssObject,
  InputMode,
  InputType,
  InputVariant,
  KeyFilter,
  LabelPosition,
  Size,
  Validation
} from '@powell/models';
import { ConfigService } from "@powell/api";
import { DestroyService } from "@powell/utils";
import { $uuid } from "@powell/primeng";
import { TemplateDirective } from "@powell/directives/template";

@Component({
  selector: 'pw-input-text',
  templateUrl: './input-text.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputTextComponent),
      multi: true
    },
    DestroyService
  ],
  standalone: false
})
export class InputTextComponent implements OnInit, AfterContentInit, ControlValueAccessor {
  private cd = inject(ChangeDetectorRef);
  private injector = inject(Injector);
  private configService = inject(ConfigService);
  private destroy$ = inject(DestroyService);

  @Input() value: Optional<SafeAny>;
  @Input() label: Optional<string>;
  @Input() ariaLabelledBy: Optional<string>;
  @Input() ariaLabel: Optional<string>;
  @Input() labelWidth: Optional<number>;
  @Input() hint: Optional<string>;
  @Input() rtl: boolean = false;
  @Input() showRequiredStar: boolean = false;
  @Input() labelPosition: Optional<LabelPosition>;
  @Input() inputId: string = $uuid();
  @Input() validation: Optional<Validation>;
  @Input() followConfig: boolean = false;
  @Input() readonly: boolean = false;
  @Input() disabled: boolean = false;
  @Input() maxlength: Optional<number>;
  @Input() placeholder: Optional<string>;
  @Input() type: InputType = 'text';
  @Input() inputMode: InputMode = 'text';
  @Input() keyFilter: Optional<KeyFilter | RegExp>;
  @Input() showClear: boolean = false;
  @Input() inputStyle: Optional<CssObject>;
  @Input() inputStyleClass: Optional<string>;
  @Input() autocomplete: Optional<SafeAny>;
  // native properties
  @Input() size: Optional<Size>;
  @Input() variant: Optional<InputVariant>;
  @Input() fluid: boolean = false;
  @Output() onInput = new EventEmitter<Event>();
  @Output() onClick = new EventEmitter<Event>();
  @Output() onChange = new EventEmitter<Event>();
  @Output() onKeyDown = new EventEmitter<KeyboardEvent>();
  @Output() onKeyUp = new EventEmitter<KeyboardEvent>();
  @Output() onBlur = new EventEmitter<FocusEvent>();
  @Output() onFocus = new EventEmitter<FocusEvent>();
  @Output() onClear = new EventEmitter<void>();
  @Output() onPaste = new EventEmitter<Event>();
  @ContentChildren(TemplateDirective) templates: Optional<QueryList<TemplateDirective>>;

  templateMap: Record<string, TemplateRef<SafeAny>> = {};
  ngControl: Nullable<NgControl> = null;
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
      { optional: true, host: true, skipSelf: true }
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

  _onBlur(event: FocusEvent) {
    this.onBlur.emit(event);
    this.onModelTouched();
  }

  clear() {
    this.value = undefined;
    this.onModelChange(this.value);
    this.onClear.emit();
  }

  emitter(key: keyof this, event: SafeAny) {
    (this[key] as EventEmitter<SafeAny>).emit(event);
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

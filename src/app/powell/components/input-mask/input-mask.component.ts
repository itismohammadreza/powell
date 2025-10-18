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
  NgControl,
} from '@angular/forms';
import {takeUntil} from "rxjs";
import {InputType, InputVariant, LabelPosition, Size, Validation} from '@powell/models';
import {DestroyService} from "@powell/utils";
import {TemplateDirective} from "@powell/directives/template";
import {$uuid} from "@powell/primeng";
import {ConfigService} from "@powell/api";

@Component({
  selector: 'pw-input-mask',
  templateUrl: './input-mask.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputMaskComponent),
      multi: true
    },
    DestroyService
  ],
  standalone: false
})
export class InputMaskComponent implements OnInit, AfterContentInit, ControlValueAccessor {
  private cd = inject(ChangeDetectorRef);
  private injector = inject(Injector);
  private configService = inject(ConfigService);
  private destroy$ = inject(DestroyService);

  @Input() value: Optional<SafeAny>;
  @Input() label: Optional<string>;
  @Input() labelWidth: Optional<number>;
  @Input() hint: Optional<string>;
  @Input() rtl: boolean = false;
  @Input() showRequiredStar: boolean = false;
  @Input() labelPosition: Optional<LabelPosition>;
  @Input() validation: Optional<Validation>;
  @Input() followConfig: boolean = false;
  // native properties
  @Input() required: boolean = false;
  @Input() disabled: boolean = false;
  @Input() name: Optional<string>;
  @Input() fluid: boolean = false;
  @Input() variant: Optional<InputVariant>;
  @Input() size: Optional<Size>;
  @Input() inputSize: Optional<number>;
  @Input() pattern: Optional<string>;
  @Input() min: Optional<number>;
  @Input() max: Optional<number>;
  @Input() step: Optional<number>;
  @Input() minlength: Optional<number>;
  @Input() maxlength: Optional<number>;
  @Input() type: InputType = 'text';
  @Input() slotChar: string = '_';
  @Input() autoClear: boolean = true;
  @Input() showClear: boolean = false;
  @Input() inputId: string = $uuid();
  @Input() placeholder: Optional<string>;
  @Input() tabindex: Optional<string>;
  @Input() title: Optional<string>;
  @Input() ariaLabel: Optional<string>;
  @Input() ariaLabelledBy: Optional<string>;
  @Input() ariaRequired: boolean = false;
  @Input() readonly: boolean = false;
  @Input() unmask: boolean = false;
  @Input() characterPattern: string = '[A-Za-z]';
  @Input() autofocus: boolean = false;
  @Input() autocomplete: Optional<string>;
  @Input() keepBuffer: boolean = false;
  @Input() mask: string = '9999-9999';
  @Output() onComplete = new EventEmitter<void>();
  @Output() onFocus = new EventEmitter<Event>();
  @Output() onBlur = new EventEmitter<Event>();
  @Output() onInput = new EventEmitter<Event>();
  @Output() onKeydown = new EventEmitter<Event>();
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


  _onInput(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.onInput.emit(event);
    this.onModelChange(inputElement.value);
  }

  _onBlur(event: Event) {
    this.onBlur.emit(event);
    this.onModelTouched();
  }

  _onClear() {
    this.onClear.emit();
    this.onModelChange(null);
  }

  emitter(key: keyof this, event: SafeAny) {
    (this[key] as EventEmitter<SafeAny>).emit(event);
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

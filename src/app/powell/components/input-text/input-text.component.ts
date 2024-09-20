import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  inject,
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
import {takeUntil} from "rxjs";
import {
  NgAddon,
  NgCssObject,
  NgIconPosition,
  NgInputMode,
  NgInputType,
  NgInputVariant,
  NgKeyFilter,
  NgLabelPosition,
  NgSize,
  NgValidation
} from '@powell/models';
import {ConfigService, UtilsService} from "@powell/api";
import {DestroyService} from "@core/utils";
import {$UniqueComponentId} from "@powell/primeng";

@Component({
  selector: 'ng-input-text',
  templateUrl: './input-text.component.html',
  styleUrls: ['./input-text.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputTextComponent),
      multi: true
    },
    DestroyService
  ]
})
export class InputTextComponent implements OnInit, ControlValueAccessor {
  private cd = inject(ChangeDetectorRef);
  private injector = inject(Injector);
  private configService = inject(ConfigService);
  private destroy$ = inject(DestroyService);
  private el = inject(ElementRef);
  private utilsService = inject(UtilsService);

  @Input() value: any;
  @Input() label: string;
  @Input() ariaLabelledBy: string;
  @Input() ariaLabel: string;
  @Input() labelWidth: number;
  @Input() hint: string;
  @Input() rtl: boolean;
  @Input() showRequiredStar: boolean;
  @Input() icon: string;
  @Input() labelPos: NgLabelPosition;
  @Input() iconPos: NgIconPosition = 'left';
  @Input() inputId: string = $UniqueComponentId();
  @Input() addon: NgAddon;
  @Input() validation: NgValidation;
  @Input() inputSize: NgSize;
  @Input() followConfig: boolean;
  @Input() readonly: boolean;
  @Input() disabled: boolean;
  @Input() maxlength: number;
  @Input() placeholder: string;
  @Input() type: NgInputType = 'text';
  @Input() inputMode: NgInputMode = 'text';
  @Input() keyFilter: NgKeyFilter | RegExp = /.*/g;
  @Input() showClear: boolean;
  @Input() style: NgCssObject;
  @Input() styleClass: string;
  @Input() inputStyle: NgCssObject;
  @Input() inputStyleClass: string;
  @Input() autocomplete: any;
  @Input() variant: NgInputVariant;
  @Output() onInput = new EventEmitter<Event>();
  @Output() onClick = new EventEmitter<Event>();
  @Output() onChange = new EventEmitter<Event>();
  @Output() onKeyDown = new EventEmitter<KeyboardEvent>();
  @Output() onKeyUp = new EventEmitter<KeyboardEvent>();
  @Output() onBlur = new EventEmitter<FocusEvent>();
  @Output() onFocus = new EventEmitter<FocusEvent>();
  @Output() onClear = new EventEmitter<void>();
  @Output() onPaste = new EventEmitter<Event>();

  ngControl: NgControl;
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
    this.configService.applyConfigToComponent(this);
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
    this.utilsService.setInputDirection(this.el.nativeElement.querySelector('input'), this.value, this.rtl);
  }

  _onBlur(event: FocusEvent) {
    this.onBlur.emit(event);
    this.onModelTouched();
  }

  clear() {
    this.value = null;
    this.onModelChange(this.value);
    this.utilsService.setInputDirection(this.el.nativeElement.querySelector('input'), this.value, this.rtl);
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
    this.utilsService.setInputDirection(this.el.nativeElement.querySelector('input'), this.value, this.rtl);
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

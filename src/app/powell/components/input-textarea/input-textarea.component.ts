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
  NgInputVariant,
  NgLabelPosition,
  NgSize,
  NgValidation
} from '@powell/models';
import {ConfigService, UtilsService} from "@powell/api";
import {DestroyService} from "@core/utils";
import {$uuid} from "@powell/primeng";

@Component({
  selector: 'ng-input-textarea',
  templateUrl: './input-textarea.component.html',
  styleUrls: ['./input-textarea.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputTextareaComponent),
      multi: true
    },
    DestroyService
  ],
  standalone: false
})
export class InputTextareaComponent implements OnInit, ControlValueAccessor {
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
  @Input() addon: NgAddon;
  @Input() validation: NgValidation;
  @Input() followConfig: boolean;
  @Input() inputId: string = $uuid();
  @Input() rows: number;
  @Input() cols: number;
  @Input() readonly: boolean;
  @Input() disabled: boolean;
  @Input() maxlength: number;
  @Input() placeholder: string;
  @Input() style: NgCssObject;
  @Input() styleClass: string;
  @Input() inputStyle: NgCssObject;
  @Input() inputStyleClass: string;
  // native properties
  @Input() autoResize: boolean = false;
  @Input() variant: NgInputVariant;
  @Input() fluid: boolean = false;
  @Input() size: NgSize;
  @Output() onResize = new EventEmitter<Event | {}>();
  @Output() onInput = new EventEmitter<Event>();
  @Output() onChange = new EventEmitter<Event>();
  @Output() onKeyDown = new EventEmitter<KeyboardEvent>();
  @Output() onKeyUp = new EventEmitter<KeyboardEvent>();
  @Output() onBlur = new EventEmitter<FocusEvent>();
  @Output() onFocus = new EventEmitter<FocusEvent>();

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

  _onResize(event: Event | {}) {
    this.onResize.emit(event);
  }

  _onChange(event: Event) {
    const inputElement = event.target as HTMLTextAreaElement;
    this.onChange.emit(event);
    this.onModelChange(inputElement.value);
  }

  _onInput(event: Event) {
    const inputElement = event.target as HTMLTextAreaElement;
    this.onInput.emit(event);
    this.onModelChange(inputElement.value);
    this.utilsService.setInputDirection(this.el.nativeElement.querySelector('textarea'), this.value, this.rtl);
  }

  _onBlur(event: FocusEvent) {
    this.onBlur.emit(event);
    this.onModelTouched();
  }

  _onFocus(event: FocusEvent) {
    this.onFocus.emit(event);
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
    this.utilsService.setInputDirection(this.el.nativeElement.querySelector('textarea'), this.value, this.rtl);
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

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
import {NgAddon, NgCssObject, NgIconPosition, NgLabelPosition, NgSize, NgValidation} from '@powell/models';
import {TemplateDirective} from '@powell/directives/template';
import {DestroyService} from "@core/utils";
import {
  PrimeChipsAddEvent,
  PrimeChipsClickEvent,
  PrimeChipsRemoveEvent,
  PrimeUniqueComponentId
} from "@powell/primeng/api";

@Component({
  selector: 'ng-chips',
  templateUrl: './chips.component.html',
  styleUrls: ['./chips.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ChipsComponent),
      multi: true
    },
    DestroyService
  ]
})
export class ChipsComponent implements OnInit, AfterContentInit, ControlValueAccessor {
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
  @Input() style: NgCssObject;
  @Input() styleClass: string;
  @Input() disabled: boolean;
  @Input() field: string;
  @Input() placeholder: string;
  @Input() max: number;
  @Input() maxLength: number;
  @Input() ariaLabel: string;
  @Input() ariaLabelledBy: string;
  @Input() tabindex: number;
  @Input() inputId: string = PrimeUniqueComponentId();
  @Input() allowDuplicate: boolean = true;
  @Input() caseSensitiveDuplication: boolean = true;
  @Input() inputStyle: NgCssObject;
  @Input() inputStyleClass: string;
  @Input() addOnTab: boolean = false;
  @Input() addOnBlur: boolean = false;
  @Input() separator: string | RegExp;
  @Input() showClear: boolean = false;
  @Output() onAdd = new EventEmitter<PrimeChipsAddEvent>();
  @Output() onRemove = new EventEmitter<PrimeChipsRemoveEvent>();
  @Output() onFocus = new EventEmitter<Event>();
  @Output() onChipClick = new EventEmitter<PrimeChipsClickEvent>();
  @Output() onBlur = new EventEmitter<Event>();
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

  _onAdd(event: PrimeChipsAddEvent) {
    this.onAdd.emit(event);
    this.onModelChange(this.value);
  }

  _onRemove(event: PrimeChipsRemoveEvent) {
    this.onRemove.emit(event);
    this.onModelChange(this.value);
  }

  _onBlur(event: Event) {
    this.onBlur.emit(event);
    this.onModelTouched();
  }

  _onClear() {
    this.onClear.emit();
    this.onModelChange(null);
  }

  emitter(name: string, event: any) {
    (this[name] as EventEmitter<any>).emit(event);
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

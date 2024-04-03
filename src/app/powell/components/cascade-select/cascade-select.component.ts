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
  PrimeCascadeSelectBeforeHideEvent,
  PrimeCascadeSelectBeforeShowEvent,
  PrimeCascadeSelectHideEvent,
  PrimeCascadeSelectShowEvent,
  PrimeOverlayOptions,
  PrimeUniqueComponentId
} from "@powell/primeng/api";

@Component({
  selector: 'ng-cascade-select',
  templateUrl: './cascade-select.component.html',
  styleUrls: ['./cascade-select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CascadeSelectComponent),
      multi: true
    },
    DestroyService
  ]
})
export class CascadeSelectComponent implements OnInit, AfterContentInit, ControlValueAccessor {
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
  @Input() id: string;
  @Input() selectOnFocus: boolean = false;
  @Input() searchMessage: string;
  @Input() emptyMessage: string;
  @Input() selectionMessage: string;
  @Input() emptySearchMessage: string;
  @Input() emptySelectionMessage: string;
  @Input() searchLocale: string;
  @Input() optionDisabled: any;
  @Input() autoOptionFocus: boolean = true;
  @Input() styleClass: string;
  @Input() style: NgCssObject;
  @Input() options: any[];
  @Input() optionLabel: string;
  @Input() optionValue: string;
  @Input() optionGroupLabel: string | string[];
  @Input() optionGroupChildren: string | string[];
  @Input() placeholder: string;
  @Input() dataKey: string;
  @Input() inputId: string = PrimeUniqueComponentId();
  @Input() tabindex: number;
  @Input() ariaLabelledBy: string;
  @Input() inputLabel: string;
  @Input() ariaLabel: string;
  @Input() appendTo: any;
  @Input() disabled: boolean;
  @Input() showClear: boolean = false;
  @Input() panelStyleClass: string;
  @Input() panelStyle: NgCssObject;
  @Input() overlayOptions: PrimeOverlayOptions;
  @Input() showTransitionOptions: string;
  @Input() hideTransitionOptions: string;
  @Output() onChange = new EventEmitter<any>();
  @Output() onGroupChange = new EventEmitter<Event>();
  @Output() onShow = new EventEmitter<PrimeCascadeSelectShowEvent>();
  @Output() onHide = new EventEmitter<PrimeCascadeSelectHideEvent>();
  @Output() onClear = new EventEmitter<void>();
  @Output() onBeforeShow = new EventEmitter<PrimeCascadeSelectBeforeShowEvent>();
  @Output() onBeforeHide = new EventEmitter<PrimeCascadeSelectBeforeHideEvent>();
  @Output() onFocus = new EventEmitter<FocusEvent>();
  @Output() onBlur = new EventEmitter<FocusEvent>();
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

  _onChange(event: any) {
    this.onChange.emit(event);
    this.onModelChange(event.value);
  }

  emitter(name: string, event: any) {
    (this[name] as EventEmitter<any>).emit(event);
  }

  _onClear() {
    this.onClear.emit();
    this.onModelChange(null);
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

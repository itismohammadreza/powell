import {
  AfterContentInit,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  EventEmitter,
  forwardRef,
  Injector,
  Input,
  OnDestroy,
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
import {Subject, takeUntil} from "rxjs";
import {NgAddon, NgIconPosition, NgLabelPosition, NgSize, NgValidation} from '@powell/models';
import {TemplateDirective} from '@powell/directives/template';

@Component({
  selector: 'ng-cascade-select',
  templateUrl: './cascade-select.component.html',
  styleUrls: ['./cascade-select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CascadeSelectComponent),
      multi: true
    }
  ]
})
export class CascadeSelectComponent implements OnInit, AfterContentInit, ControlValueAccessor, OnDestroy {
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
  @Input() options: any[];
  @Input() optionLabel: string = 'label';
  @Input() optionValue: string = 'value';
  @Input() optionGroupLabel: string = 'label';
  @Input() optionGroupChildren: string[] = ['items'];
  @Input() placeholder: string;
  @Input() disabled: boolean;
  @Input() dataKey: string;
  @Input() tabindex: any;
  @Input() appendTo: any;
  @Input() style: any;
  @Input() styleClass: string;
  @Input() showClear: boolean = true;
  @Output() onChange = new EventEmitter();
  @Output() onGroupChange = new EventEmitter();
  @Output() onBeforeShow = new EventEmitter();
  @Output() onBeforeHide = new EventEmitter();
  @Output() onShow = new EventEmitter();
  @Output() onHide = new EventEmitter();
  @Output() onClear = new EventEmitter();
  @Output() onBeforeBtnClick = new EventEmitter();
  @Output() onAfterBtnClick = new EventEmitter();
  @ContentChildren(TemplateDirective) templates: QueryList<TemplateDirective>;

  inputId: string;
  ngControl: NgControl;
  destroy$ = new Subject();
  optionTemplate: TemplateRef<any>;
  onModelChange: any = (_: any) => {
  };
  onModelTouched: any = () => {
  };

  constructor(private cd: ChangeDetectorRef, private injector: Injector) {
  }

  ngOnInit() {
    this.inputId = this.getId();
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
    this.templates.forEach((item: TemplateDirective) => {
      switch (item.getType()) {
        case 'item':
          this.optionTemplate = item.templateRef;
          break;
      }
    });
  }

  _onChange(event) {
    this.onChange.emit(event);
    this.onModelChange(event.value);
  }

  _onGroupChange(event) {
    this.onGroupChange.emit(event);
  }

  emitter(name: string, event: any) {
    (this[name] as EventEmitter<any>).emit(event);
  }

  _onShow() {
    this.onShow.emit();
  }

  _onHide() {
    this.onHide.emit();
  }

  _onClear() {
    this.onClear.emit();
    this.onModelChange(null);
  }

  getId() {
    return 'id' + Math.random().toString(16).slice(2);
  }

  isInvalid() {
    if (this.ngControl) {
      const control = this.ngControl.control;
      return (!this.disabled && (control.touched || control.dirty) && control.invalid);
    }
    return false
  }

  hasError(type: string): boolean {
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

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}

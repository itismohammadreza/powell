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
import {takeUntil} from "rxjs";
import {AsyncEvent, CssObject, InputVariant, Size, Validation} from '@powell/models';
import {DestroyService} from "@powell/utils";
import {$CheckboxChangeEvent, $uuid} from "@powell/primeng";
import {TemplateDirective} from "@powell/directives/template";
import {ConfigService} from "@powell/api";

@Component({
  selector: 'pw-checkbox',
  templateUrl: './checkbox.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxComponent),
      multi: true
    },
    DestroyService
  ],
  standalone: false
})
export class CheckboxComponent implements OnInit, AfterContentInit, ControlValueAccessor {
  private cd = inject(ChangeDetectorRef);
  private injector = inject(Injector);
  private configService = inject(ConfigService);
  private destroy$ = inject(DestroyService);

  @Input() value: Optional<SafeAny>;
  @Input() label: Optional<string>;
  @Input() hint: Optional<string>;
  @Input() rtl: Optional<boolean>;
  @Input() showRequiredStar: Optional<boolean>;
  @Input() validation: Optional<Validation>;
  @Input() onLabel: Optional<string>;
  @Input() offLabel: Optional<string>;
  @Input() async: boolean = false;
  @Input() showAsyncLoading: boolean = true;
  @Input() followConfig: Optional<boolean>;
  @Input() loading: boolean = false;
  // native properties
  @Input() name: Optional<string>;
  @Input() disabled: boolean = false;
  @Input() binary: boolean = true;
  @Input() ariaLabelledBy: Optional<string>;
  @Input() ariaLabel: Optional<string>;
  @Input() tabindex: Optional<number>;
  @Input() inputId: string = $uuid();
  @Input() inputStyle: Optional<CssObject>;
  @Input() inputClass: Optional<string>;
  @Input() indeterminate: boolean = false;
  @Input() checkboxIcon: Optional<string>;
  @Input() readonly: boolean = false;
  @Input() autofocus: boolean = false;
  @Input() trueValue: SafeAny = true;
  @Input() falseValue: SafeAny = false;
  @Input() variant: Optional<InputVariant>;
  @Input() size: Optional<Size>;
  @Output() onChange = new EventEmitter<$CheckboxChangeEvent>();
  @Output() onFocus = new EventEmitter<Event>();
  @Output() onBlur = new EventEmitter<Event>();
  @Output() onChangeAsync = new EventEmitter<AsyncEvent<$CheckboxChangeEvent>>();
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
    this.setLabel();
    this.configService.configureComponent(this, true);
  }

  ngAfterContentInit() {
    this.templates?.forEach(item => {
      const name = item.type;
      this.templateMap[name] = item.templateRef;
    });
  }

  setLabel() {
    if (this.onLabel && this.offLabel) {
      if (this.value) {
        this.label = this.onLabel;
      } else {
        this.label = this.offLabel;
      }
    }
  }

  _onChange(event: $CheckboxChangeEvent) {
    this.value = event.checked;
    if (this.async) {
      this.loading = true;
      this.disabled = true;
      this.cd.detectChanges();
      this.onChangeAsync.emit({loadingCallback: this.removeLoading, event});
    } else {
      this.onModelChange(event.checked);
      this.onChange.emit(event);
      this.setLabel();
    }
  }

  _onBlur(event: Event) {
    this.onBlur.emit(event);
    this.onModelTouched();
  }

  _onFocus(event: Event) {
    this.onFocus.emit(event);
  }

  removeLoading = (ok: boolean = true) => {
    this.loading = false;
    this.disabled = false;
    if (!ok) {
      this.value = !this.value;
    }
    this.onModelChange(this.value);
    this.setLabel();
  };

  writeValue(value: SafeAny) {
    this.value = value;
    this.setLabel();
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

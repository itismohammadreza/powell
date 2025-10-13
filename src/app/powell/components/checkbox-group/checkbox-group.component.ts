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
  CheckboxGroupChangeEvent,
  CssObject,
  FixLabelPosition,
  InputVariant,
  Orientation,
  Size,
  Validation
} from '@powell/models';
import {DestroyService} from "@powell/utils";
import {$CheckboxChangeEvent, $uuid} from "@powell/primeng";
import {TemplateDirective} from "@powell/directives/template";
import {ConfigService} from "@powell/api";

@Component({
  selector: 'pw-checkbox-group',
  templateUrl: './checkbox-group.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxGroupComponent),
      multi: true
    },
    DestroyService
  ],
  standalone: false
})
export class CheckboxGroupComponent implements OnInit, AfterContentInit, ControlValueAccessor {
  private cd = inject(ChangeDetectorRef);
  private injector = inject(Injector);
  private configService = inject(ConfigService);
  private destroy$ = inject(DestroyService);

  @Input() value: Optional<SafeAny[]>;
  @Input() label: Optional<string>;
  @Input() labelWidth: Optional<number>;
  @Input() hint: Optional<string>;
  @Input() rtl: boolean = false;
  @Input() showRequiredStar: boolean = false;
  @Input() labelPosition: Optional<FixLabelPosition>;
  @Input() validation: Optional<Validation>;
  @Input() followConfig: boolean = false;
  @Input() options: Optional<SafeAny[]>;
  @Input() optionLabel: string = 'label';
  @Input() optionValue: string = 'value';
  @Input() optionDisabled: string = 'disabled';
  @Input() orientation: Orientation = 'vertical';
  @Input() groupName: string = $uuid();
  @Input() id: string = $uuid();

  // native properties
  @Input() set disabled(disabled: boolean) {
    this._disabled = disabled;
    this.options?.forEach(option => {
      option[this.optionDisabled] = disabled;
    })
  };

  get disabled() {
    return this._disabled;
  }

  @Input() ariaLabelledBy: Optional<string>;
  @Input() ariaLabel: Optional<string>;
  @Input() inputStyle: Optional<CssObject>;
  @Input() inputClass: Optional<string>;
  @Input() checkboxIcon: Optional<string>;
  @Input() readonly: boolean = false;
  @Input() autofocus: boolean = false;
  @Input() variant: Optional<InputVariant>;
  @Input() size: Optional<Size>;
  @Output() onChange = new EventEmitter<CheckboxGroupChangeEvent>();
  @Output() onFocus = new EventEmitter<Event>();
  @Output() onBlur = new EventEmitter<Event>();
  @ContentChildren(TemplateDirective) templates: Optional<QueryList<TemplateDirective>>;

  templateMap: Record<string, TemplateRef<SafeAny>> = {};
  _disabled: boolean = false;
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
    this.configService.configureComponent(this, true);
  }

  ngAfterContentInit() {
    this.templates?.forEach(item => {
      const name = item.type;
      this.templateMap[name] = item.templateRef;
    });
  }

  _onChange(event: $CheckboxChangeEvent) {
    this.value = event.checked;
    this.onChange.emit({originalEvent: event.originalEvent!, value: this.value!});
    this.onModelChange(this.value);
  }

  _onBlur(event: Event) {
    this.onBlur.emit(event);
    this.onModelTouched();
  }

  _onFocus(event: Event) {
    this.onFocus.emit(event);
  }

  writeValue(value: string[]) {
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

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
import {CssObject, InputVariant, LabelPosition, Size, Validation} from '@powell/models';
import {TemplateDirective} from '@powell/directives/template';
import {DestroyService} from "@powell/utils";
import {
  $CascadeSelectBeforeHideEvent,
  $CascadeSelectBeforeShowEvent,
  $CascadeSelectHideEvent,
  $CascadeSelectShowEvent,
  $OverlayOptions,
  $uuid
} from "@powell/primeng";
import {ConfigService} from "@powell/api";

@Component({
  selector: 'pw-cascade-select',
  templateUrl: './cascade-select.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CascadeSelectComponent),
      multi: true
    },
    DestroyService
  ],
  standalone: false
})
export class CascadeSelectComponent implements OnInit, AfterContentInit, ControlValueAccessor {
  private cd = inject(ChangeDetectorRef);
  private injector = inject(Injector);
  private configService = inject(ConfigService);
  private destroy$ = inject(DestroyService);

  @Input() value: Optional<SafeAny>;
  @Input() label: Optional<string>;
  @Input() labelWidth: Optional<number>;
  @Input() hint: Optional<string>;
  @Input() rtl: Optional<boolean>;
  @Input() showRequiredStar: Optional<boolean>;
  @Input() labelPosition: Optional<LabelPosition>;
  @Input() validation: Optional<Validation>;
  @Input() followConfig: Optional<boolean>;
  // native properties
  @Input() required: boolean = false;
  @Input() disabled: boolean = false;
  @Input() name: Optional<string>;
  @Input() id: Optional<string>;
  @Input() searchMessage: string = '{0} results are available';
  @Input() emptyMessage: Optional<string>;
  @Input() selectionMessage: string = '{0} items selected';
  @Input() emptySearchMessage: string = 'No available options';
  @Input() emptySelectionMessage: string = 'No selected item';
  @Input() searchLocale: Optional<string>;
  @Input() optionDisabled: Optional<SafeAny>;
  @Input() focusOnHover: boolean = true;
  @Input() selectOnFocus: boolean = false;
  @Input() autoOptionFocus: boolean = false;
  @Input() options: Optional<SafeAny[]>;
  @Input() optionLabel: Optional<string>;
  @Input() optionValue: Optional<string>;
  @Input() optionGroupLabel: Optional<string>;
  @Input() optionGroupChildren: Optional<string | string[]>;
  @Input() placeholder: Optional<string>;
  @Input() dataKey: Optional<string>;
  @Input() inputId: string = $uuid();
  @Input() tabindex: Optional<number>;
  @Input() ariaLabelledBy: Optional<string>;
  @Input() inputLabel: Optional<string>;
  @Input() ariaLabel: Optional<string>;
  @Input() showClear: boolean = false;
  @Input() panelStyleClass: Optional<string>;
  @Input() panelStyle: Optional<CssObject>;
  @Input() overlayOptions: Optional<$OverlayOptions>;
  @Input() autofocus: boolean = false;
  @Input() loading: boolean = false;
  @Input() loadingIcon: Optional<string>;
  @Input() breakpoint: string = '960px';
  @Input() size: Optional<Size>;
  @Input() variant: Optional<InputVariant>;
  @Input() fluid: boolean = false;
  @Input() appendTo: Optional<SafeAny>;
  @Output() onChange = new EventEmitter<SafeAny>();
  @Output() onGroupChange = new EventEmitter<Event>();
  @Output() onShow = new EventEmitter<$CascadeSelectShowEvent>();
  @Output() onHide = new EventEmitter<$CascadeSelectHideEvent>();
  @Output() onClear = new EventEmitter<void>();
  @Output() onBeforeShow = new EventEmitter<$CascadeSelectBeforeShowEvent>();
  @Output() onBeforeHide = new EventEmitter<$CascadeSelectBeforeHideEvent>();
  @Output() onFocus = new EventEmitter<FocusEvent>();
  @Output() onBlur = new EventEmitter<FocusEvent>();
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

  _onChange(event: SafeAny) {
    this.onChange.emit(event);
    this.onModelChange(event.value);
  }

  _onBlur(event: FocusEvent) {
    this.onBlur.emit(event);
    this.onModelTouched();
  }

  emitter(key: keyof this, event: SafeAny) {
    (this[key] as EventEmitter<SafeAny>).emit(event);
  }

  _onClear() {
    this.onClear.emit();
    this.onModelChange(null);
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

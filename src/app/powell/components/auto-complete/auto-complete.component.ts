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
import {
  AutoCompleteDropdownMode,
  CssObject,
  InputType,
  InputVariant,
  LabelPosition,
  Size,
  Validation
} from '@powell/models';
import {TemplateDirective} from '@powell/directives/template';
import {
  $AutoCompleteCompleteEvent,
  $AutoCompleteDropdownClickEvent,
  $AutoCompleteLazyLoadEvent,
  $AutoCompleteSelectEvent,
  $AutoCompleteUnselectEvent,
  $OverlayOptions,
  $ScrollerOptions,
  $uuid
} from "@powell/primeng";
import {DestroyService} from "@powell/utils";
import {ConfigService} from "@powell/api";

@Component({
  selector: 'pw-auto-complete',
  templateUrl: './auto-complete.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AutoCompleteComponent),
      multi: true
    },
    DestroyService
  ],
  standalone: false
})
export class AutoCompleteComponent implements OnInit, AfterContentInit, ControlValueAccessor {
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
  @Input() minLength: number = 1;
  @Input() delay: number = 300;
  @Input() style: Optional<CssObject>;
  @Input() panelStyle: Optional<CssObject>;
  @Input() styleClass: Optional<string>;
  @Input() panelStyleClass: Optional<string>;
  @Input() inputStyle: Optional<CssObject>;
  @Input() inputId: string = $uuid();
  @Input() inputStyleClass: Optional<string>;
  @Input() placeholder: Optional<string>;
  @Input() readonly: boolean = false;
  @Input() disabled: boolean = false;
  @Input() scrollHeight: string = '200px';
  @Input() lazy: boolean = false;
  @Input() virtualScroll: boolean = false;
  @Input() virtualScrollItemSize: Optional<number>;
  @Input() virtualScrollOptions: Optional<$ScrollerOptions>;
  @Input() maxlength: Optional<number>;
  @Input() name: Optional<string>;
  @Input() size: Optional<Size>;
  @Input() appendTo: Optional<any>;
  @Input() autoHighlight: boolean = false;
  @Input() forceSelection: boolean = false;
  @Input() type: InputType = 'text';
  @Input() autoZIndex: boolean = true;
  @Input() baseZIndex: number = 0;
  @Input() ariaLabel: Optional<string>;
  @Input() dropdownAriaLabel: Optional<string>;
  @Input() ariaLabelledBy: Optional<string>;
  @Input() dropdownIcon: Optional<string>;
  @Input() unique: boolean = true;
  @Input() group: boolean = false;
  @Input() completeOnFocus: boolean = false;
  @Input() showClear: boolean = false;
  @Input() dropdown: boolean = false;
  @Input() showEmptyMessage: boolean = true;
  @Input() dropdownMode: AutoCompleteDropdownMode = 'blank';
  @Input() multiple: boolean = false;
  @Input() tabindex: Optional<number>;
  @Input() dataKey: Optional<string>;
  @Input() emptyMessage: Optional<string>;
  @Input() showTransitionOptions: string = '.12s cubic-bezier(0, 0, 0.2, 1)';
  @Input() hideTransitionOptions: string = '.1s linear';
  @Input() autofocus: boolean = false;
  @Input() autocomplete: string = 'off';
  @Input() optionGroupChildren: string = 'items';
  @Input() optionGroupLabel: string = 'label';
  @Input() overlayOptions: Optional<$OverlayOptions>;
  @Input() suggestions: Optional<SafeAny[]>;
  @Input() optionLabel: Optional<string | ((item: SafeAny) => string)>;
  @Input() optionValue: Optional<string | ((item: SafeAny) => string)>;
  @Input() id: Optional<string>;
  @Input() searchMessage: Optional<string>;
  @Input() emptySelectionMessage: Optional<string>;
  @Input() selectionMessage: Optional<string>;
  @Input() autoOptionFocus: boolean = false;
  @Input() selectOnFocus: boolean = false;
  @Input() searchLocale: boolean = false;
  @Input() optionDisabled: Optional<string | Fn<SafeAny>>;
  @Input() focusOnHover: boolean = true;
  @Input() variant: Optional<InputVariant>;
  @Input() fluid: boolean = false;
  @Output() completeMethod = new EventEmitter<$AutoCompleteCompleteEvent>();
  @Output() onSelect = new EventEmitter<$AutoCompleteSelectEvent>();
  @Output() onUnselect = new EventEmitter<$AutoCompleteUnselectEvent>();
  @Output() onFocus = new EventEmitter<Event>();
  @Output() onBlur = new EventEmitter<Event>();
  @Output() onDropdownClick = new EventEmitter<$AutoCompleteDropdownClickEvent>();
  @Output() onClear = new EventEmitter();
  @Output() onKeyUp = new EventEmitter<KeyboardEvent>();
  @Output() onShow = new EventEmitter<Event>();
  @Output() onHide = new EventEmitter<Event>();
  @Output() onLazyLoad = new EventEmitter<$AutoCompleteLazyLoadEvent>();
  @ContentChildren(TemplateDirective) templates: Optional<QueryList<TemplateDirective>>;

  ngControl: Nullable<NgControl> = null;
  templateMap: Record<string, TemplateRef<any>> = {};
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

  _onBlur(event: Event) {
    this.onBlur.emit(event);
    this.onModelTouched();
  }

  _onKeyUp(event: KeyboardEvent) {
    const inputElement = event.target as HTMLInputElement;
    this.onKeyUp.emit(event);
    if (!this.forceSelection) {
      this.onModelChange(inputElement.value);
    }
  }

  _onSelect(event: any) {
    this.onSelect.emit(event);
    this.onModelChange(this.value);
  }

  _onUnselect(event: any) {
    this.onUnselect.emit(event);
    this.onModelChange(this.value);
  }

  _onClear() {
    this.onClear.emit();
    this.onModelChange(null);
  }

  emitter(key: keyof this, event: SafeAny) {
    (this[key] as EventEmitter<SafeAny>).emit(event);
  }

  writeValue(value: any) {
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

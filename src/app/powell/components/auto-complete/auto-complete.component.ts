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

  @Input() value: any;
  @Input() label: string;
  @Input() labelWidth: number;
  @Input() hint: string;
  @Input() rtl: boolean;
  @Input() showRequiredStar: boolean;
  @Input() labelPosition: LabelPosition;
  @Input() validation: Validation;
  @Input() followConfig: boolean;
  // native properties
  @Input() minLength: number = 1;
  @Input() delay: number = 300;
  @Input() style: CssObject;
  @Input() panelStyle: CssObject;
  @Input() styleClass: string;
  @Input() panelStyleClass: string;
  @Input() inputStyle: CssObject;
  @Input() inputId: string = $uuid();
  @Input() inputStyleClass: string;
  @Input() placeholder: string;
  @Input() readonly: boolean = false;
  @Input() disabled: boolean;
  @Input() scrollHeight: string = '200px';
  @Input() lazy: boolean = false;
  @Input() virtualScroll: boolean = false;
  @Input() virtualScrollItemSize: number;
  @Input() virtualScrollOptions: $ScrollerOptions;
  @Input() maxlength: number;
  @Input() name: string;
  @Input() size: Size;
  @Input() appendTo: any;
  @Input() autoHighlight: boolean = false;
  @Input() forceSelection: boolean = false;
  @Input() type: InputType = 'text';
  @Input() autoZIndex: boolean = true;
  @Input() baseZIndex: number = 0;
  @Input() ariaLabel: string;
  @Input() dropdownAriaLabel: string;
  @Input() ariaLabelledBy: string;
  @Input() dropdownIcon: string;
  @Input() unique: boolean = true;
  @Input() group: boolean = false;
  @Input() completeOnFocus: boolean = false;
  @Input() showClear: boolean = false;
  @Input() dropdown: boolean = false;
  @Input() showEmptyMessage: boolean = true;
  @Input() dropdownMode: AutoCompleteDropdownMode = 'blank';
  @Input() multiple: boolean = false;
  @Input() tabindex: number;
  @Input() dataKey: string;
  @Input() emptyMessage: string;
  @Input() showTransitionOptions: string = '.12s cubic-bezier(0, 0, 0.2, 1)';
  @Input() hideTransitionOptions: string = '.1s linear';
  @Input() autofocus: boolean = false;
  @Input() autocomplete: string = 'off';
  @Input() optionGroupChildren: string = 'items';
  @Input() optionGroupLabel: string = 'label';
  @Input() overlayOptions: $OverlayOptions;
  @Input() suggestions: any[];
  @Input() optionLabel: string | ((item: any) => string);
  @Input() optionValue: string | ((item: any) => string);
  @Input() id: string;
  @Input() searchMessage: string;
  @Input() emptySelectionMessage: string;
  @Input() selectionMessage: string;
  @Input() autoOptionFocus: boolean = false;
  @Input() selectOnFocus: boolean = false;
  @Input() searchLocale: boolean = false;
  @Input() optionDisabled: string;
  @Input() focusOnHover: boolean = true;
  @Input() variant: InputVariant;
  @Input() fluid: boolean;
  @Output() completeMethod = new EventEmitter<$AutoCompleteCompleteEvent>();
  @Output() onSelect = new EventEmitter<$AutoCompleteSelectEvent>();
  @Output() onUnselect = new EventEmitter<$AutoCompleteUnselectEvent>();
  @Output() onFocus = new EventEmitter<Event>();
  @Output() onBlur = new EventEmitter<Event>();
  @Output() onDropdownClick = new EventEmitter<$AutoCompleteDropdownClickEvent>();
  @Output() onClear = new EventEmitter<Event>();
  @Output() onKeyUp = new EventEmitter<KeyboardEvent>();
  @Output() onShow = new EventEmitter<Event>();
  @Output() onHide = new EventEmitter<Event>();
  @Output() onLazyLoad = new EventEmitter<$AutoCompleteLazyLoadEvent>();
  @ContentChildren(TemplateDirective) templates: QueryList<TemplateDirective>;

  ngControl: NgControl;
  templateMap: Record<string, TemplateRef<any>> = {};
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
    this.configService.configureComponent(this);
  }

  ngAfterContentInit() {
    this.templates.forEach(item => {
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

  _onClear(event: Event) {
    this.onClear.emit(event);
    this.onModelChange(null);
  }

  emitter(name: string, event: any) {
    (this[name] as EventEmitter<any>).emit(event);
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

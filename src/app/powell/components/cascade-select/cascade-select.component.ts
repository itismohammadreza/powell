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
  @Input() id: string;
  @Input() selectOnFocus: boolean = false;
  @Input() searchMessage: string = '{0} results are available';
  @Input() emptyMessage: string;
  @Input() selectionMessage: string = '{0} items selected';
  @Input() emptySearchMessage: string = 'No available options';
  @Input() emptySelectionMessage: string = 'No selected item';
  @Input() searchLocale: string;
  @Input() optionDisabled: any;
  @Input() autoOptionFocus: boolean = true;
  @Input() styleClass: string;
  @Input() style: CssObject;
  @Input() options: any[];
  @Input() optionLabel: string;
  @Input() optionValue: string;
  @Input() optionGroupLabel: string;
  @Input() optionGroupChildren: string[] | string;
  @Input() placeholder: string;
  @Input() dataKey: string;
  @Input() inputId: string = $uuid();
  @Input() size: Size;
  @Input() tabindex: number;
  @Input() ariaLabelledBy: string;
  @Input() inputLabel: string;
  @Input() ariaLabel: string;
  @Input() appendTo: any;
  @Input() disabled: boolean;
  @Input() showClear: boolean = false;
  @Input() panelStyleClass: string;
  @Input() panelStyle: CssObject;
  @Input() overlayOptions: $OverlayOptions;
  @Input() autofocus: boolean = false;
  @Input() variant: InputVariant;
  @Input() loading: false;
  @Input() loadingIcon: string;
  @Input() fluid: boolean;
  @Input() breakpoint: string = '960px';
  @Output() onChange = new EventEmitter<any>();
  @Output() onGroupChange = new EventEmitter<Event>();
  @Output() onShow = new EventEmitter<$CascadeSelectShowEvent>();
  @Output() onHide = new EventEmitter<$CascadeSelectHideEvent>();
  @Output() onClear = new EventEmitter<void>();
  @Output() onBeforeShow = new EventEmitter<$CascadeSelectBeforeShowEvent>();
  @Output() onBeforeHide = new EventEmitter<$CascadeSelectBeforeHideEvent>();
  @Output() onFocus = new EventEmitter<FocusEvent>();
  @Output() onBlur = new EventEmitter<FocusEvent>();
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

  _onChange(event: any) {
    this.onChange.emit(event);
    this.onModelChange(event.value);
  }

  _onBlur(event: FocusEvent) {
    this.onBlur.emit(event);
    this.onModelTouched();
  }

  emitter(name: string, event: any) {
    (this[name] as EventEmitter<any>).emit(event);
  }

  _onClear() {
    this.onClear.emit();
    this.onModelChange(null);
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

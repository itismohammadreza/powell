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
import {CdkDragDrop} from '@angular/cdk/drag-drop';
import {takeUntil} from "rxjs";
import {CssObject, FixLabelPosition, Validation} from '@powell/models';
import {TemplateDirective} from '@powell/directives/template';
import {DestroyService} from "@powell/utils";
import {
  $ListboxChangeEvent,
  $ListboxClickEvent,
  $ListboxDoubleClickEvent,
  $ListboxFilterEvent,
  $ListboxSelectAllChangeEvent,
  $ScrollerLazyLoadEvent,
  $ScrollerOptions
} from "@powell/primeng";
import {ConfigService} from "@powell/api";

@Component({
  selector: 'pw-listbox',
  templateUrl: './listbox.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ListboxComponent),
      multi: true
    },
    DestroyService
  ],
  standalone: false
})
export class ListboxComponent implements OnInit, AfterContentInit, ControlValueAccessor {
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
  @Input() labelPosition: Optional<FixLabelPosition>;
  @Input() validation: Optional<Validation>;
  @Input() followConfig: boolean = false;
  // native properties
  @Input() required: boolean = false;
  @Input() disabled: boolean = false;
  @Input() name: Optional<string>;
  @Input() id: Optional<string>;
  @Input() searchMessage: string = '{0} results are available';
  @Input() emptySelectionMessage: string = 'No selected item';
  @Input() selectionMessage: string = '{0} items selected';
  @Input() autoOptionFocus: boolean = true;
  @Input() ariaLabel: Optional<string>;
  @Input() selectOnFocus: boolean = false;
  @Input() searchLocale: boolean = false;
  @Input() focusOnHover: boolean = true;
  @Input() filterMessage: Optional<string>;
  @Input() filterFields: Optional<SafeAny[]>;
  @Input() lazy: boolean = false;
  @Input() virtualScroll: boolean = false;
  @Input() virtualScrollItemSize: Optional<number>;
  @Input() virtualScrollOptions: Optional<$ScrollerOptions>;
  @Input() scrollHeight: string = '14rem';
  @Input() tabindex: Optional<number>;
  @Input() multiple: boolean = false;
  @Input() listStyle: Optional<CssObject>;
  @Input() listStyleClass: Optional<string>;
  @Input() readonly: boolean = false;
  @Input() checkbox: boolean = false;
  @Input() filter: boolean = false;
  @Input() filterBy: Optional<string>;
  @Input() filterMatchMode: string = 'contains';
  @Input() filterLocale: Optional<string>;
  @Input() metaKeySelection: boolean = false;
  @Input() dataKey: Optional<string>;
  @Input() showToggleAll: boolean = true;
  @Input() optionLabel: Optional<string>;
  @Input() optionValue: Optional<string>;
  @Input() optionGroupChildren: string = 'items';
  @Input() optionGroupLabel: string = 'label';
  @Input() optionDisabled: Optional<string | Fn>;
  @Input() ariaFilterLabel: Optional<string>;
  @Input() filterPlaceHolder: Optional<string>;
  @Input() emptyFilterMessage: Optional<string>;
  @Input() emptyMessage: Optional<string>;
  @Input() group: boolean = false;
  @Input() options: Optional<SafeAny[]>;
  @Input() filterValue: Optional<string>;
  @Input() selectAll: Optional<boolean>;
  @Input() striped: boolean = false;
  @Input() highlightOnSelect: boolean = true;
  @Input() checkmark: boolean = false;
  @Input() dragdrop: boolean = false;
  @Input() dropListData: Optional<SafeAny[]>;
  @Input() fluid: boolean = false;
  @Output() onChange = new EventEmitter<$ListboxChangeEvent>();
  @Output() onClick = new EventEmitter<$ListboxClickEvent>();
  @Output() onDblClick = new EventEmitter<$ListboxDoubleClickEvent>();
  @Output() onFilter = new EventEmitter<$ListboxFilterEvent>();
  @Output() onFocus = new EventEmitter<FocusEvent>();
  @Output() onBlur = new EventEmitter<FocusEvent>();
  @Output() onSelectAllChange = new EventEmitter<$ListboxSelectAllChangeEvent>();
  @Output() onLazyLoad = new EventEmitter<$ScrollerLazyLoadEvent>();
  @Output() onDrop = new EventEmitter<CdkDragDrop<string[]>>();
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
    this.configService.configureComponent(this, true);
  }

  ngAfterContentInit() {
    this.templates?.forEach(item => {
      const name = item.type;
      this.templateMap[name] = item.templateRef;
    });
  }

  emitter(key: keyof this, event: SafeAny) {
    (this[key] as EventEmitter<SafeAny>).emit(event);
  }

  _onChange(event: $ListboxChangeEvent) {
    this.onChange.emit(event);
    this.onModelChange(event.value);
  }

  _onDblClick(event: $ListboxDoubleClickEvent) {
    this.onDblClick.emit(event);
    this.onModelChange(event.value);
  }

  _onClick(event: $ListboxClickEvent) {
    this.onClick.emit(event);
    this.onModelChange(event.value);
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

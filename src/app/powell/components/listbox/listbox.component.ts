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
import {CssObject, FilterMatchMode, FixLabelPosition, Validation} from '@powell/models';
import {TemplateDirective} from '@powell/directives/template';
import {DestroyService} from "@powell/utils";
import {
  $ListboxChangeEvent,
  $ListboxClickEvent,
  $ListboxDoubleClickEvent,
  $ListboxFilterEvent,
  $ListboxSelectAllChangeEvent,
  $ScrollerLazyLoadEvent,
  $ScrollerOptions,
  $uuid
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

  @Input() value: any;
  @Input() label: string;
  @Input() labelWidth: number;
  @Input() hint: string;
  @Input() rtl: boolean;
  @Input() showRequiredStar: boolean;
  @Input() labelPosition: FixLabelPosition;
  @Input() validation: Validation;
  @Input() followConfig: boolean;
  // native properties
  @Input() id: string = $uuid();
  @Input() searchMessage: string = '{0} results are available';
  @Input() emptySelectionMessage: string = 'No selected item';
  @Input() selectionMessage: string = '{0} items selected';
  @Input() autoOptionFocus: boolean = true;
  @Input() ariaLabel: string;
  @Input() selectOnFocus: boolean = false;
  @Input() searchLocale: boolean = false;
  @Input() focusOnHover: boolean = true;
  @Input() filterMessage: string;
  @Input() filterFields: any[];
  @Input() lazy: boolean = false;
  @Input() virtualScroll: boolean = false;
  @Input() virtualScrollItemSize: number;
  @Input() virtualScrollOptions: $ScrollerOptions;
  @Input() scrollHeight: string = '14rem';
  @Input() tabindex: number;
  @Input() multiple: boolean = false;
  @Input() style: CssObject;
  @Input() styleClass: string;
  @Input() listStyle: CssObject;
  @Input() listStyleClass: string;
  @Input() readonly: boolean = false;
  @Input() disabled: boolean;
  @Input() checkbox: boolean = false;
  @Input() filter: boolean = false;
  @Input() filterBy: string;
  @Input() filterMatchMode: FilterMatchMode = 'contains';
  @Input() filterLocale: string;
  @Input() metaKeySelection: boolean = false;
  @Input() dataKey: string;
  @Input() showToggleAll: boolean = true;
  @Input() optionLabel: string;
  @Input() optionValue: string;
  @Input() optionGroupChildren: string = 'items';
  @Input() optionGroupLabel: string = 'label';
  @Input() optionDisabled: string;
  @Input() ariaFilterLabel: string;
  @Input() filterPlaceHolder: string;
  @Input() emptyFilterMessage: string;
  @Input() emptyMessage: string;
  @Input() group: boolean = false;
  @Input() options: any[];
  @Input() filterValue: string;
  @Input() selectAll: boolean = null;
  @Input() striped: boolean = false;
  @Input() highlightOnSelect: boolean = true;
  @Input() checkmark: boolean = false;
  @Output() onChange = new EventEmitter<$ListboxChangeEvent>();
  @Output() onClick = new EventEmitter<$ListboxClickEvent>();
  @Output() onDblClick = new EventEmitter<$ListboxDoubleClickEvent>();
  @Output() onFilter = new EventEmitter<$ListboxFilterEvent>();
  @Output() onFocus = new EventEmitter<FocusEvent>();
  @Output() onBlur = new EventEmitter<FocusEvent>();
  @Output() onSelectAllChange = new EventEmitter<$ListboxSelectAllChangeEvent>();
  @Output() onLazyLoad = new EventEmitter<$ScrollerLazyLoadEvent>();
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
    this.configService.configureComponent(this, true);
  }

  ngAfterContentInit() {
    this.templates.forEach(item => {
      const name = item.type;
      this.templateMap[name] = item.templateRef;
    });
  }

  emitter(name: string, event: any) {
    (this[name] as EventEmitter<any>).emit(event);
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

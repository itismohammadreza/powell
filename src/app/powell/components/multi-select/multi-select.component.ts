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
import {
  NgAddon,
  NgChipDisplayMode,
  NgFilterMatchMode,
  NgIconPosition,
  NgLabelPosition,
  NgPosition,
  NgSize,
  NgValidation
} from '@powell/models';
import {TemplateDirective} from '@powell/directives/template';
import {
  PrimeMultiSelectBlurEvent,
  PrimeMultiSelectChangeEvent,
  PrimeMultiSelectFilterEvent,
  PrimeMultiSelectFocusEvent,
  PrimeMultiSelectLazyLoadEvent,
  PrimeMultiSelectRemoveEvent,
  PrimeScrollerOptions
} from "@powell/primeng/api";
import {DestroyService} from "@core/utils";

@Component({
  selector: 'ng-multi-select',
  templateUrl: './multi-select.component.html',
  styleUrls: ['./multi-select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MultiSelectComponent),
      multi: true
    },
    DestroyService
  ]
})
export class MultiSelectComponent implements OnInit, ControlValueAccessor, AfterContentInit {
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
  @Input() appendTo: any;
  @Input() autofocusFilter: boolean;
  @Input() autoZIndex: boolean = true;
  @Input() baseZIndex: number;
  @Input() defaultLabel: string;
  @Input() dataKey: string;
  @Input() disabled: boolean;
  @Input() displaySelectedLabel: boolean = true;
  @Input() dropdownIcon: string = 'pi pi-chevron-down';
  @Input() emptyFilterMessage: string;
  @Input() filter: boolean;
  @Input() filterMatchMode: NgFilterMatchMode = 'contains';
  @Input() filterValue: string;
  @Input() filterLocale: string = undefined;
  @Input() filterBy: string;
  @Input() filterPlaceHolder: string;
  @Input() hideTransitionOptions: string = '.1s linear';
  @Input() itemSize: number;
  @Input() maxSelectedLabels: number = 3;
  @Input() options: any[];
  @Input() optionLabel: string = 'label';
  @Input() optionValue: string = 'value';
  @Input() optionDisabled: string = 'disabled';
  @Input() optionGroupLabel: string = 'label';
  @Input() optionGroupChildren: string = 'items';
  @Input() group: boolean;
  @Input() overlayVisible: boolean;
  @Input() panelStyle: any;
  @Input() placeholder: string;
  @Input() readonly: boolean;
  @Input() emptyMessage: string;
  @Input() resetFilterOnHide: boolean;
  @Input() scrollHeight: string = '200px';
  @Input() selectedItemsLabel: string | 'ellipsis' = 'ellipsis';
  @Input() selectionLimit: number;
  @Input() showHeader: boolean = true;
  @Input() showTransitionOptions: string = '.12s cubic-bezier(0, 0, 0.2, 1)';
  @Input() showToggleAll: boolean = true;
  @Input() style: any;
  @Input() styleClass: string;
  @Input() tabindex: number;
  @Input() tooltip: any;
  @Input() tooltipStyleClass: string;
  @Input() tooltipPosition: NgPosition = 'top';
  @Input() tooltipPositionStyle: string = 'absolute';
  @Input() showClear: boolean
  @Input() virtualScroll: boolean;
  @Input() virtualScrollItemSize: number;
  @Input() virtualScrollOptions: PrimeScrollerOptions;
  @Input() lazy: boolean
  @Input() display: NgChipDisplayMode = 'comma';
  @Output() onClick = new EventEmitter<MouseEvent>();
  @Output() onChange = new EventEmitter<PrimeMultiSelectChangeEvent>();
  @Output() onRemove = new EventEmitter<PrimeMultiSelectRemoveEvent>();
  @Output() onFilter = new EventEmitter<PrimeMultiSelectFilterEvent>();
  @Output() onFocus = new EventEmitter<PrimeMultiSelectFocusEvent>();
  @Output() onBlur = new EventEmitter<PrimeMultiSelectBlurEvent>();
  @Output() onPanelShow = new EventEmitter<void>();
  @Output() onPanelHide = new EventEmitter<void>();
  @Output() onClear = new EventEmitter<void>();
  @Output() onLazyLoad = new EventEmitter<PrimeMultiSelectLazyLoadEvent>();
  @ContentChildren(TemplateDirective) templates: QueryList<TemplateDirective>;

  inputId: string;
  ngControl: NgControl;
  itemTemplate: TemplateRef<any>;
  groupTemplate: TemplateRef<any>;
  selectedItemsTemplate: TemplateRef<any>;
  headerTemplate: TemplateRef<any>;
  emptyFilterTemplate: TemplateRef<any>;
  emptyTemplate: TemplateRef<any>;
  footerTemplate: TemplateRef<any>;
  onModelChange: any = (_: any) => {
  };
  onModelTouched: any = () => {
  };

  constructor(private cd: ChangeDetectorRef,
              private injector: Injector,
              private destroy$: DestroyService) {
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
          this.itemTemplate = item.templateRef;
          break;

        case 'group':
          this.groupTemplate = item.templateRef;
          break;

        case 'selectedItems':
          this.selectedItemsTemplate = item.templateRef;
          break;

        case 'header':
          this.headerTemplate = item.templateRef;
          break;

        case 'emptyfilter':
          this.emptyFilterTemplate = item.templateRef;
          break;

        case 'empty':
          this.emptyTemplate = item.templateRef;
          break;

        case 'footer':
          this.footerTemplate = item.templateRef;
          break;
      }
    });
  }

  _onChange(event: PrimeMultiSelectChangeEvent) {
    this.onChange.emit(event);
    this.onModelChange(event.value);
  }

  _onBlur(event: PrimeMultiSelectBlurEvent) {
    this.onBlur.emit(event);
    this.onModelTouched();
  }

  _onClear() {
    this.onClear.emit();
    this.onModelChange(null);
  }

  emitter(name: string, event: any) {
    (this[name] as EventEmitter<any>).emit(event);
  }

  getId() {
    return "id" + Math.random().toString(16).slice(2)
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

  protected readonly event = event;
}

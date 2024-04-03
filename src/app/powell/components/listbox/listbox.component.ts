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
import {NgAddon, NgCssObject, NgFilterMatchMode, NgFixLabelPosition, NgValidation} from '@powell/models';
import {TemplateDirective} from '@powell/directives/template';
import {DestroyService} from "@core/utils";
import {
  PrimeListboxChangeEvent,
  PrimeListboxClickEvent,
  PrimeListboxDoubleClickEvent,
  PrimeListboxFilterEvent,
  PrimeListboxSelectAllChangeEvent,
  PrimeScrollerOptions,
  PrimeUniqueComponentId
} from "@powell/primeng/api";

@Component({
  selector: 'ng-listbox',
  templateUrl: './listbox.component.html',
  styleUrls: ['./listbox.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ListboxComponent),
      multi: true
    },
    DestroyService
  ]
})
export class ListboxComponent implements OnInit, AfterContentInit, ControlValueAccessor {
  @Input() value: any;
  @Input() label: string;
  @Input() filled: boolean;
  @Input() labelWidth: number;
  @Input() hint: string;
  @Input() rtl: boolean;
  @Input() showRequiredStar: boolean;
  @Input() labelPos: NgFixLabelPosition;
  @Input() addon: NgAddon;
  @Input() validation: NgValidation;
  @Input() disableConfigChangeEffect: boolean;
  // native properties
  @Input() id: string = PrimeUniqueComponentId();
  @Input() searchMessage: string;
  @Input() emptySelectionMessage: string;
  @Input() selectionMessage: string;
  @Input() autoOptionFocus: boolean = true;
  @Input() selectOnFocus: boolean = false;
  @Input() searchLocale: boolean = false;
  @Input() focusOnHover: boolean = false;
  @Input() filterMessage: string;
  @Input() filterFields: any[];
  @Input() lazy: boolean = false;
  @Input() virtualScroll: boolean = false;
  @Input() virtualScrollItemSize: number;
  @Input() virtualScrollOptions: PrimeScrollerOptions;
  @Input() scrollHeight: string = '200px';
  @Input() tabindex: number;
  @Input() multiple: boolean = false;
  @Input() style: NgCssObject;
  @Input() styleClass: string;
  @Input() listStyle: NgCssObject;
  @Input() listStyleClass: string;
  @Input() readonly: boolean = false;
  @Input() disabled: boolean;
  @Input() checkbox: boolean = false;
  @Input() filter: boolean = false;
  @Input() filterBy: string;
  @Input() filterMatchMode: NgFilterMatchMode = 'contains';
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
  @Input() selectAll: boolean;
  @Output() onChange = new EventEmitter<PrimeListboxChangeEvent>();
  @Output() onClick = new EventEmitter<PrimeListboxClickEvent>();
  @Output() onDblClick = new EventEmitter<PrimeListboxDoubleClickEvent>();
  @Output() onFilter = new EventEmitter<PrimeListboxFilterEvent>();
  @Output() onFocus = new EventEmitter<FocusEvent>();
  @Output() onBlur = new EventEmitter<FocusEvent>();
  @Output() onSelectAllChange = new EventEmitter<PrimeListboxSelectAllChangeEvent>();
  @ContentChildren(TemplateDirective) templates: QueryList<TemplateDirective>;

  ngControl: NgControl;
  templateMap: Record<string, TemplateRef<any>> = {};
  onModelChange: Function = () => {
  };
  onModelTouched: Function = () => {
  };

  constructor(private cd: ChangeDetectorRef,
              private injector: Injector,
              private destroy$: DestroyService) {
  }

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
  }

  ngAfterContentInit() {
    this.templates.forEach(item => {
      const name = item.getType();
      this.templateMap[name] = item.templateRef;
    });
  }

  emitter(name: string, event: any) {
    (this[name] as EventEmitter<any>).emit(event);
  }

  _onChange(event: PrimeListboxChangeEvent) {
    this.onChange.emit(event);
    this.onModelChange(event.value);
  }

  _onDblClick(event: PrimeListboxDoubleClickEvent) {
    this.onDblClick.emit(event);
    this.onModelChange(event.value);
  }

  _onClick(event: PrimeListboxClickEvent) {
    this.onClick.emit(event);
    this.onModelChange(event.value);
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
}

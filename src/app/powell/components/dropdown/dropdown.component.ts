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
  NgFilterMatchMode,
  NgIconPosition,
  NgLabelPosition,
  NgPosition,
  NgSize,
  NgValidation
} from '@powell/models';
import {TemplateDirective} from '@powell/directives/template';
import {PrimeScrollerOptions} from "@powell/primeng/api";
import {DestroyService} from "@core/utils";

@Component({
  selector: 'ng-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DropdownComponent),
      multi: true,
    },
    DestroyService
  ],
})
export class DropdownComponent implements OnInit, AfterContentInit, ControlValueAccessor {
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
  @Input() async: boolean;
  @Input() disableConfigChangeEffect: boolean;
  // native properties
  @Input() options: any[];
  @Input() optionLabel: string = 'label';
  @Input() optionValue: string = 'value';
  @Input() optionDisabled: string = 'disabled';
  @Input() optionGroupLabel: string = 'label';
  @Input() optionGroupChildren: string = 'items';
  @Input() scrollHeight: string = '200px';
  @Input() style: any;
  @Input() panelStyle: any;
  @Input() styleClass: string;
  @Input() panelStyleClass: string;
  @Input() filter: boolean;
  @Input() filterValue: string;
  @Input() filterBy: string;
  @Input() filterMatchMode: NgFilterMatchMode = 'contains';
  @Input() filterPlaceHolder: string;
  @Input() filterLocale: string;
  @Input() disabled: boolean;
  @Input() readonly: boolean;
  @Input() emptyMessage: string;
  @Input() emptyFilterMessage: string;
  @Input() editable: boolean;
  @Input() maxlength: number;
  @Input() appendTo: any;
  @Input() tabindex: any;
  @Input() placeholder: string;
  @Input() dataKey: string;
  @Input() autofocus: boolean;
  @Input() autofocusFilter: boolean;
  @Input() resetFilterOnHide: boolean;
  @Input() dropdownIcon: string = 'pi pi-chevron-down';
  @Input() autoDisplayFirst: boolean;
  @Input() group: boolean;
  @Input() showClear: boolean;
  @Input() baseZIndex: number;
  @Input() autoZIndex: boolean = true;
  @Input() showTransitionOptions: string = '.12s cubic-bezier(0, 0, 0.2, 1)';
  @Input() hideTransitionOptions: string = '.1s linear';
  @Input() tooltip: string;
  @Input() tooltipStyleClass: string;
  @Input() tooltipPosition: NgPosition = 'top';
  @Input() tooltipPositionStyle: string = 'absolute';
  @Input() virtualScroll: boolean;
  @Input() virtualScrollItemSize: number;
  @Input() virtualScrollOptions: PrimeScrollerOptions;
  @Input() lazy: boolean;
  @Output() onClick = new EventEmitter();
  @Output() onChange = new EventEmitter();
  @Output() onFilter = new EventEmitter();
  @Output() onFocus = new EventEmitter();
  @Output() onBlur = new EventEmitter();
  @Output() onShow = new EventEmitter();
  @Output() onHide = new EventEmitter();
  @Output() onClear = new EventEmitter();
  @Output() onLazyLoad = new EventEmitter();
  @Output() onChangeAsync = new EventEmitter();
  @ContentChildren(TemplateDirective) templates: QueryList<TemplateDirective>;

  inputId: string;
  ngControl: NgControl;
  itemTemplate: TemplateRef<any>;
  groupTemplate: TemplateRef<any>;
  selectedItemTemplate: TemplateRef<any>;
  headerTemplate: TemplateRef<any>;
  emptyTemplate: TemplateRef<any>;
  emptyFilterTemplate: TemplateRef<any>;
  footerTemplate: TemplateRef<any>;
  _oldIcon: string;
  _oldValue: string;
  _newValue: string;

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
    if (this.autoDisplayFirst) {
      this.onModelChange(this.options[0][this.optionValue])
    }
  }

  ngAfterContentInit() {
    this.templates.forEach((item: TemplateDirective) => {
      switch (item.getType()) {
        case 'item':
          this.itemTemplate = item.templateRef;
          break;

        case 'selectedItem':
          this.selectedItemTemplate = item.templateRef;
          break;

        case 'header':
          this.headerTemplate = item.templateRef;
          break;

        case 'footer':
          this.footerTemplate = item.templateRef;
          break;

        case 'emptyfilter':
          this.emptyFilterTemplate = item.templateRef;
          break;

        case 'empty':
          this.emptyTemplate = item.templateRef;
          break;

        case 'group':
          this.groupTemplate = item.templateRef;
          break;
      }
    });
  }

  _onChange(event) {
    if (this.async) {
      this.disabled = true;
      this._oldIcon = this.icon;
      this._oldValue = this.value;
      this._newValue = event.value;
      this.icon = 'pi pi-spinner pi-spin';
      this.onChangeAsync.emit({loadingCallback: this.removeLoading, value: event.value});
    } else {
      this.value = event.value;
      this.onChange.emit(event);
      this.onModelChange(event.value);
    }
  }

  removeLoading = (ok: boolean = true) => {
    this.icon = this._oldIcon;
    this.disabled = false;

    if (ok) {
      this.value = this._newValue;
      this.onModelChange(this.value);
    } else {
      this.value = null;
      setTimeout(() => {
        this.value = this._oldValue + '';
        this.onModelChange(this.value);
      }, 0)
    }
    this.cd.detectChanges()
  }

  _onBlur() {
    this.onBlur.emit();
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
}

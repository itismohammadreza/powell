import {
  AfterContentInit,
  AfterViewInit,
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
  NgControl,
} from '@angular/forms';
import {NgAddon, NgChipDisplayMode, NgFilterMatchMode, NgLabelPosition, NgValidation} from '@ng/models/forms';
import {NgIconPosition, NgPosition, NgSize} from '@ng/models/offset';
import {TemplateDirective} from '@ng/directives/template.directive';
import {ScrollerOptions} from "primeng/scroller";
import {NgGlobal} from "@ng/ng-global";

@Component({
  selector: 'ng-multi-select',
  templateUrl: './multi-select.component.html',
  styleUrls: ['./multi-select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MultiSelectComponent),
      multi: true,
    },
  ],
})
export class MultiSelectComponent implements OnInit, AfterViewInit, ControlValueAccessor, AfterContentInit {
  @Input() value: any;
  @Input() label: string;
  @Input() filled: boolean = NgGlobal.config.filled;
  @Input() labelWidth: number;
  @Input() hint: string;
  @Input() rtl: boolean = NgGlobal.config.rtl;
  @Input() showRequiredStar: boolean = NgGlobal.config.showRequiredStar;
  @Input() icon: string;
  @Input() labelPos: NgLabelPosition = NgGlobal.config.labelPos;
  @Input() iconPos: NgIconPosition = 'left';
  @Input() addon: NgAddon;
  @Input() validation: NgValidation;
  @Input() inputSize: NgSize = NgGlobal.config.inputSize;
  // native properties
  @Input() appendTo: any;
  @Input() autofocusFilter: boolean;
  @Input() autoZIndex: boolean = true;
  @Input() baseZIndex: number = 1000;
  @Input() defaultLabel: string = 'Choose';
  @Input() dataKey: string;
  @Input() disabled: boolean;
  @Input() displaySelectedLabel: boolean = true;
  @Input() dropdownIcon: string = 'pi pi-chevron-down';
  @Input() emptyFilterMessage: string = 'موردی وجود ندارد';
  @Input() filter: boolean = true;
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
  @Input() emptyMessage: string = 'موردی وجود ندارد';
  @Input() resetFilterOnHide: boolean;
  @Input() scrollHeight: string = '200px';
  @Input() selectedItemsLabel: string | 'ellipsis' = 'ellipsis';
  @Input() selectionLimit: number;
  @Input() showHeader: boolean = true;
  @Input() showTransitionOptions: string = '.12s cubic-bezier(0, 0, 0.2, 1)';
  @Input() showToggleAll: boolean = true;
  @Input() style: any;
  @Input() styleClass: string;
  @Input() tabindex: any;
  @Input() tooltip: any;
  @Input() tooltipStyleClass: string;
  @Input() tooltipPosition: NgPosition = 'top';
  @Input() tooltipPositionStyle: string = 'absolute';
  @Input() showClear: boolean
  @Input() virtualScroll: boolean;
  @Input() virtualScrollItemSize: number;
  @Input() virtualScrollOptions: ScrollerOptions;
  @Input() lazy: boolean
  @Input() display: NgChipDisplayMode = 'comma';
  @Output() onClick = new EventEmitter();
  @Output() onChange = new EventEmitter();
  @Output() onFilter = new EventEmitter();
  @Output() onFocus = new EventEmitter();
  @Output() onBlur = new EventEmitter();
  @Output() onPanelShow = new EventEmitter();
  @Output() onPanelHide = new EventEmitter();
  @Output() onClear = new EventEmitter();
  @Output() onLazyLoad = new EventEmitter();
  @Output() onBeforeBtnClick = new EventEmitter();
  @Output() onAfterBtnClick = new EventEmitter();
  @ContentChildren(TemplateDirective) templates: QueryList<TemplateDirective>;

  inputId: string;
  controlContainer: FormGroupDirective;
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

  constructor(private cd: ChangeDetectorRef, private injector: Injector) {
  }

  ngOnInit() {
    this.inputId = this.getId();
    let parentForm: FormGroup;
    let rootForm: FormGroupDirective;
    let currentControl: AbstractControl;
    this.controlContainer = this.injector.get(
      ControlContainer,
      null,
      {optional: true, host: true, skipSelf: true}
    ) as FormGroupDirective;
    this.ngControl = this.injector.get(NgControl, null);
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;

      currentControl = this.ngControl.control;
      if (this.controlContainer) {
        parentForm = this.controlContainer.control;
        rootForm = this.controlContainer.formDirective as FormGroupDirective;

        if (this.ngControl instanceof FormControlName) {
          currentControl = parentForm.get(this.ngControl.name.toString());
        }
        rootForm.ngSubmit.subscribe(() => {
          if (!this.disabled) {
            currentControl.markAsTouched();
          }
        });
      }
    }
  }

  ngAfterViewInit() {
    if (this.showRequiredStar && this.isRequired()) {
      if (this.label) {
        this.label += ' *';
      }
      if (this.placeholder) {
        this.placeholder += ' *';
      }
      this.cd.detectChanges();
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

  _onChange(event) {
    this.onChange.emit(event);
    this.onModelChange(event.value);
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

  hasError(type: string): boolean {
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

  isRequired(): boolean {
    if (this.ngControl) {
      const control = this.ngControl.control;
      if (control.validator) {
        const validator = control.validator({} as AbstractControl);
        if (validator && validator.required) {
          return true;
        }
      }
    }
    return false;
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

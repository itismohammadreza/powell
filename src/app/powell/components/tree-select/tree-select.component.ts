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
} from "@angular/forms";
import {takeUntil} from "rxjs";
import {
  CSSStyleDeclaration,
  NgAddon,
  NgChipDisplayMode,
  NgIconPosition,
  NgLabelPosition,
  NgSize,
  NgTreeFilterMode,
  NgTreeSelectionMode,
  NgValidation
} from '@powell/models';
import {TemplateDirective} from '@powell/directives/template';
import {DestroyService} from "@core/utils";
import {
  PrimeOverlayOnHideEvent,
  PrimeOverlayOnShowEvent,
  PrimeOverlayOptions,
  PrimeTreeNode,
  PrimeTreeNodeSelectEvent,
  PrimeTreeNodeUnSelectEvent,
  PrimeTreeSelectFilterEvent,
  PrimeTreeSelectNodeCollapseEvent,
  PrimeTreeSelectNodeExpandEvent
} from "@powell/primeng/api";

@Component({
  selector: 'ng-tree-select',
  templateUrl: './tree-select.component.html',
  styleUrls: ['./tree-select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TreeSelectComponent),
      multi: true
    },
    DestroyService
  ]
})
export class TreeSelectComponent implements OnInit, AfterContentInit, ControlValueAccessor {
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
  @Input() inputId: string = this.getId();
  @Input() scrollHeight: string = '400px';
  @Input() disabled: boolean;
  @Input() metaKeySelection: boolean = false;
  @Input() display: NgChipDisplayMode = 'comma';
  @Input() selectionMode: NgTreeSelectionMode = 'single';
  @Input() tabindex: string;
  @Input() ariaLabel: string;
  @Input() ariaLabelledBy: string;
  @Input() placeholder: string;
  @Input() panelClass: string;
  @Input() panelStyle: CSSStyleDeclaration;
  @Input() panelStyleClass: string;
  @Input() containerStyle: CSSStyleDeclaration;
  @Input() containerStyleClass: string;
  @Input() labelStyle: CSSStyleDeclaration;
  @Input() labelStyleClass: string;
  @Input() overlayOptions: PrimeOverlayOptions;
  @Input() emptyMessage: string;
  @Input() appendTo: any;
  @Input() filter: boolean = false;
  @Input() filterBy: string = 'label';
  @Input() filterMode: NgTreeFilterMode = 'lenient';
  @Input() filterPlaceholder: string;
  @Input() filterLocale: string;
  @Input() filterInputAutoFocus: boolean = true;
  @Input() propagateSelectionDown: boolean = true;
  @Input() propagateSelectionUp: boolean = true;
  @Input() showClear: boolean = false;
  @Input() resetFilterOnHide: boolean = true;
  @Input() options: PrimeTreeNode<any>[];
  @Input() showTransitionOptions: string;
  @Input() hideTransitionOptions: string;
  @Output() onNodeExpand = new EventEmitter<PrimeTreeSelectNodeExpandEvent>();
  @Output() onNodeCollapse = new EventEmitter<PrimeTreeSelectNodeCollapseEvent>();
  @Output() onShow = new EventEmitter<PrimeOverlayOnShowEvent>();
  @Output() onHide = new EventEmitter<PrimeOverlayOnHideEvent>();
  @Output() onClear = new EventEmitter<void>();
  @Output() onFilter = new EventEmitter<PrimeTreeSelectFilterEvent>();
  @Output() onNodeUnselect = new EventEmitter<PrimeTreeNodeUnSelectEvent>();
  @Output() onNodeSelect = new EventEmitter<PrimeTreeNodeSelectEvent>();
  @ContentChildren(TemplateDirective) templates: QueryList<TemplateDirective>;

  ngControl: NgControl;
  valueTemplate: TemplateRef<any>;
  headerTemplate: TemplateRef<any>;
  emptyTemplate: TemplateRef<any>;
  footerTemplate: TemplateRef<any>;
  clearIconTemplate: TemplateRef<any>;
  triggerIconTemplate: TemplateRef<any>;
  filterIconTemplate: TemplateRef<any>;
  closeIconTemplate: TemplateRef<any>;
  itemTogglerIconTemplate: TemplateRef<any>;
  itemCheckboxIconTemplate: TemplateRef<any>;
  itemLoadingIconTemplate: TemplateRef<any>;
  onModelChange: any = (_: any) => {
  };
  onModelTouched: any = () => {
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
    this.templates.forEach((item: TemplateDirective) => {
      switch (item.getType()) {
        case 'value':
          this.valueTemplate = item.templateRef;
          break;

        case 'header':
          this.headerTemplate = item.templateRef;
          break;

        case 'empty':
          this.emptyTemplate = item.templateRef;
          break;

        case 'footer':
          this.footerTemplate = item.templateRef;
          break;

        case 'clearicon':
          this.clearIconTemplate = item.templateRef;
          break;

        case 'triggericon':
          this.triggerIconTemplate = item.templateRef;
          break;

        case 'filtericon':
          this.filterIconTemplate = item.templateRef;
          break;

        case 'closeicon':
          this.closeIconTemplate = item.templateRef;
          break;

        case 'itemtogglericon':
          this.itemTogglerIconTemplate = item.templateRef;
          break;

        case 'itemcheckboxicon':
          this.itemCheckboxIconTemplate = item.templateRef;
          break;

        case 'itemloadingicon':
          this.itemLoadingIconTemplate = item.templateRef;
          break;
      }
    });
  }

  _onNodeSelect(event: PrimeTreeNodeSelectEvent) {
    this.onNodeSelect.emit(event);
    this.onModelChange(this.value);
  }

  _onNodeUnselect(event: PrimeTreeNodeUnSelectEvent) {
    this.onNodeUnselect.emit(event);
    this.onModelChange(this.value);
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

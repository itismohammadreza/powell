import {
  AfterContentInit,
  ChangeDetectionStrategy,
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
import {TemplateDirective} from '@powell/directives/template';
import {NgAddon, NgFixLabelPosition, NgOrientation, NgSelectionMode, NgTreeFilterMode, NgValidation} from '@powell/models';
import {PrimeContextMenu} from "@powell/primeng";
import {PrimeScrollerOptions} from "@powell/primeng/api";
import {ConfigHandler} from "@powell/api";

@Component({
  selector: 'ng-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TreeComponent),
      multi: true
    }
  ]
})
export class TreeComponent extends ConfigHandler implements OnInit, AfterContentInit, ControlValueAccessor {
  @Input() label: string;
  @Input() labelWidth: number;
  @Input() hint: string;
  @Input() rtl: boolean;
  @Input() showRequiredStar: boolean;
  @Input() labelPos: NgFixLabelPosition;
  @Input() addon: NgAddon;
  @Input() validation: NgValidation;
  @Input() disableConfigChangeEffect: boolean;
  // native properties
  @Input() items: any[];
  @Input() selectionMode: NgSelectionMode;
  @Input() selection: any;
  @Input() style: string;
  @Input() styleClass: string;
  @Input() contextMenu: PrimeContextMenu;
  @Input() layout: NgOrientation = 'vertical';
  @Input() draggableScope: string | string[];
  @Input() droppableScope: string | string[];
  @Input() draggableNodes: boolean;
  @Input() droppableNodes: boolean;
  @Input() metaKeySelection: boolean = true;
  @Input() propagateSelectionUp: boolean = true;
  @Input() propagateSelectionDown: boolean = true;
  @Input() loading: boolean;
  @Input() loadingIcon: string = 'pi pi-spinner';
  @Input() emptyMessage: string = 'موردی وجود ندارد';
  @Input() validateDrop: boolean;
  @Input() filter: boolean;
  @Input() filterBy: string = "label";
  @Input() filterMode: NgTreeFilterMode = 'lenient';
  @Input() filterPlaceHolder: string;
  @Input() filterLocale: string;
  @Input() scrollHeight: string;
  @Input() virtualScroll: boolean;
  @Input() virtualScrollItemSize: number;
  @Input() virtualScrollOptions: PrimeScrollerOptions;
  @Input() lazy: boolean;
  @Input() trackBy: Function;
  @Input() indentation: number = 1.5;
  @Output() onAfterBtnClick = new EventEmitter();
  @Output() onBeforeBtnClick = new EventEmitter();
  @Output() onNodeSelect = new EventEmitter();
  @Output() onNodeUnselect = new EventEmitter();
  @Output() onNodeExpand = new EventEmitter();
  @Output() onNodeCollapse = new EventEmitter();
  @Output() onNodeContextMenuSelect = new EventEmitter();
  @Output() onNodeDrop = new EventEmitter();
  @Output() onFilter = new EventEmitter();
  @Output() onLazyLoad = new EventEmitter();
  @Output() onScroll = new EventEmitter();
  @Output() onScrollIndexChange = new EventEmitter();
  @Output() selectionChange = new EventEmitter();
  @ContentChildren(TemplateDirective) templates: QueryList<TemplateDirective>;

  inputId: string;
  controlContainer: FormGroupDirective;
  ngControl: NgControl;
  headerTemplate: TemplateRef<any>;
  emptyTemplate: TemplateRef<any>;
  footerTemplate: TemplateRef<any>;
  loaderTemplate: TemplateRef<any>;
  onModelChange: any = (_: any) => {
  };
  onModelTouched: any = () => {
  };

  constructor(private cd: ChangeDetectorRef, private injector: Injector) {
    super()
  }

  override ngOnInit() {
    super.ngOnInit();
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
        rootForm.ngSubmit.pipe(takeUntil(this.destroy$)).subscribe(() => {
          currentControl.markAsTouched();
        });
      }
    }
  }

  ngAfterContentInit() {
    this.templates.forEach((item: TemplateDirective) => {
      switch (item.getType()) {
        case 'header':
          this.headerTemplate = item.templateRef;
          break;

        case 'footer':
          this.footerTemplate = item.templateRef;
          break;

        case 'empty':
          this.emptyTemplate = item.templateRef;
          break;

        case 'loader':
          this.loaderTemplate = item.templateRef;
          break;
      }
    });
  }

  _onSelectionChange(event) {
    this.selection = event;
    this.selectionChange.emit(this.selection);
    this.onModelChange(this.selection);
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
      return (control.touched || control.dirty) && control.invalid;
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

  writeValue(value: any) {
    this.selection = value;
    this.cd.markForCheck();
  }

  registerOnChange(fn) {
    this.onModelChange = fn;
  }

  registerOnTouched(fn) {
    this.onModelTouched = fn;
  }
}



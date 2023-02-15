import {
  AfterContentInit,
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  EventEmitter,
  forwardRef,
  Inject,
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
  FormGroupName,
  NG_VALUE_ACCESSOR,
  NgControl,
} from '@angular/forms';
import {TemplateDirective} from '@ng/directives/template.directive';
import {NgAddon, NgFixLabelPosition, NgTreeFilterMode, NgValidation} from '@ng/models/forms';
import {ContextMenu} from 'primeng/contextmenu';
import {ScrollerOptions} from 'primeng/scroller';
import {NgOrientation, NgSelectionMode} from "@ng/models/offset";
import {NgConfig} from "@ng/models/config";

@Component({
  selector: 'ng-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TreeComponent),
      multi: true,
    },
  ],
})
export class TreeComponent implements OnInit, AfterViewInit, AfterContentInit, ControlValueAccessor {
  @Input() label: string;
  @Input() labelWidth: number;
  @Input() hint: string;
  @Input() rtl: boolean = this.ngConfig.rtl;
  @Input() showRequiredStar: boolean = true;
  @Input() labelPos: NgFixLabelPosition = this.ngConfig.defaultFixLabelPos;
  @Input() addon: NgAddon;
  @Input() validation: NgValidation;
  // native properties
  @Input() items: any[];
  @Input() selectionMode: NgSelectionMode;
  @Input() selection: any;
  @Input() style: string;
  @Input() styleClass: string;
  @Input() contextMenu: ContextMenu;
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
  @Input() virtualScrollOptions: ScrollerOptions;
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
  controlContainer: FormGroupName | FormGroupDirective;
  ngControl: NgControl;
  headerTemplate: TemplateRef<any>;
  emptyTemplate: TemplateRef<any>;
  footerTemplate: TemplateRef<any>;
  loaderTemplate: TemplateRef<any>;
  onModelChange: any = (_: any) => {
  };
  onModelTouched: any = () => {
  };

  constructor(private cd: ChangeDetectorRef, @Inject('NG_CONFIG') private ngConfig: NgConfig, private injector: Injector) {
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
          currentControl.markAsTouched();
        });
      }
    }
  }

  ngAfterViewInit() {
    if (this.showRequiredStar && this.isRequired()) {
      if (this.label) {
        this.label += ' *';
      }
      this.cd.detectChanges();
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



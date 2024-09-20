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
import {TemplateDirective} from '@powell/directives/template';
import {
  NgAddon,
  NgCssObject,
  NgFixLabelPosition,
  NgOrientation,
  NgTreeFilterMode,
  NgTreeLoadingMode,
  NgTreeSelectionMode,
  NgValidation
} from '@powell/models';
import {
  $ScrollerOptions,
  $TreeFilterEvent,
  $TreeLazyLoadEvent,
  $TreeNode,
  $TreeNodeCollapseEvent,
  $TreeNodeContextMenuSelectEvent,
  $TreeNodeDropEvent,
  $TreeNodeExpandEvent,
  $TreeNodeSelectEvent,
  $TreeNodeUnSelectEvent,
  $TreeScrollEvent,
  $TreeScrollIndexChangeEvent,
  $TreeSelectionChangeEvent,
  $UniqueComponentId
} from "@powell/primeng";
import {DestroyService} from "@core/utils";
import {ConfigService} from "@powell/api";

@Component({
  selector: 'ng-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TreeComponent),
      multi: true
    },
    DestroyService
  ]
})
export class TreeComponent implements OnInit, AfterContentInit, ControlValueAccessor {
  private cd = inject(ChangeDetectorRef);
  private injector = inject(Injector);
  private configService = inject(ConfigService);
  private destroy$ = inject(DestroyService);

  @Input() label: string;
  @Input() labelWidth: number;
  @Input() hint: string;
  @Input() rtl: boolean;
  @Input() showRequiredStar: boolean;
  @Input() labelPos: NgFixLabelPosition;
  @Input() addon: NgAddon;
  @Input() validation: NgValidation;
  @Input() followConfig: boolean;
  @Input() items: any[];
  @Input() id: string = $UniqueComponentId();
  // native properties
  @Input() selectionMode: NgTreeSelectionMode;
  @Input() loadingMode: NgTreeLoadingMode = 'mask';
  @Input() selection: any;
  @Input() style: NgCssObject;
  @Input() styleClass: string;
  @Input() contextMenu: any;
  @Input() layout: NgOrientation = 'vertical';
  @Input() draggableScope: any;
  @Input() droppableScope: any;
  @Input() draggableNodes: boolean = false;
  @Input() droppableNodes: boolean = false;
  @Input() metaKeySelection: boolean = false;
  @Input() propagateSelectionUp: boolean = true;
  @Input() propagateSelectionDown: boolean = true;
  @Input() loading: boolean = false;
  @Input() loadingIcon: string;
  @Input() emptyMessage: string;
  @Input() ariaLabel: string;
  @Input() togglerAriaLabel: string;
  @Input() ariaLabelledBy: string;
  @Input() validateDrop: boolean = false;
  @Input() filter: boolean = false;
  @Input() filterBy: string = 'label';
  @Input() filterMode: NgTreeFilterMode = 'lenient';
  @Input() filterPlaceholder: string;
  @Input() filteredNodes: $TreeNode<any>[];
  @Input() filterLocale: string;
  @Input() scrollHeight: string;
  @Input() lazy: boolean = false;
  @Input() virtualScroll: boolean = false;
  @Input() virtualScrollItemSize: number;
  @Input() virtualScrollOptions: $ScrollerOptions;
  @Input() indentation: number = 1.5;
  @Input() _templateMap: any;
  @Input() trackBy: Function;
  @Input() virtualNodeHeight: number;
  @Output() selectionChange = new EventEmitter<$TreeSelectionChangeEvent>();
  @Output() onNodeSelect = new EventEmitter<$TreeNodeSelectEvent>();
  @Output() onNodeUnselect = new EventEmitter<$TreeNodeUnSelectEvent>();
  @Output() onNodeExpand = new EventEmitter<$TreeNodeExpandEvent>();
  @Output() onNodeCollapse = new EventEmitter<$TreeNodeCollapseEvent>();
  @Output() onNodeContextMenuSelect = new EventEmitter<$TreeNodeContextMenuSelectEvent>();
  @Output() onNodeDrop = new EventEmitter<$TreeNodeDropEvent>();
  @Output() onLazyLoad = new EventEmitter<$TreeLazyLoadEvent>();
  @Output() onScroll = new EventEmitter<$TreeScrollEvent>();
  @Output() onScrollIndexChange = new EventEmitter<$TreeScrollIndexChangeEvent>();
  @Output() onFilter = new EventEmitter<$TreeFilterEvent>();
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
          currentControl.markAsTouched();
        });
      }
    }
    this.configService.applyConfigToComponent(this);
  }

  ngAfterContentInit() {
    this.templates.forEach(item => {
      const name = item.getType();
      this.templateMap[name] = item.templateRef;
    });
  }

  _onSelectionChange(event: $TreeSelectionChangeEvent) {
    this.selection = event;
    this.selectionChange.emit(this.selection);
    this.onModelChange(this.selection);
  }

  emitter(name: string, event: any) {
    (this[name] as EventEmitter<any>).emit(event);
  }

  isInvalid() {
    if (this.ngControl) {
      const control = this.ngControl.control;
      return (control.touched || control.dirty) && control.invalid;
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

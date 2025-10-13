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
import {FixLabelPosition, TreeFilterMode, TreeLoadingMode, TreeSelectionMode, Validation} from '@powell/models';
import {
  $ScrollerOptions,
  $TreeFilterEvent,
  $TreeLazyLoadEvent,
  $TreeNode,
  $TreeNodeCollapseEvent,
  $TreeNodeContextMenuSelectEvent,
  $TreeNodeDoubleClickEvent,
  $TreeNodeDropEvent,
  $TreeNodeExpandEvent,
  $TreeNodeSelectEvent,
  $TreeNodeUnSelectEvent,
  $TreeScrollEvent,
  $TreeScrollIndexChangeEvent,
  $TreeSelectionChangeEvent,
  $uuid
} from "@powell/primeng";
import {DestroyService} from "@powell/utils";
import {ConfigService} from "@powell/api";

@Component({
  selector: 'pw-tree',
  templateUrl: './tree.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TreeComponent),
      multi: true
    },
    DestroyService
  ],
  standalone: false
})
export class TreeComponent implements OnInit, AfterContentInit, ControlValueAccessor {
  private cd = inject(ChangeDetectorRef);
  private injector = inject(Injector);
  private configService = inject(ConfigService);
  private destroy$ = inject(DestroyService);

  @Input() label: Optional<string>;
  @Input() labelWidth: Optional<number>;
  @Input() hint: Optional<string>;
  @Input() rtl: boolean = false;
  @Input() showRequiredStar: boolean = false;
  @Input() labelPosition: Optional<FixLabelPosition>;
  @Input() validation: Optional<Validation>;
  @Input() followConfig: boolean = false;
  @Input() id: string = $uuid();
  // native properties
  @Input() value: Optional<SafeAny[]>;
  @Input() selectionMode: Optional<TreeSelectionMode>;
  @Input() loadingMode: TreeLoadingMode = 'mask';
  @Input() selection: SafeAny;
  @Input() contextMenu: Optional<SafeAny>;
  @Input() draggableScope: Optional<SafeAny>;
  @Input() droppableScope: Optional<SafeAny>;
  @Input() draggableNodes: boolean = false;
  @Input() droppableNodes: boolean = false;
  @Input() metaKeySelection: boolean = false;
  @Input() propagateSelectionUp: boolean = true;
  @Input() propagateSelectionDown: boolean = true;
  @Input() loading: boolean = false;
  @Input() loadingIcon: Optional<string>;
  @Input() emptyMessage: Optional<string>;
  @Input() ariaLabel: Optional<string>;
  @Input() togglerAriaLabel: Optional<string>;
  @Input() ariaLabelledBy: Optional<string>;
  @Input() validateDrop: boolean = false;
  @Input() filter: boolean = false;
  @Input() filterInputAutoFocus: boolean = false;
  @Input() filterBy: string = 'label';
  @Input() filterMode: TreeFilterMode = 'lenient';
  @Input() filterOptions: Optional<SafeAny>;
  @Input() filterPlaceholder: Optional<string>;
  @Input() filteredNodes: Optional<$TreeNode<SafeAny>[]>;
  @Input() filterLocale: Optional<string>;
  @Input() scrollHeight: Optional<string>;
  @Input() lazy: boolean = false;
  @Input() virtualScroll: boolean = false;
  @Input() virtualScrollItemSize: Optional<number>;
  @Input() virtualScrollOptions: Optional<$ScrollerOptions>;
  @Input() indentation: number = 1.5;
  @Input() _templateMap: Optional<SafeAny>;
  @Input() trackBy: Fn = (i: number, item: SafeAny) => i;
  @Input() highlightOnSelect: boolean = false;
  @Output() selectionChange = new EventEmitter<$TreeSelectionChangeEvent>();
  @Output() onNodeSelect = new EventEmitter<$TreeNodeSelectEvent>();
  @Output() onNodeUnselect = new EventEmitter<$TreeNodeUnSelectEvent>();
  @Output() onNodeExpand = new EventEmitter<$TreeNodeExpandEvent>();
  @Output() onNodeCollapse = new EventEmitter<$TreeNodeCollapseEvent>();
  @Output() onNodeContextMenuSelect = new EventEmitter<$TreeNodeContextMenuSelectEvent>();
  @Output() onNodeDoubleClick = new EventEmitter<$TreeNodeDoubleClickEvent>();
  @Output() onNodeDrop = new EventEmitter<$TreeNodeDropEvent>();
  @Output() onLazyLoad = new EventEmitter<$TreeLazyLoadEvent>();
  @Output() onScroll = new EventEmitter<$TreeScrollEvent>();
  @Output() onScrollIndexChange = new EventEmitter<$TreeScrollIndexChangeEvent>();
  @Output() onFilter = new EventEmitter<$TreeFilterEvent>();
  @ContentChildren(TemplateDirective) templates: Optional<QueryList<TemplateDirective>>;

  ngControl: Nullable<NgControl> = null;
  templateMap: Record<string, TemplateRef<SafeAny>> = {};
  onModelChange: Fn = () => {
  };
  onModelTouched: Fn = () => {
  };

  ngOnInit() {
    if ((this.selectionMode === 'multiple' || this.selectionMode === 'checkbox') && typeof this.selection == 'undefined') {
      this.selection = [];
    }
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
          currentControl.markAsTouched();
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

  _onSelectionChange(event: Nullable<$TreeSelectionChangeEvent>) {
    this.selection = event;
    this.selectionChange.emit(this.selection);
    this.onModelChange(this.selection);
  }

  emitter(key: keyof this, event: SafeAny) {
    (this[key] as EventEmitter<SafeAny>).emit(event);
  }

  writeValue(value: SafeAny) {
    this.selection = value;
    this.cd.markForCheck();
  }

  registerOnChange(fn: Fn) {
    this.onModelChange = fn;
  }

  registerOnTouched(fn: Fn) {
    this.onModelTouched = fn;
  }
}

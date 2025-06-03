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
  CssObject,
  FixLabelPosition,
  TreeFilterMode,
  TreeLoadingMode,
  TreeSelectionMode,
  Validation
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

  @Input() label: string;
  @Input() labelWidth: number;
  @Input() hint: string;
  @Input() rtl: boolean;
  @Input() showRequiredStar: boolean;
  @Input() labelPosition: FixLabelPosition;
  @Input() validation: Validation;
  @Input() followConfig: boolean;
  @Input() id: string = $uuid();
  // native properties
  @Input() items: any[];
  @Input() selectionMode: TreeSelectionMode;
  @Input() loadingMode: TreeLoadingMode = 'mask';
  @Input() selection: any;
  @Input() style: CssObject;
  @Input() styleClass: string;
  @Input() contextMenu: any;
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
  @Input() filterMode: TreeFilterMode = 'lenient';
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
  @Input() highlightOnSelect: boolean;
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
    this.configService.configureComponent(this, true);
  }

  ngAfterContentInit() {
    this.templates.forEach(item => {
      const name = item.type;
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

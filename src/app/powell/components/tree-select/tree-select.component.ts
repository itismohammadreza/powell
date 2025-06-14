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
} from "@angular/forms";
import {takeUntil} from "rxjs";
import {
  ChipDisplayMode,
  CssObject,
  InputVariant,
  LabelPosition,
  Size,
  TreeFilterMode,
  TreeSelectionMode,
  Validation
} from '@powell/models';
import {TemplateDirective} from '@powell/directives/template';
import {DestroyService} from "@powell/utils";
import {
  $OverlayOnHideEvent,
  $OverlayOnShowEvent,
  $OverlayOptions,
  $ScrollerOptions,
  $TreeNode,
  $TreeNodeSelectEvent,
  $TreeNodeUnSelectEvent,
  $TreeSelectFilterEvent,
  $TreeSelectNodeCollapseEvent,
  $TreeSelectNodeExpandEvent,
  $uuid
} from "@powell/primeng";
import {ConfigService} from "@powell/api";

@Component({
  selector: 'pw-tree-select',
  templateUrl: './tree-select.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TreeSelectComponent),
      multi: true
    },
    DestroyService
  ],
  standalone: false
})
export class TreeSelectComponent implements OnInit, AfterContentInit, ControlValueAccessor {
  private cd = inject(ChangeDetectorRef);
  private injector = inject(Injector);
  private configService = inject(ConfigService);
  private destroy$ = inject(DestroyService);

  @Input() value: any;
  @Input() label: string;
  @Input() labelWidth: number;
  @Input() hint: string;
  @Input() rtl: boolean;
  @Input() showRequiredStar: boolean;
  @Input() labelPosition: LabelPosition;
  @Input() validation: Validation;
  @Input() followConfig: boolean;
  @Input() style: CssObject;
  @Input() styleClass: string;
  // native properties
  @Input() inputId: string = $uuid();
  @Input() scrollHeight: string = '400px';
  @Input() disabled: boolean;
  @Input() metaKeySelection: boolean = false;
  @Input() variant: InputVariant;
  @Input() display: ChipDisplayMode = 'comma';
  @Input() selectionMode: TreeSelectionMode = 'single';
  @Input() tabindex: string;
  @Input() ariaLabel: string;
  @Input() ariaLabelledBy: string;
  @Input() placeholder: string;
  @Input() panelClass: string;
  @Input() panelStyle: CssObject;
  @Input() fluid: boolean;
  @Input() panelStyleClass: string;
  @Input() containerStyle: CssObject;
  @Input() containerStyleClass: string;
  @Input() labelStyle: CssObject;
  @Input() labelStyleClass: string;
  @Input() overlayOptions: $OverlayOptions;
  @Input() emptyMessage: string;
  @Input() appendTo: any;
  @Input() filter: boolean = false;
  @Input() filterBy: string = 'label';
  @Input() filterMode: TreeFilterMode = 'lenient';
  @Input() filterPlaceholder: string;
  @Input() filterLocale: string;
  @Input() filterInputAutoFocus: boolean = true;
  @Input() propagateSelectionDown: boolean = true;
  @Input() propagateSelectionUp: boolean = true;
  @Input() showClear: boolean = false;
  @Input() resetFilterOnHide: boolean = true;
  @Input() virtualScroll: boolean = false;
  @Input() virtualScrollItemSize: number;
  @Input() size: Size;
  @Input() virtualScrollOptions: $ScrollerOptions;
  @Input() autofocus: boolean = false;
  @Input() options: $TreeNode<any>[];
  @Input() loading: boolean = false;
  @Output() onNodeExpand = new EventEmitter<$TreeSelectNodeExpandEvent>();
  @Output() onNodeCollapse = new EventEmitter<$TreeSelectNodeCollapseEvent>();
  @Output() onShow = new EventEmitter<$OverlayOnShowEvent>();
  @Output() onHide = new EventEmitter<$OverlayOnHideEvent>();
  @Output() onClear = new EventEmitter<void>();
  @Output() onFilter = new EventEmitter<$TreeSelectFilterEvent>();
  @Output() onFocus = new EventEmitter<Event>();
  @Output() onBlur = new EventEmitter<Event>();
  @Output() onNodeUnselect = new EventEmitter<$TreeNodeUnSelectEvent>();
  @Output() onNodeSelect = new EventEmitter<$TreeNodeSelectEvent>();
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
          if (!this.disabled) {
            currentControl.markAsTouched();
          }
        });
      }
    }
    this.configService.configureComponent(this);
  }

  ngAfterContentInit() {
    this.templates.forEach(item => {
      const name = item.type;
      this.templateMap[name] = item.templateRef;
    });
  }

  _onNodeSelect(event: $TreeNodeSelectEvent) {
    this.onNodeSelect.emit(event);
    this.onModelChange(this.value);
  }

  _onNodeUnselect(event: $TreeNodeUnSelectEvent) {
    this.onNodeUnselect.emit(event);
    this.onModelChange(this.value);
  }

  _onClear() {
    this.onClear.emit();
    this.onModelChange(null);
  }

  _onBlur(event: Event) {
    this.onBlur.emit(event);
    this.onModelTouched();
  }

  emitter(name: string, event: any) {
    (this[name] as EventEmitter<any>).emit(event);
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

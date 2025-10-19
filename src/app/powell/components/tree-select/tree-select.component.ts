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

  @Input() value: Optional<SafeAny>;
  @Input() label: Optional<string>;
  @Input() labelWidth: Optional<number>;
  @Input() hint: Optional<string>;
  @Input() rtl: Optional<boolean>;
  @Input() showRequiredStar: Optional<boolean>;
  @Input() labelPosition: Optional<LabelPosition>;
  @Input() validation: Optional<Validation>;
  @Input() followConfig: Optional<boolean>;
  @Input() style: Optional<CssObject>;
  // native properties
  @Input() required: boolean = false;
  @Input() disabled: boolean = false;
  @Input() name: Optional<string>;
  @Input() inputId: string = $uuid();
  @Input() scrollHeight: string = '400px';
  @Input() metaKeySelection: boolean = false;
  @Input() display: ChipDisplayMode = 'comma';
  @Input() selectionMode: TreeSelectionMode = 'single';
  @Input() tabindex: Optional<string>;
  @Input() ariaLabel: Optional<string>;
  @Input() ariaLabelledBy: Optional<string>;
  @Input() placeholder: Optional<string>;
  @Input() panelClass: Optional<string>;
  @Input() panelStyle: Optional<CssObject>;
  @Input() panelStyleClass: Optional<string>;
  @Input() containerStyle: Optional<CssObject>;
  @Input() containerStyleClass: Optional<string>;
  @Input() labelStyle: Optional<CssObject>;
  @Input() labelStyleClass: Optional<string>;
  @Input() overlayOptions: Optional<$OverlayOptions>;
  @Input() emptyMessage: Optional<string>;
  @Input() filter: boolean = false;
  @Input() filterBy: string = 'label';
  @Input() filterMode: TreeFilterMode = 'lenient';
  @Input() filterPlaceholder: Optional<string>;
  @Input() filterLocale: Optional<string>;
  @Input() filterInputAutoFocus: boolean = true;
  @Input() propagateSelectionDown: boolean = true;
  @Input() propagateSelectionUp: boolean = true;
  @Input() showClear: boolean = false;
  @Input() resetFilterOnHide: boolean = true;
  @Input() virtualScroll: boolean = false;
  @Input() virtualScrollItemSize: Optional<number>;
  @Input() virtualScrollOptions: Optional<$ScrollerOptions>;
  @Input() autofocus: boolean = false;
  @Input() options: Optional<$TreeNode<SafeAny>[]>;
  @Input() loading: boolean = false;
  @Input() size: Optional<Size>;
  @Input() variant: Optional<InputVariant>;
  @Input() fluid: boolean = false;
  @Input() appendTo: Optional<SafeAny>;
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
  @ContentChildren(TemplateDirective) templates: Optional<QueryList<TemplateDirective>>;

  ngControl: Nullable<NgControl> = null;
  templateMap: Record<string, TemplateRef<SafeAny>> = {};
  onModelChange: Fn = () => {
  };
  onModelTouched: Fn = () => {
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
      currentControl = this.ngControl.control!;
      if (controlContainer) {
        parentForm = controlContainer.control;
        rootForm = controlContainer.formDirective as FormGroupDirective;
        if (this.ngControl instanceof FormControlName) {
          currentControl = parentForm.get(this.ngControl.name!.toString())!;
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
    this.templates?.forEach(item => {
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

  emitter(key: keyof this, event: SafeAny) {
    (this[key] as EventEmitter<SafeAny>).emit(event);
  }

  writeValue(value: SafeAny) {
    this.value = value;
    this.cd.markForCheck();
  }

  registerOnChange(fn: Fn) {
    this.onModelChange = fn;
  }

  registerOnTouched(fn: Fn) {
    this.onModelTouched = fn;
  }

  setDisabledState(val: boolean) {
    this.disabled = val;
    this.cd.markForCheck();
  }
}

import {
  AfterContentInit,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  EventEmitter,
  forwardRef,
  Injector,
  Input,
  OnDestroy,
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
import {Subject, takeUntil} from "rxjs";
import {
  NgAddon,
  NgChipDisplayMode,
  NgIconPosition,
  NgLabelPosition,
  NgSelectionMode,
  NgSize,
  NgTreeFilterMode,
  NgValidation
} from '@ng/models';
import {TemplateDirective} from '@ng/directives/template/template.directive';
import {ConfigService} from "@ng/services";

@Component({
  selector: 'ng-tree-select',
  templateUrl: './tree-select.component.html',
  styleUrls: ['./tree-select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TreeSelectComponent),
      multi: true
    }
  ]
})
export class TreeSelectComponent implements OnInit, AfterContentInit, ControlValueAccessor, OnDestroy {
  @Input() value: any;
  @Input() label: string;
  @Input() filled: boolean = this.configService.getConfig().filled;
  @Input() labelWidth: number;
  @Input() hint: string;
  @Input() rtl: boolean = this.configService.getConfig().rtl;
  @Input() showRequiredStar: boolean = this.configService.getConfig().showRequiredStar;
  @Input() icon: string;
  @Input() labelPos: NgLabelPosition = this.configService.getConfig().labelPos;
  @Input() iconPos: NgIconPosition = 'left';
  @Input() addon: NgAddon;
  @Input() validation: NgValidation;
  @Input() inputSize: NgSize = this.configService.getConfig().inputSize;
  @Input() disableConfigChangeEffect: boolean = this.configService.getConfig().disableConfigChangeEffect;
  // native properties
  @Input() options: any[];
  @Input() scrollHeight: string = '400px';
  @Input() placeholder: string;
  @Input() disabled: boolean;
  @Input() tabindex: string;
  @Input() selectionMode: NgSelectionMode;
  @Input() panelClass: string;
  @Input() appendTo: any;
  @Input() emptyMessage: string = 'موردی وجود ندارد';
  @Input() display: NgChipDisplayMode = 'comma';
  @Input() propagateSelectionUp: boolean = true;
  @Input() propagateSelectionDown: boolean = true;
  @Input() metaKeySelection: boolean = true;
  @Input() filter: boolean;
  @Input() filterBy: string = 'label';
  @Input() filterMode: NgTreeFilterMode = 'lenient';
  @Input() filterPlaceHolder: string;
  @Input() filterLocale: string;
  @Input() resetFilterOnHide: boolean = true;
  @Input() showClear: boolean;
  @Output() onBeforeBtnClick = new EventEmitter();
  @Output() onAfterBtnClick = new EventEmitter();
  @Output() onShow = new EventEmitter();
  @Output() onHide = new EventEmitter();
  @Output() onFilter = new EventEmitter();
  @Output() onNodeSelect = new EventEmitter();
  @Output() onNodeUnselect = new EventEmitter();
  @Output() onNodeExpand = new EventEmitter();
  @Output() onNodeCollapse = new EventEmitter();
  @Output() onClear = new EventEmitter();
  @ContentChildren(TemplateDirective) templates: QueryList<TemplateDirective>;

  inputId: string;
  controlContainer: FormGroupDirective;
  ngControl: NgControl;
  destroy$ = new Subject<boolean>();
  valueTemplate: TemplateRef<any>;
  headerTemplate: TemplateRef<any>;
  footerTemplate: TemplateRef<any>;
  emptyTemplate: TemplateRef<any>;
  onModelChange: any = (_: any) => {
  };
  onModelTouched: any = () => {
  };

  constructor(private cd: ChangeDetectorRef, private injector: Injector, private configService: ConfigService) {
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

        case 'footer':
          this.footerTemplate = item.templateRef;
          break;

        case 'empty':
          this.emptyTemplate = item.templateRef;
          break;
      }
    });
  }

  _onNodeSelect(event) {
    this.onNodeSelect.emit(event);
    this.onModelChange(this.value);
  }

  _onNodeUnselect(event) {
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

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}

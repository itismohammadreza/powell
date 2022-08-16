import {
  AfterContentInit,
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  EventEmitter,
  InjectFlags,
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
  FormGroupDirective,
  NG_VALUE_ACCESSOR,
  NgControl,
  UntypedFormGroup,
} from '@angular/forms';
import {NgAddon, NgError, NgLabelPosition} from '@ng/models/forms';
import {NgPosition, NgSize} from '@ng/models/offset';
import {TemplateDirective} from '@ng/directives/template.directive';

@Component({
  selector: 'ng-auto-complete',
  templateUrl: './auto-complete.component.html',
  styleUrls: ['./auto-complete.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: AutoCompleteComponent,
      multi: true,
    },
  ],
})
export class AutoCompleteComponent implements OnInit, AfterViewInit, AfterContentInit, ControlValueAccessor {
  @Input() value: any;
  @Input() label: string;
  @Input() filled: boolean;
  @Input() labelWidth: number;
  @Input() hint: string;
  @Input() rtl: boolean;
  @Input() showRequiredStar: boolean = true;
  @Input() icon: string;
  @Input() labelPos: NgLabelPosition = 'fix-top';
  @Input() iconPos: NgPosition = 'left';
  @Input() addon: NgAddon
  @Input() errors: NgError;
  @Input() inputSize: NgSize = 'md';
  // native properties
  @Input() suggestions: any[];
  @Input() field: string;
  @Input() scrollHeight: string = '200px';
  @Input() dropdown: boolean;
  @Input() multiple: boolean;
  @Input() dropdownIcon: string = 'pi pi-chevron-down';
  @Input() minlength: number = 1;
  @Input() completeOnFocus: boolean;
  @Input() style: any;
  @Input() inputStyle: any;
  @Input() panelStyle: any;
  @Input() styleClass: string;
  @Input() inputStyleClass: string;
  @Input() panelStyleClass: string;
  @Input() optionGroupLabel: string = 'label';
  @Input() group: boolean;
  @Input() optionGroupChildren: string;
  @Input() placeholder: string;
  @Input() readonly: boolean;
  @Input() disabled: boolean;
  @Input() maxlength: number;
  @Input() size: number;
  @Input() appendTo: any;
  @Input() tabindex: any;
  @Input() dataKey: string;
  @Input() autoHighlight: boolean;
  @Input() type: string = 'text';
  @Input() showEmptyMessage: boolean;
  @Input() emptyMessage: string = 'No records found.';
  @Input() autofocus: boolean;
  @Input() forceSelection: boolean = true;
  @Input() dropdownMode: 'blank' | 'current' = 'blank';
  @Input() baseZIndex: number = 1000;
  @Input() autoZIndex: boolean = true;
  @Input() showTransitionOptions: string = '.12s cubic-bezier(0, 0, 0.2, 1)';
  @Input() hideTransitionOptions: string = '.1s linear';
  @Input() ariaLabel: string;
  @Input() ariaLabelledBy: string;
  @Input() dropdownAriaLabel: string;
  @Input() unique: boolean = true;
  @Input() autocomplete: string;
  @Input() virtualScroll: boolean;
  @Input() itemSize: number;
  @Input() delay: number = 300;
  @Input() immutable: boolean = true;
  @Input() showClear: boolean;
  @Input() virtualScrollItemSize: number;
  @Input() lazy: boolean;
  @Output() completeMethod = new EventEmitter();
  @Output() onFocus = new EventEmitter();
  @Output() onBlur = new EventEmitter();
  @Output() onKeyUp = new EventEmitter();
  @Output() onSelect = new EventEmitter();
  @Output() onUnselect = new EventEmitter();
  @Output() onDropdownClick = new EventEmitter();
  @Output() onClear = new EventEmitter();
  @Output() onShow = new EventEmitter();
  @Output() onHide = new EventEmitter();
  @Output() onBeforeBtnClick = new EventEmitter();
  @Output() onAfterBtnClick = new EventEmitter();
  @ContentChildren(TemplateDirective) templates: QueryList<TemplateDirective>;

  inputId: string;
  controlContainer: FormGroupDirective;
  ngControl: NgControl;
  itemTemplate: TemplateRef<any>;
  emptyTemplate: TemplateRef<any>;
  groupTemplate: TemplateRef<any>;
  selectedItemTemplate: TemplateRef<any>;
  headerTemplate: TemplateRef<any>;
  footerTemplate: TemplateRef<any>;

  constructor(private cd: ChangeDetectorRef, private injector: Injector) {
  }

  onModelChange: any = (_: any) => {
  };

  onModelTouched: any = () => {
  };

  ngOnInit() {
    let parentForm: UntypedFormGroup;
    let rootForm: FormGroupDirective;
    let currentControl: AbstractControl;
    this.inputId = this.getId();
    this.controlContainer = this.injector.get(
      ControlContainer,
      null,
      InjectFlags.Optional || InjectFlags.Host || InjectFlags.SkipSelf
    ) as FormGroupDirective;
    this.ngControl = this.injector.get(NgControl, null);
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
      // by default we suppose the ngControl is and instance of NgModel.
      currentControl = this.ngControl.control;
      if (this.controlContainer) {
        parentForm = this.controlContainer.control;
        rootForm = this.controlContainer.formDirective as FormGroupDirective;
        // only when we have a formGroup (here is : controlContainer), we also may have formControlName instance.
        // so we check this condition when we have a controlContainer and overwrite currentControl value.
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

        case 'selectedItem':
          this.selectedItemTemplate = item.templateRef;
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
      }
    });
  }

  _completeMethod(event) {
    this.completeMethod.emit(event);
  }

  _onBlur() {
    this.onBlur.emit();
    this.onModelTouched();
  }

  _onKeyUp(event: KeyboardEvent) {
    const inputElement = event.target as HTMLInputElement;
    this.onKeyUp.emit(event);
    if (!this.forceSelection) {
      this.onModelChange(inputElement.value);
    }
  }

  _onSelect(event) {
    this.onSelect.emit(event);
    this.onModelChange(this.value);
  }

  _onUnselect(event) {
    this.onUnselect.emit(event);
    this.onModelChange(this.value);
  }

  _onDropdownClick(event) {
    this.onDropdownClick.emit(event);
  }

  _onClear() {
    this.onClear.emit();
    this.onModelChange(null);
  }

  emitter(name: string, event: any) {
    (this[name] as EventEmitter<any>).emit(event);
  }

  getId() {
    return 'id' + Math.random().toString(16).slice(2);
  }

  isInvalid() {
    if (this.ngControl) {
      const control = this.ngControl.control;
      return (control.touched || control.dirty) && control.invalid;
    }
  }

  showError(errorType: string): boolean {
    return (
      this.isInvalid() && this.ngControl.control.hasError(errorType.toLowerCase())
    );
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

  getWrapperClass() {
    return {
      rtl: this.rtl,
      ltr: !this.rtl,
      'flex-column-reverse': this.labelPos == 'fix-top',
      'align-items-center': this.labelPos == 'fix-side',
      'align-items-end': this.labelPos == 'fix-top' && this.rtl,
      'flex-row': this.labelPos == 'fix-side' && this.rtl,
      'flex-row-reverse': this.labelPos == 'fix-side' && !this.rtl,
    };
  }
}


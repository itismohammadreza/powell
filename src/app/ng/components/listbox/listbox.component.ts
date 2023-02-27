import {
  AfterContentInit,
  AfterViewInit,
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
  TemplateRef,
} from '@angular/core';
import {
  AbstractControl,
  ControlContainer,
  ControlValueAccessor,
  FormControlName,
  FormGroup,
  FormGroupDirective,
  NG_VALUE_ACCESSOR,
  NgControl,
} from '@angular/forms';
import {NgAddon, NgFilterMatchMode, NgFixLabelPosition, NgValidation,} from '@ng/models/forms';
import {TemplateDirective} from '@ng/directives/template.directive';
import {ConfigService} from "@ng/services";

@Component({
  selector: 'ng-listbox',
  templateUrl: './listbox.component.html',
  styleUrls: ['./listbox.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ListboxComponent),
      multi: true,
    },
  ],
})
export class ListboxComponent implements OnInit, AfterViewInit, AfterContentInit, ControlValueAccessor {
  @Input() value: any;
  @Input() label: string;
  @Input() filled: boolean = this.configService.getConfig().filled;
  @Input() labelWidth: number;
  @Input() hint: string;
  @Input() rtl: boolean = this.configService.getConfig().rtl;
  @Input() showRequiredStar: boolean = this.configService.getConfig().showRequiredStar;
  @Input() labelPos: NgFixLabelPosition = this.configService.getConfig().fixLabelPos;
  @Input() addon: NgAddon;
  @Input() validation: NgValidation;
  @Input() disableConfigChangeEffect: boolean;
  // native properties
  @Input() checkbox: boolean;
  @Input() dataKey: string;
  @Input() disabled: boolean;
  @Input() filter: boolean;
  @Input() filterMatchMode: NgFilterMatchMode = 'contains';
  @Input() filterValue: string;
  @Input() filterLocale: string;
  @Input() filterBy:	string;
  @Input() filterPlaceHolder: string;
  @Input() emptyFilterMessage: string = 'موردی وجود ندارد';
  @Input() listStyle: string;
  @Input() listStyleClass: string;
  @Input() metaKeySelection: boolean = true;
  @Input() multiple: boolean;
  @Input() readonly: boolean;
  @Input() emptyMessage: string = 'موردی وجود ندارد';
  @Input() options: any[];
  @Input() optionLabel: string = 'label';
  @Input() optionValue: string = 'value';
  @Input() optionDisabled: string = 'disabled';
  @Input() optionGroupLabel: string = 'label';
  @Input() optionGroupChildren: string = 'items';
  @Input() group: boolean;
  @Input() showToggleAll: boolean = true;
  @Input() style: any;
  @Input() styleClass: string;
  @Output() onChange = new EventEmitter();
  @Output() onDblClick = new EventEmitter();
  @Output() onClick = new EventEmitter();
  @Output() onBeforeBtnClick = new EventEmitter();
  @Output() onAfterBtnClick = new EventEmitter();
  @ContentChildren(TemplateDirective) templates: QueryList<TemplateDirective>;

  inputId: string;
  controlContainer: FormGroupDirective;
  ngControl: NgControl;
  headerTemplate: TemplateRef<any>;
  itemTemplate: TemplateRef<any>;
  groupTemplate: TemplateRef<any>;
  filterTemplate: TemplateRef<any>;
  emptyTemplate: TemplateRef<any>;
  emptyFilterTemplate: TemplateRef<any>;
  footerTemplate: TemplateRef<any>;
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
      this.cd.detectChanges();
    }
  }

  ngAfterContentInit() {
    this.templates.forEach((item: TemplateDirective) => {
      switch (item.getType()) {
        case 'header':
          this.headerTemplate = item.templateRef;
          break;

        case 'item':
          this.itemTemplate = item.templateRef;
          break;

        case 'group':
          this.groupTemplate = item.templateRef;
          break;

        case 'filter':
          this.filterTemplate = item.templateRef;
          break;

        case 'empty':
          this.emptyTemplate = item.templateRef;
          break;

        case 'emptyfilter':
          this.emptyFilterTemplate = item.templateRef;
          break;

        case 'footer':
          this.footerTemplate = item.templateRef;
          break;
      }
    });
  }

  emitter(name: string, event: any) {
    (this[name] as EventEmitter<any>).emit(event);
  }

  _onChange(event) {
    this.onChange.emit(event);
    this.onModelChange(event.value);
  }

  _onDblClick(event) {
    this.onDblClick.emit(event);
    this.onModelChange(event.value);
  }

  _onClick(event) {
    this.onClick.emit(event);
    this.onModelChange(event.value);
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
}

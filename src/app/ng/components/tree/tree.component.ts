import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  forwardRef,
  InjectFlags,
  Injector,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import {
  AbstractControl,
  ControlContainer,
  ControlValueAccessor,
  UntypedFormControl,
  FormControlName,
  UntypedFormGroup,
  FormGroupDirective,
  NG_VALUE_ACCESSOR,
  NgControl,
  NgModel,
} from '@angular/forms';
import {NgError, NgLabelPosition} from '@ng/models/forms';
import {NgOrientation, NgSelectionMode} from '@ng/models/offset';
import {NgTree, NgTreeFilterMode} from '@ng/models/tree';
import {ContextMenu} from 'primeng/contextmenu';

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
export class TreeComponent implements OnInit, ControlValueAccessor {
  @Input() label: string;
  @Input() labelWidth: number;
  @Input() hint: string;
  @Input() rtl: boolean = false;
  @Input() showRequiredStar: boolean = true;
  @Input() labelPos: NgLabelPosition = 'fix-top';
  @Input() errors: NgError;
  // native properties
  @Input() items: NgTree[];
  @Input() selectionMode: NgSelectionMode = 'checkbox';
  @Input() selection: NgTree | NgTree[];
  @Input() style: any;
  @Input() styleClass: string;
  @Input() contextMenu: ContextMenu;
  @Input() layout: NgOrientation = 'vertical';
  @Input() draggableScope: string;
  @Input() droppableScope: string;
  @Input() draggableNodes: boolean;
  @Input() droppableNodes: boolean;
  @Input() metaKeySelection: boolean = true;
  @Input() propagateSelectionUp: boolean = true;
  @Input() propagateSelectionDown: boolean = true;
  @Input() loading: boolean = false;
  @Input() loadingIcon: string = 'pi pi-spinner';
  @Input() emptyMessage: string = 'No records found';
  @Input() ariaLabel: string;
  @Input() ariaLabelledBy: string;
  @Input() togglerAriaLabel: string;
  @Input() validateDrop: boolean = false;
  @Input() filter: boolean = false;
  @Input() filterBy: string = 'label';
  @Input() filterMode: NgTreeFilterMode = 'lenient';
  @Input() filterPlaceholder: string;
  @Input() filterLocale: string = undefined;
  @Input() scrollHeight: string;
  @Input() virtualScroll: boolean = false;
  @Input() virtualNodeHeight: number;
  @Input() minBufferPx: number;
  @Input() maxBufferPx: number;
  @Input() trackBy: any;
  @Input() indentation: number = 1.5;
  @Output() selectionChange = new EventEmitter();
  @Output() onNodeSelect = new EventEmitter();
  @Output() onNodeUnselect = new EventEmitter();
  @Output() onNodeExpand = new EventEmitter();
  @Output() onNodeCollapse = new EventEmitter();
  @Output() onNodeContextMenuSelect = new EventEmitter();
  @Output() onNodeDrop = new EventEmitter();
  @Output() onFilter = new EventEmitter();

  inputId: string;
  controlContainer: FormGroupDirective;
  ngControl: NgControl;

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
    }
    if (this.controlContainer && this.ngControl) {
      parentForm = this.controlContainer.control;
      rootForm = this.controlContainer.formDirective as FormGroupDirective;
      if (this.ngControl instanceof NgModel) {
        currentControl = this.ngControl.control;
      } else if (this.ngControl instanceof FormControlName) {
        currentControl = parentForm.get(this.ngControl.name.toString());
      }
      rootForm.ngSubmit.subscribe(() => {
        currentControl.markAsTouched();
      });
      if (this.showRequiredStar) {
        if (this.isRequired(currentControl)) {
          if (this.label) {
            this.label += ' *';
          }
        }
      }
    }
  }

  _onSelectionChange(event) {
    this.selection = event;
    this.selectionChange.emit(this.selection);
  }

  _onNodeSelect(event) {
    this.onModelChange(this.selection);
    this.onNodeSelect.emit(event);
  }

  _onNodeUnselect(event) {
    this.onModelChange(this.selection);
    this.onNodeUnselect.emit(event);
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
  }

  showError(errorType: string): boolean {
    return (
      this.isInvalid() && this.ngControl.control.hasError(errorType.toLowerCase())
    );
  }


  isRequired(control: AbstractControl): boolean {
    let isRequired = false;
    const formControl = new UntypedFormControl();
    for (const key in control) {
      if (Object.prototype.hasOwnProperty.call(control, key)) {
        formControl[key] = control[key];
      }
    }
    formControl.setValue(null);
    if (formControl.errors?.required) {
      isRequired = true;
    }
    return isRequired;
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

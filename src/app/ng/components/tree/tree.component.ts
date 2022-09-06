import {
  AfterContentInit,
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  EventEmitter,
  forwardRef,
  InjectFlags,
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
  FormGroupDirective,
  NG_VALUE_ACCESSOR,
  NgControl,
  NgModel,
  UntypedFormGroup,
  FormGroupName,
} from '@angular/forms';
import { TemplateDirective } from '@ng/directives/template.directive';
import { NgAddon, NgError, NgFixLabelPosition, NgLabelPosition } from '@ng/models/forms';
import { NgIconPosition, NgOrientation, NgSelectionMode, NgSize } from '@ng/models/offset';
import { NgTree, NgTreeFilterMode } from '@ng/models/tree';
import { ContextMenu } from 'primeng/contextmenu';
import { ScrollerOptions } from 'primeng/scroller';

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
  @Input() value: any;
  @Input() label: string;
  @Input() filled: boolean;
  @Input() labelWidth: number;
  @Input() hint: string;
  @Input() rtl: boolean;
  @Input() showRequiredStar: boolean = true;
  @Input() icon: string;
  @Input() labelPos: NgLabelPosition = 'fix-top';
  @Input() iconPos: NgIconPosition = 'left';
  @Input() addon: NgAddon;
  @Input() errors: NgError;
  @Input() inputSize: NgSize = 'md';
  // native properties
  @Input() selectionMode: string;
  @Input() selection: any;
  @Input() style: string;
  @Input() styleClass: string;
  @Input() contextMenu: ContextMenu;
  @Input() layout: string = 'vertical';
  @Input() draggableScope: string | string[];
  @Input() droppableScope: string | string[];
  @Input() draggableNodes: boolean = false;
  @Input() droppableNodes: boolean = false;
  @Input() metaKeySelection: boolean = true;
  @Input() propagateSelectionUp: boolean = true;
  @Input() propagateSelectionDown: boolean = true;
  @Input() loading: boolean = false;
  @Input() loadingIcon: string = 'pi pi-spinner';
  @Input() emptyMessage: string = 'No records found';
  @Input() ariaLabel: string;
  @Input() ariaLabelledBy: string = 'pi pi-spinner';
  @Input() togglerAriaLabel: string;
  @Input() validateDrop: boolean = false;;
  @Input() filter: boolean = false;;
  @Input() filterBy: string = "label";
  @Input() filterMode: string = 'lenient';
  @Input() filterPlaceholder: string;
  @Input() filterLocale: string;
  @Input() scrollHeight: string;
  @Input() virtualScroll: boolean = false;
  @Input() virtualScrollItemSize: number;
  @Input() virtualScrollOptions: ScrollerOptions;
  @Input() lazy: boolean= false;
  @Input() trackBy: Function;
  @Input() indentation: number = 1.5;
  @Output() onNodeSelect= new EventEmitter();
  @Output() onNodeUnselect= new EventEmitter();
  @Output() onNodeExpand= new EventEmitter();
  @Output() onNodeCollapse= new EventEmitter();
  @Output() onNodeContextMenuSelect= new EventEmitter();
  @Output() onNodeDrop= new EventEmitter();
  @Output() onFilter= new EventEmitter();
  @Output() onLazyLoad= new EventEmitter();
  @Output() onScroll= new EventEmitter();
  @Output() onScrollIndexChange= new EventEmitter();
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

  constructor(private cd: ChangeDetectorRef, private injector: Injector) {
  }

  ngOnInit() {
    this.inputId = this.getId();
    let parentForm: UntypedFormGroup;
    let rootForm: FormGroupDirective;
    let currentControl: AbstractControl;
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
          // if (!this.disabled) {
          //   currentControl.markAsTouched();
          // }
        });
      }
    }
    // if (this.autoDisplayFirst) {
    //   this.onModelChange(this.options[0][this.optionValue])
    // }
  }

  ngAfterViewInit() {
    if (this.showRequiredStar && this.isRequired()) {
      if (this.label) {
        this.label += ' *';
      }
      // if (this.placeholder) {
      //   this.placeholder += ' *';
      // }
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

 
  _onNodeSelect(event){
    this.onNodeSelect.emit(event);
    this.onModelChange(event.value);
  }

  _onNodeUnselect(event){
    this.onNodeUnselect.emit(event);
    this.onModelChange(event.value);
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

  showHint() {
    let hasError = false;
    for (const error in this.errors) {
      if (this.showError(error)) {
        hasError = true
      }
      ;
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

  // setDisabledState(val: boolean) {
  //   this.disabled = val;
  //   this.cd.markForCheck();
  // }

}



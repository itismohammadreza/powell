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
import {NgCssObject, NgInputVariant, NgLabelPosition, NgSize, NgValidation} from '@powell/models';
import {ConfigService} from "@powell/api";
import {DestroyService} from "@core/utils";
import {$uuid} from "@powell/primeng";
import {TemplateDirective} from "@powell/directives/template";

@Component({
  selector: 'ng-input-textarea',
  templateUrl: './input-textarea.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputTextareaComponent),
      multi: true
    },
    DestroyService
  ],
  standalone: false
})
export class InputTextareaComponent implements OnInit, AfterContentInit, ControlValueAccessor {
  private cd = inject(ChangeDetectorRef);
  private injector = inject(Injector);
  private configService = inject(ConfigService);
  private destroy$ = inject(DestroyService);

  @Input() value: any;
  @Input() label: string;
  @Input() ariaLabelledBy: string;
  @Input() ariaLabel: string;
  @Input() labelWidth: number;
  @Input() hint: string;
  @Input() rtl: boolean;
  @Input() showRequiredStar: boolean;
  @Input() labelPosition: NgLabelPosition;
  @Input() validation: NgValidation;
  @Input() followConfig: boolean;
  @Input() inputId: string = $uuid();
  @Input() rows: number;
  @Input() cols: number;
  @Input() readonly: boolean;
  @Input() disabled: boolean;
  @Input() maxlength: number;
  @Input() placeholder: string;
  @Input() style: NgCssObject;
  @Input() styleClass: string;
  @Input() inputStyle: NgCssObject;
  @Input() inputStyleClass: string;
  // native properties
  @Input() autoResize: boolean = false;
  @Input() variant: NgInputVariant;
  @Input() fluid: boolean;
  @Input() size: NgSize;
  @Output() onResize = new EventEmitter<Event | {}>();
  @Output() onInput = new EventEmitter<Event>();
  @Output() onChange = new EventEmitter<Event>();
  @Output() onKeyDown = new EventEmitter<KeyboardEvent>();
  @Output() onKeyUp = new EventEmitter<KeyboardEvent>();
  @Output() onBlur = new EventEmitter<FocusEvent>();
  @Output() onFocus = new EventEmitter<FocusEvent>();
  @ContentChildren(TemplateDirective) templates: QueryList<TemplateDirective>;

  templateMap: Record<string, TemplateRef<any>> = {};
  ngControl: NgControl;
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

  _onResize(event: Event | {}) {
    this.onResize.emit(event);
  }

  _onChange(event: Event) {
    const inputElement = event.target as HTMLTextAreaElement;
    this.onChange.emit(event);
    this.onModelChange(inputElement.value);
  }

  _onInput(event: Event) {
    const inputElement = event.target as HTMLTextAreaElement;
    this.onInput.emit(event);
    this.onModelChange(inputElement.value);
  }

  _onBlur(event: FocusEvent) {
    this.onBlur.emit(event);
    this.onModelTouched();
  }

  _onFocus(event: FocusEvent) {
    this.onFocus.emit(event);
  }

  _onKeyDown(event: KeyboardEvent) {
    const inputElement = event.target as HTMLTextAreaElement;
    this.onKeyDown.emit(event);
    this.onModelChange(inputElement.value);
  }

  _onKeyUp(event: KeyboardEvent) {
    const inputElement = event.target as HTMLTextAreaElement;
    this.onKeyUp.emit(event);
    this.onModelChange(inputElement.value);
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

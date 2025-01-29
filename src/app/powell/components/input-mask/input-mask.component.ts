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
import {takeUntil} from "rxjs";
import {NgCssObject, NgInputType, NgInputVariant, NgLabelPosition, NgSize, NgValidation} from '@powell/models';
import {DestroyService} from "@core/utils";
import {TemplateDirective} from "@powell/directives/template";
import {$uuid} from "@powell/primeng";
import {ConfigService} from "@powell/api";

@Component({
  selector: 'ng-input-mask',
  templateUrl: './input-mask.component.html',
  styleUrls: ['./input-mask.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputMaskComponent),
      multi: true
    }
  ],
  standalone: false
})
export class InputMaskComponent implements OnInit, AfterContentInit, ControlValueAccessor {
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
  @Input() labelPosition: NgLabelPosition;
  @Input() validation: NgValidation;
  @Input() followConfig: boolean;
  @Input() fluid: boolean;
  // native properties
  @Input() type: NgInputType = 'text';
  @Input() slotChar: string = '_';
  @Input() autoClear: boolean = true;
  @Input() showClear: boolean = false;
  @Input() style: NgCssObject;
  @Input() inputId: string = $uuid();
  @Input() styleClass: string;
  @Input() placeholder: string;
  @Input() size: NgSize;
  @Input() maxlength: number;
  @Input() tabindex: string;
  @Input() title: string;
  @Input() variant: NgInputVariant;
  @Input() ariaLabel: string;
  @Input() ariaLabelledBy: string;
  @Input() ariaRequired: boolean = false;
  @Input() disabled: boolean;
  @Input() readonly: boolean = false;
  @Input() unmask: boolean = false;
  @Input() name: string;
  @Input() required: boolean = false;
  @Input() characterPattern: string = '[A-Za-z]';
  @Input() autofocus: boolean = false;
  @Input() autocomplete: string;
  @Input() keepBuffer: boolean = false;
  @Input() mask: string;
  @Output() onComplete = new EventEmitter<void>();
  @Output() onFocus = new EventEmitter<Event>();
  @Output() onBlur = new EventEmitter<Event>();
  @Output() onInput = new EventEmitter<Event>();
  @Output() onKeydown = new EventEmitter<Event>();
  @Output() onClear = new EventEmitter<void>();
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


  _onInput(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.onInput.emit(event);
    this.onModelChange(inputElement.value);
  }

  _onBlur(event: Event) {
    this.onBlur.emit(event);
    this.onModelTouched();
  }

  _onClear() {
    this.onClear.emit();
    this.onModelChange(null);
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

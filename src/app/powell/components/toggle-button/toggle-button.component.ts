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
  NgControl
} from '@angular/forms';
import {takeUntil} from "rxjs";
import {FixLabelPosition, Position, Size, Validation} from '@powell/models';
import {DestroyService} from "@powell/utils";
import {$ToggleButtonChangeEvent, $uuid} from "@powell/primeng";
import {TemplateDirective} from "@powell/directives/template";
import {ConfigService} from "@powell/api";

@Component({
  selector: 'pw-toggle-button',
  templateUrl: './toggle-button.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ToggleButtonComponent),
      multi: true
    },
    DestroyService
  ],
  standalone: false
})
export class ToggleButtonComponent implements OnInit, AfterContentInit, ControlValueAccessor {
  private cd = inject(ChangeDetectorRef);
  private injector = inject(Injector);
  private configService = inject(ConfigService);
  private destroy$ = inject(DestroyService);

  @Input() value: Optional<SafeAny>;
  @Input() label: Optional<string>;
  @Input() labelWidth: Optional<number>;
  @Input() hint: Optional<string>;
  @Input() rtl: boolean = false;
  @Input() showRequiredStar: boolean = false;
  @Input() labelPosition: Optional<FixLabelPosition>;
  @Input() validation: Optional<Validation>;
  @Input() followConfig: boolean = false;
  // native properties
  @Input() required: boolean = false;
  @Input() disabled: boolean = false;
  @Input() name: Optional<string>;
  @Input() onLabel: Optional<string>;
  @Input() offLabel: Optional<string>;
  @Input() onIcon: Optional<string>;
  @Input() offIcon: Optional<string>;
  @Input() ariaLabel: Optional<string>;
  @Input() ariaLabelledBy: Optional<string>;
  @Input() inputId: string = $uuid();
  @Input() tabindex: Optional<number>;
  @Input() iconPos: Exclude<Position, 'top' | 'bottom'> = 'left';
  @Input() autofocus: boolean = false;
  @Input() size: Optional<Size>;
  @Input() allowEmpty: boolean = true;
  @Input() fluid: boolean = false;
  @Output() onChange = new EventEmitter<$ToggleButtonChangeEvent>();
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
    this.configService.configureComponent(this, true);
  }

  ngAfterContentInit() {
    this.templates?.forEach(item => {
      const name = item.type;
      this.templateMap[name] = item.templateRef;
    });
  }

  _onChange(event: $ToggleButtonChangeEvent) {
    this.onModelChange(event.checked);
    this.onChange.emit(event);
    this.value = event.checked;
    this.cd.detectChanges();
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

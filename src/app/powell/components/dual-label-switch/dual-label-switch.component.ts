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
import {AsyncEvent, CssObject, FixLabelPosition, Validation} from "@powell/models";
import {DestroyService} from "@powell/utils";
import {$ToggleSwitchChangeEvent, $uuid} from "@powell/primeng";
import {ConfigService} from "@powell/api";
import {TemplateDirective} from "@powell/directives/template";

@Component({
  selector: 'pw-dual-label-switch',
  templateUrl: './dual-label-switch.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DualLabelSwitchComponent),
      multi: true
    },
    DestroyService
  ],
  standalone: false
})
export class DualLabelSwitchComponent implements OnInit, AfterContentInit, ControlValueAccessor {
  private cd = inject(ChangeDetectorRef);
  private injector = inject(Injector);
  private configService = inject(ConfigService);
  private destroy$ = inject(DestroyService);

  @Input() value: Optional<any>;
  @Input() label: Optional<string>;
  @Input() labelLeft: Optional<string>;
  @Input() labelRight: Optional<string>;
  @Input() leftValue: string = 'left';
  @Input() rightValue: string = 'right';
  @Input() labelWidth: Optional<number>;
  @Input() hint: Optional<string>;
  @Input() rtl: boolean = false;
  @Input() showRequiredStar: boolean = false;
  @Input() labelPosition: Optional<FixLabelPosition>;
  @Input() validation: Optional<Validation>;
  @Input() async: boolean = false;
  @Input() showAsyncLoading: boolean = true;
  @Input() followConfig: boolean = false;
  // native properties
  @Input() style: Optional<CssObject>;
  @Input() styleClass: Optional<string>;
  @Input() tabindex: Optional<number>;
  @Input() inputId: string = $uuid();
  @Input() name: Optional<string>;
  @Input() disabled: boolean = false;
  @Input() readonly: boolean = false;
  @Input() ariaLabel: Optional<string>;
  @Input() ariaLabelledBy: Optional<string>;
  @Input() autofocus: any = false;
  @Output() onChange = new EventEmitter<$ToggleSwitchChangeEvent>();
  @Output() onChangeAsync = new EventEmitter<AsyncEvent<$ToggleSwitchChangeEvent>>();
  @ContentChildren(TemplateDirective) templates: Optional<QueryList<TemplateDirective>>;

  loading: boolean = false;
  templateMap: Record<string, TemplateRef<any>> = {};
  ngControl: Nullable<NgControl> = null;
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
    this.setInitValue();
    this.configService.configureComponent(this, true);
  }

  ngAfterContentInit() {
    this.templates?.forEach(item => {
      const name = item.type;
      this.templateMap[name] = item.templateRef;
    });
  }


  setInitValue() {
    if (!this.value) {
      this.value = this.leftValue;
      this.onModelChange(this.value)
    }
  }

  _onChange(event: $ToggleSwitchChangeEvent) {
    if (this.async) {
      this.loading = true;
      this.disabled = true;
      this.cd.detectChanges();
      this.onChangeAsync.emit({loadingCallback: this.removeLoading, event});
    } else {
      this.onModelChange(event.checked);
      this.onChange.emit(event);
    }
  }

  removeLoading = (ok: boolean = true) => {
    this.loading = false;
    this.disabled = false;
    if (!ok) {
      this.value = !this.value;
    }
  };

  writeValue(value: any) {
    this.value = value;
    this.setInitValue()
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

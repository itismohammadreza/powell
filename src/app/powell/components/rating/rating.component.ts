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
import {CssObject, FixLabelPosition, Validation} from '@powell/models';
import {TemplateDirective} from "@powell/directives/template";
import {DestroyService} from "@powell/utils";
import {$RatingRateEvent, $uuid} from "@powell/primeng";
import {ConfigService} from "@powell/api";

@Component({
  selector: 'pw-rating',
  templateUrl: './rating.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RatingComponent),
      multi: true
    },
    DestroyService
  ],
  standalone: false
})
export class RatingComponent implements OnInit, AfterContentInit, ControlValueAccessor {
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
  @Input() id: string = $uuid();
  // native properties
  @Input() required: boolean = false;
  @Input() disabled: boolean = false;
  @Input() name: Optional<string>;
  @Input() readonly: boolean = false;
  @Input() stars: number = 5;
  @Input() iconOnClass: Optional<string>;
  @Input() iconOnStyle: Optional<CssObject>;
  @Input() iconOffClass: Optional<string>;
  @Input() iconOffStyle: Optional<CssObject>;
  @Input() autofocus: boolean = false;
  @Output() onRate = new EventEmitter<$RatingRateEvent>();
  @Output() onFocus = new EventEmitter<Event>();
  @Output() onBlur = new EventEmitter<Event>();
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

  _onRate(event: $RatingRateEvent) {
    this.onRate.emit(event);
    this.onModelChange(event.value);
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

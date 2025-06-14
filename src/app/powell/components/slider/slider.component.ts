import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  forwardRef,
  inject,
  Injector,
  Input,
  OnInit,
  Output,
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
import {CssObject, FixLabelPosition, Orientation, Validation} from '@powell/models';
import {DestroyService} from "@powell/utils";
import {$SliderChangeEvent, $SliderSlideEndEvent, $uuid} from "@powell/primeng";
import {ConfigService} from "@powell/api";

@Component({
  selector: 'pw-slider',
  templateUrl: './slider.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SliderComponent),
      multi: true
    },
    DestroyService
  ],
  standalone: false
})
export class SliderComponent implements OnInit, ControlValueAccessor {
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
  @Input() labelPosition: FixLabelPosition;
  @Input() validation: Validation;
  @Input() followConfig: boolean;
  @Input() id: string = $uuid();
  // native properties
  @Input() animate: boolean = false;
  @Input() disabled: boolean;
  @Input() min: number = 0;
  @Input() max: number = 100;
  @Input() orientation: Orientation = 'horizontal';
  @Input() step: number;
  @Input() range: boolean = false;
  @Input() style: CssObject;
  @Input() styleClass: string;
  @Input() ariaLabel: string;
  @Input() ariaLabelledBy: string;
  @Input() tabindex: number;
  @Input() autofocus: boolean = false;
  @Output() onChange = new EventEmitter<$SliderChangeEvent>();
  @Output() onSlideEnd = new EventEmitter<$SliderSlideEndEvent>();

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
    this.configService.configureComponent(this, true);
  }

  _onChange(event: $SliderChangeEvent) {
    this.onModelChange(event.value);
    this.onChange.emit(event);
  }

  _onSlideEnd(event: $SliderSlideEndEvent) {
    this.onModelChange(event.value);
    this.onSlideEnd.emit(event);
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

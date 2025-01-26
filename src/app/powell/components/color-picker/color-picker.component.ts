import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  forwardRef,
  inject,
  Injector,
  Input,
  OnInit,
  Output
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
import {NgColorFormat, NgCssObject, NgLabelPosition, NgValidation} from '@powell/models';
import {DestroyService} from "@core/utils";
import {$ColorPickerChangeEvent, $uuid} from "@powell/primeng";
import {ConfigService} from "@powell/api";

@Component({
  selector: 'ng-color-picker',
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ColorPickerComponent),
      multi: true
    },
    DestroyService
  ],
  standalone: false
})

export class ColorPickerComponent implements OnInit, ControlValueAccessor {
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
  // native properties
  @Input() style: NgCssObject;
  @Input() styleClass: string;
  @Input() inline: boolean = false;
  @Input() format: NgColorFormat = 'hex';
  @Input() appendTo: any;
  @Input() disabled: boolean;
  @Input() tabindex: string;
  @Input() inputId: string = $uuid();
  @Input() autoZIndex: boolean = true;
  @Input() baseZIndex: number = 0;
  @Input() showTransitionOptions: string = '.12s cubic-bezier(0, 0, 0.2, 1)';
  @Input() hideTransitionOptions: string = '.1s linear';
  @Input() autofocus: boolean = false;
  @Output() onChange = new EventEmitter<$ColorPickerChangeEvent>();
  @Output() onShow = new EventEmitter<void>();
  @Output() onHide = new EventEmitter<void>();
  @Output() onInput = new EventEmitter<Event>();
  @Output() onKeyDown = new EventEmitter<KeyboardEvent>();
  @Output() onKeyUp = new EventEmitter<KeyboardEvent>();
  @Output() onBlur = new EventEmitter<FocusEvent>();
  @Output() onFocus = new EventEmitter<FocusEvent>();

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

  _onChangeColorPicker(event: $ColorPickerChangeEvent) {
    this.onChange.emit(event);
    this.onModelChange(event.value);
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

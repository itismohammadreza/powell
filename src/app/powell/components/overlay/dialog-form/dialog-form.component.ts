import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  inject,
  QueryList,
  ViewChild,
  ViewChildren
} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, ValidatorFn} from "@angular/forms";
import {
  AsyncEvent,
  DialogFormComponentName,
  DialogFormConfig,
  DialogFormOptions,
  DialogFormResult,
  Validation
} from "@powell/models";
import {
  $ConfirmDialogModule,
  $ConfirmPopupModule,
  $Dialog,
  $DialogModule,
  $DomHandler,
  $ToastModule
} from "@powell/primeng";
import {InputTextComponent, InputTextModule} from "@powell/components/input-text";
import {AutoCompleteComponent, AutoCompleteModule} from "@powell/components/auto-complete";
import {ButtonComponent, ButtonModule} from "@powell/components/button";
import {CascadeSelectComponent, CascadeSelectModule} from "@powell/components/cascade-select";
import {CheckboxComponent, CheckboxModule} from "@powell/components/checkbox";
import {CheckboxGroupComponent, CheckboxGroupModule} from "@powell/components/checkbox-group";
import {ColorPickerComponent, ColorPickerModule} from "@powell/components/color-picker";
import {SelectComponent, SelectModule} from "@powell/components/select";
import {DualLabelSwitchComponent, DualLabelSwitchModule} from "@powell/components/dual-label-switch";
import {FilePickerComponent, FilePickerModule} from "@powell/components/file-picker";
import {FilePicker2Component, FilePicker2Module} from "@powell/components/file-picker2";
import {DatepickerComponent, DatepickerModule} from "@powell/components/datepicker";
import {ImageComponent, ImageModule} from "@powell/components/image";
import {InputMaskComponent, InputMaskModule} from "@powell/components/input-mask";
import {InputNumberComponent, InputNumberModule} from "@powell/components/input-number";
import {InputOtpComponent, InputOtpModule} from "@powell/components/input-otp";
import {InputPasswordComponent, InputPasswordModule} from "@powell/components/input-password";
import {InputTextareaComponent, InputTextareaModule} from "@powell/components/input-textarea";
import {IranMapComponent, IranMapModule} from "@powell/components/iran-map";
import {KnobComponent, KnobModule} from "@powell/components/knob";
import {ListboxComponent, ListboxModule} from "@powell/components/listbox";
import {MapComponent, MapModule} from "@powell/components/map";
import {MultiSelectComponent, MultiSelectModule} from "@powell/components/multi-select";
import {RadioComponent, RadioModule} from "@powell/components/radio";
import {RatingComponent, RatingModule} from "@powell/components/rating";
import {SelectButtonComponent, SelectButtonModule} from "@powell/components/select-button";
import {SliderComponent, SliderModule} from "@powell/components/slider";
import {ToggleSwitchComponent, ToggleSwitchModule} from "@powell/components/toggle-switch";
import {ToggleButtonComponent, ToggleButtonModule} from "@powell/components/toggle-button";
import {TreeComponent, TreeModule} from "@powell/components/tree";
import {TreeSelectComponent, TreeSelectModule} from "@powell/components/tree-select";
import {EditorComponent, EditorModule} from "@powell/components/editor";
import {takeUntil} from "rxjs";
import {DestroyService} from "@powell/utils";
import {SafeModule} from '@powell/pipes/safe';

@Component({
  selector: 'pw-dialog-form',
  templateUrl: './dialog-form.component.html',
  providers: [DestroyService],
  imports: [
    ReactiveFormsModule,
    forwardRef(() => $ConfirmDialogModule),
    forwardRef(() => $ConfirmPopupModule),
    forwardRef(() => $DialogModule),
    forwardRef(() => $ToastModule),
    forwardRef(() => SafeModule),
    forwardRef(() => AutoCompleteModule),
    forwardRef(() => ButtonModule),
    forwardRef(() => CascadeSelectModule),
    forwardRef(() => CheckboxModule),
    forwardRef(() => ColorPickerModule),
    forwardRef(() => SelectModule),
    forwardRef(() => DualLabelSwitchModule),
    forwardRef(() => EditorModule),
    forwardRef(() => FilePickerModule),
    forwardRef(() => FilePicker2Module),
    forwardRef(() => DatepickerModule),
    forwardRef(() => ImageModule),
    forwardRef(() => InputMaskModule),
    forwardRef(() => InputNumberModule),
    forwardRef(() => InputOtpModule),
    forwardRef(() => InputPasswordModule),
    forwardRef(() => InputTextModule),
    forwardRef(() => InputTextareaModule),
    forwardRef(() => IranMapModule),
    forwardRef(() => KnobModule),
    forwardRef(() => ListboxModule),
    forwardRef(() => MapModule),
    forwardRef(() => CheckboxGroupModule),
    forwardRef(() => MultiSelectModule),
    forwardRef(() => RadioModule),
    forwardRef(() => RatingModule),
    forwardRef(() => SelectButtonModule),
    forwardRef(() => SliderModule),
    forwardRef(() => ToggleSwitchModule),
    forwardRef(() => ToggleButtonModule),
    forwardRef(() => TreeModule),
    forwardRef(() => TreeSelectModule),
  ]
})
export class DialogFormComponent {
  private el = inject(ElementRef);
  private destroy$ = inject(DestroyService);
  private cd = inject(ChangeDetectorRef);

  @ViewChild($Dialog, {static: true}) dialog: $Dialog;
  @ViewChildren(AutoCompleteComponent) autoCompleteComponent: QueryList<AutoCompleteComponent>;
  @ViewChildren(ButtonComponent) buttonComponent: QueryList<ButtonComponent>;
  @ViewChildren(CascadeSelectComponent) cascadeSelectComponent: QueryList<CascadeSelectComponent>;
  @ViewChildren(CheckboxComponent) checkboxComponent: QueryList<CheckboxComponent>;
  @ViewChildren(CheckboxGroupComponent) checkboxGroupComponent: QueryList<CheckboxGroupComponent>;
  @ViewChildren(ColorPickerComponent) colorPickerComponent: QueryList<ColorPickerComponent>;
  @ViewChildren(SelectComponent) dropdownComponent: QueryList<SelectComponent>;
  @ViewChildren(DualLabelSwitchComponent) dualLabelSwitchComponent: QueryList<DualLabelSwitchComponent>;
  @ViewChildren(EditorComponent) editorComponent: QueryList<EditorComponent>;
  @ViewChildren(FilePickerComponent) filePickerComponent: QueryList<FilePickerComponent>;
  @ViewChildren(FilePicker2Component) filePicker2Component: QueryList<FilePicker2Component>;
  @ViewChildren(DatepickerComponent) datepickerComponent: QueryList<DatepickerComponent>;
  @ViewChildren(ImageComponent) imageComponent: QueryList<ImageComponent>;
  @ViewChildren(InputMaskComponent) inputMaskComponent: QueryList<InputMaskComponent>;
  @ViewChildren(InputNumberComponent) inputNumberComponent: QueryList<InputNumberComponent>;
  @ViewChildren(InputOtpComponent) inputOtpComponent: QueryList<InputOtpComponent>;
  @ViewChildren(InputPasswordComponent) inputPasswordComponent: QueryList<InputPasswordComponent>;
  @ViewChildren(InputTextComponent) inputTextComponent: QueryList<InputTextComponent>;
  @ViewChildren(InputTextareaComponent) inputTextareaComponent: QueryList<InputTextareaComponent>;
  @ViewChildren(IranMapComponent) iranMapComponent: QueryList<IranMapComponent>;
  @ViewChildren(KnobComponent) knobComponent: QueryList<KnobComponent>;
  @ViewChildren(ListboxComponent) listboxComponent: QueryList<ListboxComponent>;
  @ViewChildren(MapComponent) mapComponent: QueryList<MapComponent>;
  @ViewChildren(MultiSelectComponent) multiSelectComponent: QueryList<MultiSelectComponent>;
  @ViewChildren(RadioComponent) radioComponent: QueryList<RadioComponent>;
  @ViewChildren(RatingComponent) ratingComponent: QueryList<RatingComponent>;
  @ViewChildren(SelectButtonComponent) selectButtonComponent: QueryList<SelectButtonComponent>;
  @ViewChildren(SliderComponent) sliderComponent: QueryList<SliderComponent>;
  @ViewChildren(ToggleSwitchComponent) toggleSwitchComponent: QueryList<ToggleSwitchComponent>;
  @ViewChildren(ToggleButtonComponent) toggleButtonComponent: QueryList<ToggleButtonComponent>;
  @ViewChildren(TreeComponent) treeComponent: QueryList<TreeComponent>;
  @ViewChildren(TreeSelectComponent) treeSelectComponent: QueryList<TreeSelectComponent>;

  form: FormGroup = new FormGroup({});
  visible: boolean;
  _config: DialogFormConfig[] = [];
  _options: DialogFormOptions = {};
  onSubmit = new EventEmitter<DialogFormResult>();
  onClose = new EventEmitter<void>();
  disableReject: boolean;
  configTimeout: SafeAny;
  componentIndexMap: Partial<Record<DialogFormComponentName, number>> = {};

  set config(value: DialogFormConfig[]) {
    this.componentIndexMap = {};
    this._config = value;
    this._config.forEach((config) => {
      if (config.key) {
        this.form.addControl(config.key, new FormControl(config.value ?? null, config.validations?.map(v => v.validator) ?? []));
      }
      this.configTimeout = setTimeout(() => {
        this.applyConfigToComponent(config);
      })
    })
  }

  set options(v: DialogFormOptions) {
    this._options = v;
    if (this._options.formValidator) {
      this.form.setValidators(this.options.formValidator.validator);
    }
  }

  get options() {
    return this._options;
  }

  get config() {
    return this._config;
  }

  show() {
    for (const key in this.options) {
      const option = this.options[key];
      if (typeof option !== 'function') {
        this.dialog[key] = this.options[key];
      }
    }
    this.visible = true;
  }

  close() {
    this.visible = false;
    this.onClose.emit();
    this.handleEvent('onHide');
    clearTimeout(this.configTimeout);
    this.destroy$.next();
    this.cd.detectChanges();
  }

  convertToComponentValidation(config: DialogFormConfig) {
    const errObj: Validation = {};
    if (!config.validations) {
      return errObj;
    }
    for (const e of config.validations) {
      if (typeof e.message == 'function') {
        const control = this.form.get(config.key);
        errObj[e.type] = e.message(control);
      } else {
        errObj[e.type] = e.message;
      }
    }
    return errObj as Validation;
  }

  handleConfigValidations(config: DialogFormConfig) {
    const control = this.form.get(config.key);
    if (config.validations) {
      const validators: ValidatorFn[] = [];
      for (const e of config.validations) {
        validators.push(e.validator);
      }
      control.setValidators([...validators]);
      control.updateValueAndValidity();
    }
  }

  handleConfigVisibility(config: DialogFormConfig) {
    let hidden = false;
    if (config.hidden == undefined) {
      return hidden;
    }
    if (typeof config.hidden == 'function') {
      hidden = config.hidden({form: this.form, currentConfig: config, allConfig: this.config});
    } else {
      hidden = config.hidden;
    }
    if (hidden) {
      const control = this.form.get(config.key);
      control?.setValue(null);
      control?.clearValidators();
      control?.updateValueAndValidity();
    } else {
      this.handleConfigValidations(config);
    }
    return hidden;
  }

  handleConfigDisable(config: DialogFormConfig) {
    let disabled = false;
    if (config.disabled == undefined) {
      return disabled;
    }
    if (typeof config.disabled == 'function') {
      disabled = config.disabled({form: this.form, currentConfig: config, allConfig: this.config});
    } else {
      disabled = config.disabled;
    }
    if (disabled) {
      const control = this.form.get(config.key);
      control?.clearValidators();
      control?.updateValueAndValidity();
    } else {
      this.handleConfigValidations(config);
    }
    return disabled;
  }

  get handleSubmitDisable() {
    let disabled = false;
    if (this.options.submitDisabled == undefined) {
      return disabled;
    }
    if (typeof this.options.submitDisabled == 'function') {
      disabled = this.options.submitDisabled({form: this.form, allConfig: this.config});
    } else {
      disabled = this.options.submitDisabled;
    }
    return disabled;
  }

  setDefaultFocus() {
    let element: HTMLButtonElement;
    switch (this.options.defaultFocus) {
      case 'reject':
        element = $DomHandler.findSingle(this.el.nativeElement, '.p-dialog-form-reject');
        break;

      case 'accept':
        element = $DomHandler.findSingle(this.el.nativeElement, '.p-dialog-form-accept');
        break;

      case undefined:
        element = null;
        break;
    }
    if (element) {
      element.focus();
    }

    this.handleEvent('onShow');
  }

  onSubmitClick({loadingCallback}: AsyncEvent<MouseEvent>) {
    this.form.markAllAsTouched();
    if (this.form.invalid) {
      loadingCallback();
      return;
    }
    this.disableReject = true;

    const finalizeSubmit = (hide: boolean) => {
      loadingCallback();
      this.visible = !hide;
      this.disableReject = false;
      this.cd.detectChanges();
      if (hide) {
        this.close();
      }
    }
    this.onSubmit.emit({formValue: this.form.value, finalizeSubmit});
  }

  handleEvent(event: string, args?: SafeAny) {
    this.options[event]?.(args);
  }

  applyConfigToComponent(config: DialogFormConfig) {
    const componentsMap: Partial<Record<DialogFormComponentName, SafeAny>> = {
      'auto-complete': this.autoCompleteComponent.toArray(),
      'button': this.buttonComponent.toArray(),
      'cascade-select': this.cascadeSelectComponent.toArray(),
      'checkbox': this.checkboxComponent.toArray(),
      'checkbox-group': this.checkboxGroupComponent.toArray(),
      'color-picker': this.colorPickerComponent.toArray(),
      'select': this.dropdownComponent.toArray(),
      'dual-label-switch': this.dualLabelSwitchComponent.toArray(),
      'editor': this.editorComponent.toArray(),
      'file-picker': this.filePickerComponent.toArray(),
      'file-picker2': this.filePicker2Component.toArray(),
      'datepicker': this.datepickerComponent.toArray(),
      'image': this.imageComponent.toArray(),
      'input-mask': this.inputMaskComponent.toArray(),
      'input-number': this.inputNumberComponent.toArray(),
      'input-otp': this.inputOtpComponent.toArray(),
      'input-password': this.inputPasswordComponent.toArray(),
      'input-text': this.inputTextComponent.toArray(),
      'input-textarea': this.inputTextareaComponent.toArray(),
      'iran-map': this.iranMapComponent.toArray(),
      'knob': this.knobComponent.toArray(),
      'listbox': this.listboxComponent.toArray(),
      'map': this.mapComponent.toArray(),
      'multi-select': this.multiSelectComponent.toArray(),
      'radio': this.radioComponent.toArray(),
      'rating': this.ratingComponent.toArray(),
      'select-button': this.selectButtonComponent.toArray(),
      'slider': this.sliderComponent.toArray(),
      'toggle-switch': this.toggleSwitchComponent.toArray(),
      'toggle-button': this.toggleButtonComponent.toArray(),
      'tree': this.treeComponent.toArray(),
      'tree-select': this.treeSelectComponent.toArray(),
    }
    const compType = config.component;
    if (!(compType in this.componentIndexMap)) {
      this.componentIndexMap[compType] = 0;
    }
    const compIndex = this.componentIndexMap[compType];
    const component = componentsMap[compType]?.[compIndex];
    this.componentIndexMap[compType]++;

    if (!component) {
      return;
    }

    component.rtl = config.rtl ?? this.options.rtl;
    for (const key in config) {
      if (component[key] instanceof EventEmitter) {
        component[key].pipe(takeUntil(this.destroy$)).subscribe((event) => {
          config[key]({
            event,
            form: this.form,
            currentConfig: config,
            allConfig: this.config,
            componentRef: component
          })
        });
      } else {
        if (Object.hasOwn(component, 'appendTo') && !config.appendTo) {
          component['appendTo'] = this.dialog;
        }
        component[key] = config[key];
      }
    }
  }
}

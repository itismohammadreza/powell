import {Component, ElementRef, EventEmitter, inject, ViewChild} from '@angular/core';
import {FormControl, FormGroup, ValidatorFn} from "@angular/forms";
import {
  NgAsyncEvent,
  NgDialogFormComponent,
  NgDialogFormConfig,
  NgDialogFormOptions,
  NgDialogFormResult,
  NgValidation
} from "@powell/models";
import {$Dialog, $DomHandler} from "@powell/primeng";
import {InputTextComponent} from "@powell/components/input-text";
import {AutoCompleteComponent} from "@powell/components/auto-complete";
import {ButtonComponent} from "@powell/components/button";
import {CascadeSelectComponent} from "@powell/components/cascade-select";
import {CheckboxComponent} from "@powell/components/checkbox";
import {CheckboxGroupComponent} from "@powell/components/checkbox-group";
import {ColorPickerComponent} from "@powell/components/color-picker";
import {SelectComponent} from "@powell/components/select";
import {DualLabelSwitchComponent} from "@powell/components/dual-label-switch";
import {FilePickerComponent} from "@powell/components/file-picker";
import {FilePicker2Component} from "@powell/components/file-picker2";
import {DatepickerComponent} from "@powell/components/datepicker";
import {ImageComponent} from "@powell/components/image";
import {InputMaskComponent} from "@powell/components/input-mask";
import {InputNumberComponent} from "@powell/components/input-number";
import {InputOtpComponent} from "@powell/components/input-otp";
import {InputPasswordComponent} from "@powell/components/input-password";
import {InputTextareaComponent} from "@powell/components/input-textarea";
import {IranMapComponent} from "@powell/components/iran-map";
import {KnobComponent} from "@powell/components/knob";
import {ListboxComponent} from "@powell/components/listbox";
import {MapComponent} from "@powell/components/map";
import {MultiSelectComponent} from "@powell/components/multi-select";
import {RadioComponent} from "@powell/components/radio";
import {RatingComponent} from "@powell/components/rating";
import {SelectButtonComponent} from "@powell/components/select-button";
import {SliderComponent} from "@powell/components/slider";
import {ToggleSwitchComponent} from "@powell/components/toggle-switch";
import {ToggleButtonComponent} from "@powell/components/toggle-button";
import {TreeComponent} from "@powell/components/tree";
import {TreeSelectComponent} from "@powell/components/tree-select";
import {EditorComponent} from "@powell/components/editor";
import {takeUntil} from "rxjs";
import {DestroyService} from "@core/utils";

@Component({
  selector: 'ng-dialog-form',
  templateUrl: './dialog-form.component.html',
  styleUrls: ['./dialog-form.component.scss'],
  providers: [DestroyService],
  standalone: false
})
export class DialogFormComponent {
  private el = inject(ElementRef);
  private destroy$ = inject(DestroyService);

  @ViewChild($Dialog, {static: true}) dialog: $Dialog;
  @ViewChild(AutoCompleteComponent) autoCompleteComponent: AutoCompleteComponent;
  @ViewChild(ButtonComponent) buttonComponent: ButtonComponent;
  @ViewChild(CascadeSelectComponent) cascadeSelectComponent: CascadeSelectComponent;
  @ViewChild(CheckboxComponent) checkboxComponent: CheckboxComponent;
  @ViewChild(CheckboxGroupComponent) checkboxGroupComponent: CheckboxGroupComponent;
  @ViewChild(ColorPickerComponent) colorPickerComponent: ColorPickerComponent;
  @ViewChild(SelectComponent) dropdownComponent: SelectComponent;
  @ViewChild(DualLabelSwitchComponent) dualLabelSwitchComponent: DualLabelSwitchComponent;
  @ViewChild(EditorComponent) editorComponent: EditorComponent;
  @ViewChild(FilePickerComponent) filePickerComponent: FilePickerComponent;
  @ViewChild(FilePicker2Component) filePicker2Component: FilePicker2Component;
  @ViewChild(DatepickerComponent) datepickerComponent: DatepickerComponent;
  @ViewChild(ImageComponent) imageComponent: ImageComponent;
  @ViewChild(InputMaskComponent) inputMaskComponent: InputMaskComponent;
  @ViewChild(InputNumberComponent) inputNumberComponent: InputNumberComponent;
  @ViewChild(InputOtpComponent) inputOtpComponent: InputOtpComponent;
  @ViewChild(InputPasswordComponent) inputPasswordComponent: InputPasswordComponent;
  @ViewChild(InputTextComponent) inputTextComponent: InputTextComponent;
  @ViewChild(InputTextareaComponent) inputTextareaComponent: InputTextareaComponent;
  @ViewChild(IranMapComponent) iranMapComponent: IranMapComponent;
  @ViewChild(KnobComponent) knobComponent: KnobComponent;
  @ViewChild(ListboxComponent) listboxComponent: ListboxComponent;
  @ViewChild(MapComponent) mapComponent: MapComponent;
  @ViewChild(MultiSelectComponent) multiSelectComponent: MultiSelectComponent;
  @ViewChild(RadioComponent) radioComponent: RadioComponent;
  @ViewChild(RatingComponent) ratingComponent: RatingComponent;
  @ViewChild(SelectButtonComponent) selectButtonComponent: SelectButtonComponent;
  @ViewChild(SliderComponent) sliderComponent: SliderComponent;
  @ViewChild(ToggleSwitchComponent) toggleSwitchComponent: ToggleSwitchComponent;
  @ViewChild(ToggleButtonComponent) toggleButtonComponent: ToggleButtonComponent;
  @ViewChild(TreeComponent) treeComponent: TreeComponent;
  @ViewChild(TreeSelectComponent) treeSelectComponent: TreeSelectComponent;

  form: FormGroup = new FormGroup({});
  visible: boolean;
  loadingCallback: VoidFunction;
  _config: NgDialogFormConfig[];
  _options: NgDialogFormOptions = {};
  onSubmit = new EventEmitter<NgDialogFormResult>();
  onClose = new EventEmitter<void>();
  disableReject: boolean;
  configTimeout: any;

  set config(value: NgDialogFormConfig[]) {
    this._config = value;
    for (const config of this._config) {
      if (config.key) {
        this.form.addControl(config.key, new FormControl(config.value ?? null, config.validations?.map(v => v.validator) ?? []));
      }
      this.configTimeout = setTimeout(() => {
        this.applyConfigToComponent(config);
      })
    }
  }

  set options(v: NgDialogFormOptions) {
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
    if (this.loadingCallback) {
      this.loadingCallback()
    }
    this.onClose.emit();
    this.handleEvent('onHide');
    clearTimeout(this.configTimeout);
    this.destroy$.next();
  }

  convertToComponentValidation(config: NgDialogFormConfig) {
    const errObj: NgValidation = {};
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
    return errObj as NgValidation;
  }

  finalizeSubmit = (hide: boolean) => {
    this.loadingCallback();
    this.visible = !hide;
    this.disableReject = false;
    if (hide) {
      this.close()
    }
  }

  handleConfigValidations(config: NgDialogFormConfig) {
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

  handleConfigVisibility(config: NgDialogFormConfig) {
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

  handleConfigDisable(config: NgDialogFormConfig) {
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

  handleSubmitDisable() {
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

  onSubmitClick({loadingCallback}: NgAsyncEvent<MouseEvent>) {
    this.form.markAllAsTouched();
    if (this.form.invalid) {
      loadingCallback();
      return;
    }
    this.disableReject = true;
    this.loadingCallback = loadingCallback;
    this.onSubmit.emit({formValue: this.form.value, finalizeSubmit: this.finalizeSubmit})
  }

  handleEvent(event: string, args?: any) {
    this.options[event]?.(args);
  }

  applyConfigToComponent(config: NgDialogFormConfig) {
    const componentsMap: Partial<Record<NgDialogFormComponent, any>> = {
      'auto-complete': this.autoCompleteComponent,
      'button': this.buttonComponent,
      'cascade-select': this.cascadeSelectComponent,
      'checkbox': this.checkboxComponent,
      'checkbox-group': this.checkboxGroupComponent,
      'color-picker': this.colorPickerComponent,
      'select': this.dropdownComponent,
      'dual-label-switch': this.dualLabelSwitchComponent,
      'editor': this.editorComponent,
      'file-picker': this.filePickerComponent,
      'file-picker2': this.filePicker2Component,
      'datepicker': this.datepickerComponent,
      'image': this.imageComponent,
      'input-mask': this.inputMaskComponent,
      'input-number': this.inputNumberComponent,
      'input-otp': this.inputOtpComponent,
      'input-password': this.inputPasswordComponent,
      'input-text': this.inputTextComponent,
      'input-textarea': this.inputTextareaComponent,
      'iran-map': this.iranMapComponent,
      'knob': this.knobComponent,
      'listbox': this.listboxComponent,
      'map': this.mapComponent,
      'multi-select': this.multiSelectComponent,
      'radio': this.radioComponent,
      'rating': this.ratingComponent,
      'select-button': this.selectButtonComponent,
      'slider': this.sliderComponent,
      'toggle-switch': this.toggleSwitchComponent,
      'toggle-button': this.toggleButtonComponent,
      'tree': this.treeComponent,
      'tree-select': this.treeSelectComponent,
    }
    const component = componentsMap[config.component];
    for (const key in config) {
      if (config[key] == undefined) {
        return;
      }
      if (component[key] instanceof EventEmitter) {
        component[key].pipe(takeUntil(this.destroy$)).subscribe((event) => {
          config[key]({
            event,
            form: this.form,
            currentConfig: config,
            allConfig: this.config
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

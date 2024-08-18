import {Component, ElementRef, EventEmitter, inject, ViewChild} from '@angular/core';
import {FormControl, FormGroup, ValidatorFn} from "@angular/forms";
import {NgDialogFormConfig, NgDialogFormOptions, NgDialogFormResult, NgValidation} from "@powell/models";
import {ConfigService} from "@powell/api";
import {PrimeDomHandler} from "@powell/primeng/api";
import {PrimeDialog} from "@powell/primeng";

@Component({
  selector: 'ng-dialog-form',
  templateUrl: './dialog-form.component.html',
  styleUrls: ['./dialog-form.component.scss'],
})
export class DialogFormComponent {
  private el = inject(ElementRef);
  private configService = inject(ConfigService);

  @ViewChild(PrimeDialog, {static: true}) dialog: PrimeDialog;

  form: FormGroup = new FormGroup({});
  visible: boolean;
  loadingCallback: VoidFunction;
  _config: NgDialogFormConfig[];
  _options: NgDialogFormOptions = {};
  onSubmit = new EventEmitter<NgDialogFormResult>();
  onClose = new EventEmitter<void>();
  disableReject: boolean;

  set config(value: NgDialogFormConfig[]) {
    this._config = value;
    for (const config of this._config) {
      config.variant = config.variant ?? this.configService.getConfig().inputStyle;
      config.labelPos = config.labelPos ?? this.configService.getConfig().labelPos;
      config.fixLabelPos = config.fixLabelPos ?? this.configService.getConfig().fixLabelPos;
      config.selectiveSize = config.selectiveSize ?? this.configService.getConfig().inputSize;
      config.showRequiredStar = config.showRequiredStar ?? this.configService.getConfig().showRequiredStar;
      if (config.key) {
        this.form.addControl(config.key, new FormControl(null));
        this.handleConfigValue(config);
        this.handleConfigValidations(config);
      }
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
  }

  handleConfigValue(config: NgDialogFormConfig) {
    const control = this.form.get(config.key);
    if (config.value != null) {
      control.setValue(config.value);
    }
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

  changeDialogVisibilityTo = (visible: boolean) => {
    this.loadingCallback();
    this.visible = visible;
    this.disableReject = false;
    if (!visible) {
      this.close()
    }
  }

  handleConfigEvent(config: NgDialogFormConfig, eventKey: string, eventObj: any) {
    if (config[eventKey]) {
      config[eventKey]({event: eventObj, form: this.form, currentConfig: config, allConfig: this.config});
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
        element = PrimeDomHandler.findSingle(this.el.nativeElement, '.p-dialog-form-reject');
        break;

      case 'accept':
        element = PrimeDomHandler.findSingle(this.el.nativeElement, '.p-dialog-form-accept');
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

  onSubmitClick(loadingCallback: any) {
    this.form.markAllAsTouched();
    if (this.form.invalid) {
      loadingCallback();
      return;
    }
    this.disableReject = true;
    this.loadingCallback = loadingCallback;
    this.onSubmit.emit({formValue: this.form.value, changeDialogVisibilityTo: this.changeDialogVisibilityTo})
  }

  handleEvent(event: string, args?: any) {
    this.options[event]?.(args);
  }
}

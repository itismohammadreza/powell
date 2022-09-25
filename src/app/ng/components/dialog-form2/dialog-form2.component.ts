import {ChangeDetectorRef, Component, EventEmitter, OnInit} from '@angular/core';
import {FormControl, FormGroup, ValidatorFn, Validators} from "@angular/forms";
import {NgDialogFormConfig, NgDialogFormValidation, NgDialogFormOptions, NgDialogFormResult} from "@ng/models/overlay";
import {Subject} from "rxjs";
import {NgValidation} from "@ng/models/forms";

@Component({
  selector: 'ng-dialog-form2',
  templateUrl: './dialog-form2.component.html',
  styleUrls: ['./dialog-form2.component.scss']
})
export class DialogForm2Component {

  constructor(private cd: ChangeDetectorRef) {
  }

  form = new FormGroup({})
  visible: boolean;
  destroy$: Subject<void> = new Subject();
  closeCallback: () => void;
  onSubmit = new EventEmitter<NgDialogFormResult>();
  onClose = new EventEmitter();
  _config: NgDialogFormConfig[];
  _options: NgDialogFormOptions;

  set options(v) {
    this._options = v;
  }

  get options() {
    return this._options
  }

  set config(value) {
    this._config = value;
    for (const config of this._config) {
      if (config.key) {
        this.form.addControl(config.key, new FormControl(null));
        this.handleConfigValue(config);
        this.handleConfigValidations(config);
      }
    }
  }

  get config() {
    return this._config;
  }

  handleConfigValue(config: NgDialogFormConfig) {
    const control = this.form.get(config.key);
    if (config.value != null) {
      control.setValue(config.value);
    }
  }

  handleConfigValidations(config: NgDialogFormConfig) {
    const control = this.form.get(config.key);
    if (config.validations) {
      const validators: ValidatorFn[] = [];
      for (const e of config.validations) {
        switch (e.type) {
          case 'required':
          case 'requiredTrue':
          case 'email':
          case 'nullValidator':
            validators.push(Validators[e.type]);
            break;
          default:
            validators.push(Validators[e.type](e.value));
            break;
        }
      }
      control.setValidators([...validators]);
    }
  }

  convertToComponentValidation(configValidation: NgDialogFormValidation[]): NgValidation {
    const errObj = {};
    for (const e of configValidation) {
      errObj[e.type] = e.message;
    }
    return errObj as NgValidation;
  }

  changeDialogVisibilityTo = (visibility: boolean) => {
    this.closeCallback();
    this.visible = visibility;
    if (!visibility) {
      this.onClose.emit();
    }
  }

  handleConfigEvent(eventKey: string, eventObj: any) {
  }

  onCancelClick() {
    this.visible = false;
    this.onClose.emit();
  }

  onSubmitClick(closeCallback: any) {
    if (this.form.invalid) {
      closeCallback();
      return;
    }
    this.closeCallback = closeCallback;
    this.onSubmit.emit({formValue: this.form.value, changeDialogVisibilityTo: this.changeDialogVisibilityTo})
  }
}

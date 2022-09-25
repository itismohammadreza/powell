import {ChangeDetectorRef, Component, OnInit, Optional, ViewEncapsulation,} from '@angular/core';
import {UntypedFormControl, UntypedFormGroup, ValidatorFn, Validators,} from '@angular/forms';
import {NgDialogFormConfig, NgDialogFormOptions, NgDialogFormRule, NgDialogFormRuleAction,} from '@ng/models/overlay';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {NgValidation} from "@ng/models/forms";
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";

@Component({
  selector: 'dialog-form',
  templateUrl: './dialog-form.component.html',
  styleUrls: ['./dialog-form.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DialogFormComponent implements OnInit {
  form = new UntypedFormGroup({});
  formConfig: NgDialogFormConfig[];
  formOptions: NgDialogFormOptions;
  destroy$: Subject<void> = new Subject();

  constructor(
    @Optional() private dialogConfig: DynamicDialogConfig,
    @Optional() private dialogRef: DynamicDialogRef,
    private cd: ChangeDetectorRef
  ) {
  }

  ngOnInit() {
    this.formConfig = JSON.parse(JSON.stringify(this.dialogConfig.data.config));
    this.formOptions = {
      rtl: true,
      acceptVisible: true,
      acceptIcon: 'pi pi-check',
      acceptColor: 'primary',
      acceptLabel: 'ذخیره',
      acceptAppearance: 'basic',
      rejectVisible: true,
      rejectIcon: 'pi pi-times',
      rejectColor: 'danger',
      rejectLabel: 'لغو',
      rejectAppearance: 'outlined',
      // for overwrite previous values
      ...this.dialogConfig.data.options
    };
    for (const config of this.formConfig) {
      if (config.key) {
        this.form.addControl(config.key, new UntypedFormControl(null));
      }
      if (config.rules) {
        this.form
          .get(config.key)
          .valueChanges.pipe(takeUntil(this.destroy$))
          .subscribe((res) => {
            this.handleRules(config, res);
          });
      }
    }
    for (const config of this.formConfig) {
      if (config.value != null) {
        this.form.get(config.key).setValue(config.value);
        if (config.rules) {
          this.handleRules(config, config.value);
        }
      }
    }
    if (this.formOptions.formValidator) {
      this.form.setValidators(this.formOptions.formValidator.validatorFn);
    }
  }

  handleRules(config: NgDialogFormConfig, value: any) {
    for (const rule of config.rules) {
      if (rule.tobe.some((v) => value == v)) {
        this.applyAction(rule, false);
      } else {
        this.applyAction(rule, true);
      }
    }
    this.cd.detectChanges();
  }

  changeVisibility(config: NgDialogFormConfig, action: NgDialogFormRuleAction) {
    if (config) {
      let control = this.form.get(config.key);
      switch (action) {
        case 'visible':
          config.visible = true;
          if (control.disabled) {
            control.enable();
          }
          break;
        case 'invisible':
          config.visible = false;
          switch (config.component) {
            case 'checkbox':
            case 'switch':
              control.setValue(false);
              break;
            default:
              control.setValue(null);
          }
          if (control.enabled) {
            control.disable();
          }
          break;
      }
    }
  }

  applyAction(rule: NgDialogFormRule, reverse: boolean) {
    let target = this.formConfig.find((c) => c.key == rule.control);
    if (!reverse) {
      switch (rule.action) {
        case 'enable':
          this.form.get(target.key).enable();
          break;
        case 'disable':
          this.form.get(target.key).disable();
          break;
        case 'invisible':
          this.changeVisibility(target, 'invisible');
          break;
        case 'visible':
          this.changeVisibility(target, 'visible');
          break;
      }
    } else {
      switch (rule.action) {
        case 'enable':
          this.form.get(target.key).disable();
          break;
        case 'disable':
          this.form.get(target.key).enable();
          break;
        case 'invisible':
          this.changeVisibility(target, 'visible');
          break;
        case 'visible':
          this.changeVisibility(target, 'invisible');
          break;
      }
    }
  }

  getValidatorErrors(config: NgDialogFormConfig) {
    const errObj = {};
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
      errObj[e.type] = e.message;
    }
    this.form.controls[config.key].setValidators([...validators]);
    return errObj as NgValidation;
  }

  onSubmit() {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
      this.destroy$.next();
      this.destroy$.unsubscribe();
    }
  }

  onCancel() {
    this.dialogRef.close(null);
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }
}

import {Component, inject} from '@angular/core';
import {DialogFormOptions} from "@powell/models";
import {FormControl, Validators} from "@angular/forms";
import {takeUntil} from "rxjs";
import {ButtonModule} from "@powell/components/button";
import {PreviewBase, PreviewComponent, PreviewOption} from "@pages/showcase/components";
import {DestroyService} from "@powell/utils";

@Component({
  selector: 'app-dialog-form-page',
  templateUrl: './dialog-form.page.html',
  imports: [
    ButtonModule,
    PreviewComponent
  ],
  providers: [DestroyService],
})
export class DialogFormPage extends PreviewBase {
  private destroy$ = inject(DestroyService);

  override previewOptions: PreviewOption[] = [
    {field: 'header', value: 'Dialog'},
    {field: 'draggable', value: false},
    {field: 'resizable', value: false},
    {field: 'modal', value: true},
    {field: 'position', selectOptions: 'dialogPositions', value: 'center'},
    {field: 'blockScroll', value: false},
    {field: 'closeOnEscape', value: false},
    {field: 'dismissableMask', value: false},
    {field: 'closable', value: true},
    {field: 'showHeader', value: true},
    {field: 'maximizable', value: true},
    {field: 'acceptVisible', value: true},
    {field: 'rejectVisible', value: true},
    {field: 'rtl', value: this.config.rtl},
    {field: 'defaultFocus', selectOptions: 'defaultFocusTypes', value: 'accept'},
  ];

  dialogForm: DialogFormOptions = {
    header: 'Dialog',
    draggable: false,
    resizable: false,
    modal: true,
    position: 'center',
    blockScroll: false,
    closeOnEscape: false,
    dismissableMask: false,
    closable: true,
    showHeader: true,
    maximizable: true,
    acceptVisible: true,
    rejectVisible: true,
    defaultFocus: 'accept',
    rtl: this.config.rtl
  }

  flag = true;

  override onOptionChange(event: PreviewOption) {
    this.dialogForm[event.field] = event.value;
  }

  showDialogForm() {
    this.overlayService.showDialogForm(
      [
        {
          component: 'input-text',
          key: 'name',
          label: 'Firstname',
          labelWidth: 150,
          fluid: true,
          validations: [
            {type: 'required', validator: Validators.required, message: 'is required'},
            {
              type: 'minlength',
              validator: Validators.minLength(5),
              message: (control) => {
                return `${control.value} is not a valid length`
              }
            },
            {type: 'akbarDenied', validator: this.akbarValidator, message: 'akbar denied'}
          ],
          value: 'Default value',
          onInput: (eventObj) => {
            const {event, form, currentConfig, allConfig} = eventObj;
            allConfig.find(x => x.key == 'book').options = [];
            if (event.target.value == '2') {
              form.get('book').disable();
              allConfig.find(x => x.key == 'book').hidden = false;
            } else {
              form.get('book').enable();
              allConfig.find(x => x.key == 'book').hidden = true;
            }
          },
          hidden: false
        },
        {
          component: 'datepicker',
          key: 'birthdate',
          label: 'Birthdate',
          labelWidth: 150,
          touchUI: false,
          showTime: true,
        },
        {
          component: 'multi-select',
          key: 'book',
          label: 'Book',
          labelWidth: 150,
          validations: [
            {type: 'required', validator: Validators.required, message: 'is required'},
          ],
          options: this.options
        }
      ],
      {
        ...this.dialogForm,
        style: {width: '800px'},
        containerStyleClass: 'grid gap-x-3 grid-cols-2',
        acceptButtonProps: {label: 'Accept'},
        rejectButtonProps: {label: 'Close'},
        submitDisabled: ({form}) => form.invalid,
        formValidator: {
          validator: (group) => {
            return group.get('name').invalid ? {invalidGr: true} : null
          },
          type: 'invalidGr',
          message: 'Form is not valid',
          style: {textAlign: 'center', marginTop: '1rem'}
        },
      }).pipe(takeUntil(this.destroy$)).subscribe(res => {
      if (!res) {
        return;
      }
      const {formValue, finalizeSubmit} = res;
      this.flag = !this.flag;
      alert(JSON.stringify(formValue));
      setTimeout(() => {
        finalizeSubmit(this.flag)
      }, 1000)
    })
  }

  akbarValidator(control: FormControl) {
    return control.value == 'akbar' ? {akbarDenied: true} : null
  }
}

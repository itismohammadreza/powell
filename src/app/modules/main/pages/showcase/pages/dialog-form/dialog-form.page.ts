import {Component, inject} from '@angular/core';
import {OverlayService} from "@powell/api";
import {NgDialogFormOptions} from "@powell/models";
import {FormControl, Validators} from "@angular/forms";
import {takeUntil} from "rxjs";
import {DestroyService} from "@core/utils";
import {ButtonModule} from "@powell/components/button";
import {ExtrasModule} from "@modules/main/pages/showcase/extras.module";
import {
  PreviewOptionsComponent
} from "@modules/main/pages/showcase/components/preview-options/preview-options.component";

@Component({
  selector: 'ng-dialog-form-page',
  templateUrl: './dialog-form.page.html',
  styleUrls: ['./dialog-form.page.scss'],
  providers: [DestroyService],
  imports: [
    ButtonModule,
    ExtrasModule,
    PreviewOptionsComponent
  ]
})
export class DialogFormPage {
  private overlayService = inject(OverlayService);
  private destroy$ = inject(DestroyService);

  dialogForm: NgDialogFormOptions = {
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
    buttonFull: false,
    buttonSize: 'small',
    acceptAppearance: 'basic',
    acceptSeverity: 'primary',
    acceptVisible: true,
    acceptLabel: 'تایید',
    acceptIcon: '',
    rejectAppearance: 'outlined',
    rejectSeverity: 'danger',
    rejectVisible: true,
    rejectLabel: 'لغو',
    rejectIcon: '',
    defaultFocus: 'accept',
    buttonIconPosition: 'left'
  }

  flag = true;

  showDialogForm() {
    this.overlayService.showDialogForm(
      [
        {
          component: 'input-text',
          key: 'name',
          label: 'first name',
          labelWidth: 150,
          validations: [
            {type: 'required', validator: Validators.required, message: 'is required'},
            {
              type: 'minlength',
              validator: Validators.minLength(2),
              message: (control) => {
                return `${control.value} is not a valid length`
              }
            },
            {type: 'akbarDenied', validator: this.akbarValidator, message: 'akbar denied'}
          ],
          value: '33333',
          onInput: (eventObj) => {
            // const {event, form, currentConfig, allConfig} = eventObj;
            // allConfig.find(x => x.key == 'book').options = []
            // if (event.target.value == '2') {
            //   form.get('book').disable();
            //   currentConfig.label = '123';
            //   allConfig.find(x => x.key == 'book').hidden = false
            // } else {
            //   form.get('book').enable()
            //   currentConfig.label = '456';
            //   allConfig.find(x => x.key == 'book').hidden = true
            // }
          },
          hidden: false
        },
        {
          component: 'datepicker',
          key: 'birthdate',
          label: 'birthdate',
          labelWidth: 150,
          touchUI: false,
          showTime: true,
        },
        {
          component: 'multi-select',
          key: 'book',
          label: 'book',
          labelWidth: 150,
          validations: [
            {type: 'required', validator: Validators.required, message: 'is required'},
          ],
          options: [
            {label: 'book1', value: 'book1'},
            {label: 'book2', value: 'book2'},
            {label: 'book3', value: 'book3'},
            {label: 'book4', value: 'book4'},
          ]
        }
      ],
      {
        ...this.dialogForm,
        style: {width: '800px'},
        submitDisabled: ({form}) => form.invalid,
        formValidator: {
          validator: (group) => {
            return group.get('name').invalid ? {invalidGr: true} : null
          },
          type: 'invalidGr',
          message: 'فرم نامعتبر است',
          style: {textAlign: 'center'}
        },
      }).pipe(takeUntil(this.destroy$)).subscribe(res => {
      if (!res) {
        return
      }
      const {formValue, finalizeSubmit} = res;
      this.flag = !this.flag;
      console.log('Do what ever with form value: ', formValue)
      setTimeout(() => {
        finalizeSubmit(this.flag)
      }, 2000)
    })
  }

  akbarValidator(control: FormControl) {
    return control.value == 'akbar' ? {akbarDenied: true} : null
  }
}

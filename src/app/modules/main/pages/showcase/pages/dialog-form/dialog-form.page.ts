import {Component} from '@angular/core';
import {ConfigService, OverlayService} from "@powell/api";
import {NgDialogFormOptions} from "@powell/models";
import {FormControl, Validators} from "@angular/forms";
import {takeUntil} from "rxjs";
import {DestroyService} from "@core/utils";

@Component({
  selector: 'ng-dialog-form-page',
  templateUrl: './dialog-form.page.html',
  styleUrls: ['./dialog-form.page.scss'],
  providers: [DestroyService]
})
export class DialogFormPage {
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
    buttonSize: 'md',
    acceptAppearance: 'basic',
    acceptColor: 'primary',
    acceptVisible: true,
    acceptLabel: 'تایید',
    acceptIcon: '',
    rejectAppearance: 'outlined',
    rejectColor: 'danger',
    rejectVisible: true,
    rejectLabel: 'لغو',
    rejectIcon: '',
    defaultFocus: 'accept',
    rtl: this.configService.getConfig().rtl,
  }

  flag = false;

  constructor(private overlayService: OverlayService,
              private configService: ConfigService,
              private destroy$: DestroyService) {
  }

  showDialogForm() {
    this.overlayService.showDialogForm(
      [
        {
          component: 'jalali-datepicker',
          key: 'birthdate',
          className: 'col-12',
          label: 'birthdate',
          labelWidth: 150,
          touchUI: true,
          showTime: true,
        },
        {
          component: 'input-text',
          key: 'name',
          className: 'col-12',
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
          component: 'multi-select',
          key: 'book',
          className: 'col-12',
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
        header: this.dialogForm.header,
        draggable: this.dialogForm.draggable,
        resizable: this.dialogForm.resizable,
        modal: this.dialogForm.modal,
        position: this.dialogForm.position,
        blockScroll: this.dialogForm.blockScroll,
        closeOnEscape: this.dialogForm.closeOnEscape,
        dismissableMask: this.dialogForm.dismissableMask,
        closable: this.dialogForm.closable,
        showHeader: this.dialogForm.showHeader,
        maximizable: this.dialogForm.maximizable,
        buttonFull: this.dialogForm.buttonFull,
        buttonSize: this.dialogForm.buttonSize,
        acceptAppearance: this.dialogForm.acceptAppearance,
        acceptColor: this.dialogForm.acceptColor,
        acceptVisible: this.dialogForm.acceptVisible,
        acceptLabel: this.dialogForm.acceptLabel,
        acceptIcon: this.dialogForm.acceptIcon,
        rejectAppearance: this.dialogForm.rejectAppearance,
        rejectColor: this.dialogForm.rejectColor,
        rejectVisible: this.dialogForm.rejectVisible,
        rejectLabel: this.dialogForm.rejectLabel,
        rejectIcon: this.dialogForm.rejectIcon,
        rtl: this.dialogForm.rtl,
        style: {width: '800px'},
        defaultFocus: this.dialogForm.defaultFocus,
        containerStyleClass: 'row',
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
      const {formValue, changeDialogVisibilityTo} = res;
      this.flag = !this.flag;
      console.log('Do what ever with form value: ', formValue)
      setTimeout(() => {
        changeDialogVisibilityTo(this.flag)
      }, 2000)
    })
  }

  akbarValidator(control: FormControl) {
    return control.value == 'akbar' ? {akbarDenied: true} : null
  }
}

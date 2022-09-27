import {Component, OnInit} from '@angular/core';
import {OverlayService} from "@ng/services";
import {NgDialogFormOptions, NgDialogOptions} from "@ng/models/overlay";
import {FormControl, Validators} from "@angular/forms";

@Component({
  selector: 'ng-dialog-form-page',
  templateUrl: './dialog-form.page.html',
  styleUrls: ['./dialog-form.page.scss']
})
export class DialogFormPage implements OnInit {

  constructor(private overlayService: OverlayService) {
  }

  ngOnInit(): void {
  }

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
    rtl: false,
  }
  flag = false;

  showDialogForm() {
    this.overlayService.showDialogForm(
      [
        {
          component: 'input-text',
          key: 'name',
          label: 'first name',
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
          label: 'book',
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
        submitDisabled: ({form}) => form.invalid,
        formValidator: {
          validator: (group) => {
            return group.get('name').invalid ? {invalidGr: true} : null
          },
          type: 'invalidGr',
          message: 'فرم نامعتبر است',
          style: {textAlign: 'center'}
        }
      }).subscribe(res => {
      const {formValue, changeDialogVisibilityTo} = res;
      this.flag = !this.flag;
      console.log('fo what ever with form value: ', formValue)
      setTimeout(() => {
        changeDialogVisibilityTo(this.flag)
      }, 2000)
    })
  }

  akbarValidator(control: FormControl) {
    return control.value == 'akbar' ? {akbarDenied: true} : null
  }
}

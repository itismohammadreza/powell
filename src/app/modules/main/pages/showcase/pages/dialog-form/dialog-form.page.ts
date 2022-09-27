import {Component, OnInit} from '@angular/core';
import {OverlayService} from "@ng/services";

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

  flag = false;
  rtl: boolean = false;

  showDialogForm() {
    this.overlayService.showDialogForm(
      [
        {
          component: 'input-text',
          key: 'name',
          label: 'first name',
          validations: [
            {type: 'required', message: 'is required'},
            {type: 'minLength', message: 'at least enter 2 characters', value: 2}
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
            {type: 'required', message: 'is required'},
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
        header: 'dialog form',
        rtl: this.rtl,
        buttonFull: true,
        style: {width: '800px'},
        submitDisabled: (({form}) => form.invalid),
        formValidator: {
          validatorFn: (group) => {
            return group.get('name').invalid ? {invalidGr: true} : null
          },
          message: 'فرم نامعتبر است',
          error: 'invalidGr',
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
}

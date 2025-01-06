import {Component, inject} from '@angular/core';
import {NgDialogFormOptions} from "@powell/models";
import {FormControl, Validators} from "@angular/forms";
import {takeUntil} from "rxjs";
import {ButtonModule} from "@powell/components/button";
import {PreviewBase, PreviewComponent, PreviewOption} from "@modules/main/pages/showcase/components";
import {DestroyService} from "@core/utils";

@Component({
  selector: 'ng-dialog-form-page',
  templateUrl: './dialog-form.page.html',
  styleUrls: ['./dialog-form.page.scss'],
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
    {field: 'position', value: 'center'},
    {field: 'blockScroll', value: false},
    {field: 'closeOnEscape', value: false},
    {field: 'dismissableMask', value: false},
    {field: 'closable', value: true},
    {field: 'showHeader', value: true},
    {field: 'maximizable', value: true},
    {field: 'buttonFull', value: false},
    {field: 'buttonSize', value: 'small'},
    {field: 'acceptAppearance', value: 'basic'},
    {field: 'acceptSeverity', value: 'primary'},
    {field: 'acceptVisible', value: true},
    {field: 'acceptLabel', value: 'تایید'},
    {field: 'acceptIcon', value: ''},
    {field: 'rejectAppearance', value: 'outlined'},
    {field: 'rejectSeverity', value: 'danger'},
    {field: 'rejectVisible', value: true},
    {field: 'rejectLabel', value: 'لغو'},
    {field: 'rejectIcon', value: ''},
    {field: 'defaultFocus', value: 'accept'},
    {field: 'buttonIconPosition', value: 'left'},
  ];

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

  override onOptionChange(event: any) {
    this.dialogForm[event.field] = event.value;
  }

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
          options: this.options
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

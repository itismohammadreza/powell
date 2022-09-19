import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {NgDialogFormResult} from "@ng/models/overlay";

@Component({
  selector: 'ng-dialog-form2',
  templateUrl: './dialog-form2.component.html',
  styleUrls: ['./dialog-form2.component.scss']
})
export class DialogForm2Component implements OnInit {

  constructor() {
  }

  @Output() onSubmit = new EventEmitter<NgDialogFormResult>()

  form = new FormGroup({
    c1: new FormControl(null, Validators.required)
  })
  visible: boolean;
  closeCallback: () => void;

  ngOnInit(): void {
  }

  onClick(closeCallback: any) {
    if (this.form.invalid) {
      closeCallback();
      return;
    }
    this.closeCallback = closeCallback;
    this.onSubmit.emit({formValue: this.form.value, changeDialogVisibilityTo: this.changeDialogVisibilityTo})
  }

  changeDialogVisibilityTo = (closeDialog: boolean) => {
    this.closeCallback();
    this.visible = closeDialog;
  }
}

import {Directive, Host, Input, OnInit, Optional, SkipSelf, ViewContainerRef} from '@angular/core';
import {ControlContainer, FormGroupDirective, NgControl, UntypedFormControl, Validators} from '@angular/forms';
import {InputTextComponent} from '@ng/components/input-text/input-text.component';
import {InputNumberComponent} from '@ng/components/input-number/input-number.component';

@Directive({
  selector: '[ngDynamicForm]'
})
export class DynamicFormDirective implements OnInit {
  @Input() ngDynamicForm;
  
  elements = {
    text: InputTextComponent,
    number: InputNumberComponent
  };

  constructor(@Optional() @Host() @SkipSelf() private parent: ControlContainer,
              private ngControl: NgControl,
              private vcRef: ViewContainerRef) {
  }

  ngOnInit() {
    const cmpRef = this.vcRef.createComponent<any>(this.elements[this.ngDynamicForm.type]);
    (this.parent.formDirective as FormGroupDirective).form.addControl(this.ngDynamicForm.formControlName, new UntypedFormControl('', [Validators.required]));
    setTimeout(() => {
      cmpRef.instance.ngControl = this.ngControl;
      cmpRef.instance.ngControl.control = (this.parent.formDirective as FormGroupDirective).form.get(this.ngDynamicForm.formControlName);
      cmpRef.instance.errors = {required: 'req'};
    }, 1000);
  }
}

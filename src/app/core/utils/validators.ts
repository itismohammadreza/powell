import {FormGroup, Validators} from "@angular/forms";

export const samePasswordsValidator = (passwordField: string, confirmPasswordField: string) => {
  return (group: FormGroup) => {
    const pass = group.get(passwordField);
    const confirmPass = group.get(confirmPasswordField);
    return (pass.dirty && confirmPass.dirty) && (pass.value !== confirmPass.value) ? {notSame: true} : null;
  }
}

export const phoneValidator = Validators.pattern(/^(?:0|98|\+98|\+980|0098|098|00980)?(9\d{9})$/);

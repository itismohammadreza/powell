import {Component} from '@angular/core';
import {AbstractControl, UntypedFormControl, UntypedFormGroup, ValidationErrors, Validators} from '@angular/forms';
import {LanguageChecker} from '@core/utils';
import {AuthService} from '@core/http';
import {Router} from '@angular/router';

@Component({
  selector: 'ng-register-page',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage extends LanguageChecker {
  constructor(private authService: AuthService, private router: Router) {
    super();
  }

  form = new UntypedFormGroup({
    email: new UntypedFormControl(null, [Validators.required, Validators.email]),
    password: new UntypedFormControl(null, [Validators.required]),
    confirmPassword: new UntypedFormControl(null, [Validators.required]),
  }, {validators: this.checkPasswords});

  async onSubmit(callback: any) {
    if (this.form.valid) {
      try {
        await this.authService.register(this.form.value);
        callback();
        this.router.navigate(['/auth/login']);
      } catch (e) {
        callback()
      }
    }
  }

  checkPasswords(group: AbstractControl): ValidationErrors | null {
    const pass = group.get('password').value;
    const confirmPass = group.get('confirmPassword').value;
    return pass === confirmPass ? null : {notSame: true};
  }
}

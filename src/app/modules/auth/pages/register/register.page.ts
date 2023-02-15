import {Component} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {LanguageChecker} from '@core/utils';
import {AuthService} from '@core/http';
import {Router} from '@angular/router';

@Component({
  selector: 'ng-register-page',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage extends LanguageChecker {
  form = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required]),
    confirmPassword: new FormControl(null, [Validators.required]),
  }, {validators: this.checkPasswords});

  constructor(private authService: AuthService, private router: Router) {
    super();
  }

  async onSubmit(callback: any) {
    if (this.form.valid) {
      callback()
      return;
    }
    try {
      await this.authService.register(this.form.value);
      callback();
      this.router.navigate(['/auth/login']);
    } catch (e) {
      callback()
    }
  }

  checkPasswords(group: AbstractControl): ValidationErrors | null {
    const pass = group.get('password').value;
    const confirmPass = group.get('confirmPassword').value;
    return pass === confirmPass ? null : {notSame: true};
  }
}

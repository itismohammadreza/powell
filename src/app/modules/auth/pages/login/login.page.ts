import {Component} from '@angular/core';
import {UntypedFormControl, UntypedFormGroup, Validators} from '@angular/forms';
import {LanguageChecker} from '@core/utils';
import {AuthService} from '@core/http';
import {Router} from '@angular/router';

@Component({
  selector: 'ng-login-page',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage extends LanguageChecker {
  form = new UntypedFormGroup({
    email: new UntypedFormControl(null, [Validators.required, Validators.email]),
    password: new UntypedFormControl(null, [Validators.required]),
    rememberMe: new UntypedFormControl(false),
  });

  constructor(private authService: AuthService, private router: Router) {
    super();
  }

  async onSubmit(callback: any) {
    if (this.form.valid) {
      callback()
      return;
    }
    try {
      const res = await this.authService.login(this.form.value);
      callback();
      localStorage.setItem('token', res.token);
      this.router.navigate(['/dashboard']);
    } catch (e) {
      callback();
    }
  }
}

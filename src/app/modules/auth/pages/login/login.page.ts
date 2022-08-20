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
  constructor(private authService: AuthService, private router: Router) {
    super();
  }

  form = new UntypedFormGroup({
    email: new UntypedFormControl(null, [Validators.required, Validators.email]),
    password: new UntypedFormControl(null, [Validators.required]),
    rememberMe: new UntypedFormControl(false),
  });

  onSubmit() {
    const formValue = this.form.value;
    if (this.form.valid) {
      this.authService
        .login({
          email: formValue.email, password: formValue.password,
        })
        .subscribe((res: any) => {
          if (res?.token) {
            if (formValue.rememberMe) {
              localStorage.setItem('token', res.token);
            } else {
              sessionStorage.setItem('token', res.token);
            }
            this.router.navigate(['/dashboard']);
          }
        });
    }
  }
}

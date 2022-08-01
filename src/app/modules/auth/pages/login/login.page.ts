import {Component, OnInit} from '@angular/core';
import {UntypedFormGroup, UntypedFormControl, Validators} from '@angular/forms';
import {LanguageChecker} from '@core/utils';
import {AuthService} from '@core/http';
import {Router} from '@angular/router';

@Component({
  selector: 'ng-login-page',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage extends LanguageChecker implements OnInit {
  constructor(private authService: AuthService, private router: Router) {
    super();
  }

  form = new UntypedFormGroup({
    email: new UntypedFormControl(null, [Validators.required, Validators.email]),
    password: new UntypedFormControl(null, [Validators.required]),
    rememberMe: new UntypedFormControl(false),
  });

  ngOnInit(): void {
  }

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

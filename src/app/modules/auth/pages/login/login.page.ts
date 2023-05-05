import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '@core/http';
import {Router} from '@angular/router';

@Component({
  selector: 'ng-login-page',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  form = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required]),
    rememberMe: new FormControl(false),
  });

  constructor(private authService: AuthService, private router: Router) {
  }

  async onSubmit(callback: any) {
    if (this.form.invalid) {
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

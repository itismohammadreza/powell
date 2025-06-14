import {Component, inject} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '@core/http';
import {Router} from '@angular/router';

@Component({
  selector: 'login-page',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false
})
export class LoginPage {
  private authService = inject(AuthService);
  private router = inject(Router);

  form = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required]),
    rememberMe: new FormControl(false),
  });

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

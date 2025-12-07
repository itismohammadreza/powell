import {Component, inject} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthService} from '@core/http';
import {Router} from '@angular/router';
import {InputTextModule} from '@powell/components/input-text';
import {ButtonModule} from '@powell/components/button';
import {CheckboxModule} from '@powell/components/checkbox';
import {LogoComponent} from '@layout/logo/logo.component';

@Component({
  selector: 'app-login-page',
  templateUrl: './login.page.html',
  imports: [
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    CheckboxModule,
    LogoComponent
  ]
})
export class LoginPage {
  private authService = inject(AuthService);
  private router = inject(Router);

  form = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required]),
    rememberMe: new FormControl(false),
  });

  async onSubmit(callback: SafeAny) {
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

import {Component, inject} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthService} from '@core/http';
import {Router} from '@angular/router';
import {samePasswordsValidator} from "@core/utils";
import {InputTextModule} from '@powell/components/input-text';
import {ButtonModule} from '@powell/components/button';
import {CheckboxModule} from '@powell/components/checkbox';
import {LogoComponent} from '@layout/logo/logo.component';

@Component({
  selector: 'app-register-page',
  templateUrl: './register.page.html',
  imports: [
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    CheckboxModule,
    LogoComponent
  ]
})
export class RegisterPage {
  private authService = inject(AuthService);
  private router = inject(Router);

  form = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required]),
    confirmPassword: new FormControl(null, [Validators.required]),
  }, {validators: samePasswordsValidator('password', 'confirmPassword')});

  async onSubmit(callback: SafeAny) {
    if (this.form.invalid) {
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
}

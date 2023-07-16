import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '@core/http';
import {Router} from '@angular/router';
import {samePasswordsValidator} from "@core/utils";

@Component({
  selector: 'ng-register-page',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  form = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required]),
    confirmPassword: new FormControl(null, [Validators.required]),
  }, {validators: samePasswordsValidator('password', 'confirmPassword')});

  constructor(private authService: AuthService, private router: Router) {
  }

  async onSubmit(callback: any) {
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

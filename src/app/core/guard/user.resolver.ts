import {inject} from '@angular/core';
import {ResolveFn} from '@angular/router';
import {AuthService} from '@core/http';

export const userResolver: ResolveFn<SafeAny> = async () => {
  const authService = inject(AuthService);
  const {user} = await authService.getProfile();
  authService.currentUser = user;
  return authService.currentUser;
}

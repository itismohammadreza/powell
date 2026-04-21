import {inject} from '@angular/core';
import {ResolveFn} from '@angular/router';
import {DataService} from '@core/http';

export const userResolver: ResolveFn<SafeAny> = async () => {
  const dataService = inject(DataService);
  const {user} = await dataService.getProfile();
  dataService.currentUser = user;
  return dataService.currentUser;
}

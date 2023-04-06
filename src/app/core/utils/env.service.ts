import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EnvService {
  // The values that are defined here are the default values that can be overridden by env.js
  apiUrl = '';
}

export const EnvServiceProvider = {
  provide: EnvService,
  useFactory: () => {
    const env = new EnvService();
    const browserWindow = window || {};
    const browserWindowEnv = browserWindow['__env'] || {};
    for (const key in browserWindowEnv) {
      if (browserWindowEnv.hasOwnProperty(key)) {
        env[key] = window['__env'][key];
      }
    }
    return env;
  },
  deps: [],
};

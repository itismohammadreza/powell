import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EnvService {
  // The values that are defined here are the default values that can be overridden by env.js
  apiUrl = 'https://vcdemoapi.iranlms.ir/api/v1';
  socketUrl: 'wss://vcdemoapi.iranlms.ir/ws/v1';

  constructor() {
  }
}

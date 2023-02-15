import {Injector} from '@angular/core';
import {NgConfig} from "@ng/models/config";

export class NgGlobal {
  private static _config: NgConfig;

  static Injector: Injector;

  static set config(config: NgConfig) {
    this._config = config
  }

  static get config() {
    return this._config
  }
}

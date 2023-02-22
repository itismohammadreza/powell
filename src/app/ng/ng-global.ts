import {Injector} from '@angular/core';
import {NgConfig} from "@ng/models/config";

export class NgGlobal {
  private static _config: NgConfig = {
    ripple: true,
    rtl: true,
    fixLabelPos: 'fix-side',
    labelPos: 'fix-side',
    theme: 'lara-light-indigo',
    filled: false,
    inputSize: 'sm',
    showRequiredStar: false
  };

  static Injector: Injector;

  static set config(config: NgConfig) {
    this._config = {...this._config, ...config}
  }

  static get config() {
    return this._config
  }
}

import {Inject, Injectable} from '@angular/core';
import {NgConfig} from "@ng/models/config";
import {PrimeNGConfig} from "primeng/api";
import {ThemeService} from "@ng/services/theme.service";
import {DOCUMENT} from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  constructor(private primengConfig: PrimeNGConfig,
              private themeService: ThemeService,
              @Inject(DOCUMENT) private document: Document) {
  }

  private _config: NgConfig = {
    ripple: true,
    rtl: true,
    fixLabelPos: 'fix-side',
    labelPos: 'fix-side',
    theme: 'lara-light-indigo',
    filled: false,
    inputSize: 'lg',
    showRequiredStar: false
  };

  setConfig(config: NgConfig) {
    this._config = {...this._config, ...config};
    this.primengConfig.ripple = this._config.ripple;
    if (!this._config.ripple) {
      this.document.body.classList.add('p-ripple-disabled');
    } else {
      this.document.body.classList.remove('p-ripple-disabled');
    }
  }

  getConfig() {
    return this._config
  }
}

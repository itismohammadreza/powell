import {Inject, Injectable} from '@angular/core';
import {NgConfig, NgConfigChangeEvent} from "@ng/models/config";
import {PrimeNGConfig} from "primeng/api";
import {ThemeService} from "@ng/services/theme.service";
import {DOCUMENT} from "@angular/common";
import {Subject} from "rxjs";

@Injectable()
export class ConfigService {
  constructor(private primengConfig: PrimeNGConfig,
              private themeService: ThemeService,
              @Inject(DOCUMENT) private document: Document) {
  }

  private configChangeSubject = new Subject<NgConfigChangeEvent>();
  configChange$ = this.configChangeSubject.asObservable();

  private _config: NgConfig = {
    disableConfigChangeEffect: false,
    rtl: true,
    fixLabelPos: 'fix-side',
    labelPos: 'fix-side',
    filled: false,
    inputSize: 'lg',
    showRequiredStar: true,
    theme: 'lara-light-indigo',
    ripple: true,
    overlayOptions: {}
  };

  setConfig(config: NgConfig) {
    this._config = {...this._config, ...config};
    this.primengConfig.ripple = this._config.ripple;
    this.primengConfig.overlayOptions = this._config.overlayOptions;
    if (this._config.ripple === false) {
      this.document.body.classList.add('p-ripple-disabled');
    } else {
      this.document.body.classList.remove('p-ripple-disabled');
    }
    if (config?.theme) {
      this.themeService.changeTheme(config.theme)
    }
    this.configChangeSubject.next({currentConfig: this._config, modifiedConfig: config});
    this.handleBodyClasses();
  }

  getConfig() {
    return this._config
  }

  private handleBodyClasses() {
    const toKebabCase = (test: string) => {
      return test.split(/(?=[A-Z])/).join('-').toLowerCase();
    }
    Object.entries(this._config).forEach(([key, value]) => {
      key = toKebabCase(key);
      if (typeof value == 'boolean') {
        if (value) {
          this.document.body.classList.add(`ng-${key}`)
        } else {
          this.document.body.classList.remove(`ng-${key}`)
        }
      } else if (typeof value != 'object') {
        this.document.body.classList.add(`ng-${key}-${value}`)
      }
    })
  }
}

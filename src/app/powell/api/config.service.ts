import {Inject, Injectable} from '@angular/core';
import {DOCUMENT} from "@angular/common";
import {Subject} from "rxjs";
import {NgConfig, NgConfigChangeEvent} from "@powell/models";
import {ThemeService} from "@powell/api";
import {PrimeConfig} from "@powell/primeng/api";

// DON'T provide anywhere. will provide automatically after `initiateNgConfigProvider` call.
@Injectable()
export class ConfigService {
  constructor(private primengConfig: PrimeConfig,
              private themeService: ThemeService,
              @Inject(DOCUMENT) private document: Document) {
  }

  private _config: NgConfig = {
    disableConfigChangeEffect: false,
    rtl: false,
    fixLabelPos: 'fix-side',
    labelPos: 'fix-side',
    filled: false,
    inputSize: 'sm',
    showRequiredStar: true,
    theme: 'lara-light-indigo',
    ripple: true,
    zIndex: {
      modal: 1100,
      overlay: 1000,
      menu: 1000,
      tooltip: 1100
    },
    translation: {},
    overlayOptions: {}
  };
  private configChangeSubject = new Subject<NgConfigChangeEvent>();
  configChange$ = this.configChangeSubject.asObservable();

  setConfig(config: NgConfig) {
    this._config = {...this._config, ...config};
    this.primengConfig.zIndex = this._config.zIndex;
    this.primengConfig.ripple = this._config.ripple;
    this.primengConfig.overlayOptions = this._config.overlayOptions;
    if (this._config.ripple === false) {
      this.document.body.classList.add('p-ripple-disabled');
    } else {
      this.document.body.classList.remove('p-ripple-disabled');
    }
    if (this._config.translation) {
      this.primengConfig.setTranslation(this._config.translation)
    }
    this.document.documentElement.setAttribute('dir', this._config.rtl ? 'rtl' : 'ltr');
    this.themeService.initTheme();
    this.themeService.changeTheme(this._config.theme);
    this.handleBodyClasses();
    this.configChangeSubject.next({currentConfig: this._config, modifiedConfig: config});
  }

  getConfig() {
    return this._config;
  }

  private handleBodyClasses() {
    const toKebabCase = (test: string) => {
      return test.split(/(?=[A-Z])/).join('-').toLowerCase();
    }
    const bodyClasses = this.document.body.classList.value.split(" ");
    Object.entries(this._config).filter(c => typeof c[1] != 'object').forEach(([key, value]) => {
      key = toKebabCase(key);
      const foundedClass = bodyClasses.find(c => c.includes(key));
      let newClass;
      if (typeof value == 'boolean') {
        if (value) {
          newClass = `ng-${key}`;
        } else {
          this.document.body.classList.remove(`ng-${key}`);
        }
      } else {
        newClass = `ng-${key}-${value}`;
      }
      if (foundedClass) {
        this.document.body.classList.replace(foundedClass, newClass);
      } else if (newClass) {
        this.document.body.classList.add(newClass);
      }
    })
  }
}

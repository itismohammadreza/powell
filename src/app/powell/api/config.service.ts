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

  private configChangeSubject = new Subject<NgConfigChangeEvent>();
  configChange$ = this.configChangeSubject.asObservable();

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
    overlayOptions: {}
  };

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
    this.themeService.initTheme();
    this.themeService.changeTheme(this._config.theme);
    this.handleBootstrapFiles();
    this.configChangeSubject.next({currentConfig: this._config, modifiedConfig: config});
    this.handleBodyClasses();
  }

  getConfig() {
    return this._config;
  }

  private handleBootstrapFiles() {
    let bootStrapLinkEl: any = this.document.querySelector('#bootstrap-style-link');
    if (!bootStrapLinkEl) {
      const head = this.document.querySelector('head');
      bootStrapLinkEl = this.document.createElement('link');
      bootStrapLinkEl.id = "bootstrap-style-link";
      bootStrapLinkEl.rel = "stylesheet";
      bootStrapLinkEl.type = "text/css";
      head.appendChild(bootStrapLinkEl);
    }
    const themeLink = `assets/styles/vendor/bootstrap/bootstrap${this._config.rtl ? '.rtl' : ''}.css`;
    bootStrapLinkEl.setAttribute('href', themeLink);
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

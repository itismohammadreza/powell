import {inject, Injectable} from '@angular/core';
import {DOCUMENT} from "@angular/common";
import {Subject, takeUntil} from "rxjs";
import {NgConfig, NgConfigChangeEvent} from "@powell/models";
import {ThemeService} from "@powell/api";
import {PrimeConfig} from "@powell/primeng/api";

// DON'T provide anywhere. will provide automatically after `providePowell` call.
@Injectable()
export class ConfigService {
  private document = inject(DOCUMENT);
  private primengConfig = inject(PrimeConfig);
  private themeService = inject(ThemeService);

  private _config: NgConfig = {
    followConfig: true,
    rtl: false,
    fixLabelPos: 'fix-side',
    labelPos: 'fix-side',
    inputSize: 'sm',
    showRequiredStar: true,
    theme: 'lara-light-indigo',
    ...this.primengConfig
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
    Object.entries(this._config).filter(c => typeof c[1] !== 'object').forEach(([key, value]) => {
      key = toKebabCase(key);
      const foundedClass = bodyClasses.find(c => c.includes(key));
      let newClass;
      if (typeof value == 'boolean') {
        if (value) {
          newClass = `ng-${key}`;
        } else {
          this.document.body.classList.remove(`ng-${key}`);
        }
      } else if (typeof value === 'function') {
        if (typeof value() !== 'object') {
          newClass = `ng-${key}-${value()}`;
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

  applyConfigToComponent<T>(component: any) {
    const initializedConfigs: string[] = []
    const checkingConfigs: string[] = [
      'labelPos',
      'rtl',
      'showRequiredStar',
      'variant',
      'inputSize'
    ];
    checkingConfigs.forEach(key => {
      if (!['undefined', 'null'].includes(typeof component[key])) {
        initializedConfigs.push(key);
      }
    })
    Object.entries(this._config).forEach(([key, value]) => {
      let componentKey = this.getComponentConfigKey(key as keyof NgConfig);
      component[componentKey] = value;
    })
    this.configChange$.pipe(takeUntil(component.destroy$)).subscribe(({modifiedConfig}) => {
      Object.entries(modifiedConfig).forEach(([key, value]) => {
        let componentKey = this.getComponentConfigKey(key as keyof NgConfig);
        // component[componentKey] = initializedConfigs.includes(componentKey) ? component[componentKey] : value;
        component[componentKey] = component.followConfig ? value : component[componentKey];
      })
    })
  }

  private getComponentConfigKey(key: keyof NgConfig) {
    if (key === 'fixLabelPos') return 'labelPos';
    if (key === 'inputStyle') return 'variant';
    return key;
  }
}

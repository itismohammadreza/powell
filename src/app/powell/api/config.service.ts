import {inject, Injectable} from '@angular/core';
import {DOCUMENT} from "@angular/common";
import {Subject, takeUntil} from "rxjs";
import {NgConfig, NgConfigChangeEvent} from "@powell/models";
import {ThemeService} from "@powell/api";
import {$Aura, $PrimeNG} from "@powell/primeng";

// DON'T provide anywhere. will provide automatically after `providePowell` call.
@Injectable()
export class ConfigService {
  private document = inject(DOCUMENT);
  private primeNG = inject($PrimeNG);
  private themeService = inject(ThemeService);

  constructor() {
    // set default ripple to true, so 'ink' element will present in rippleable elements.
    this.primeNG.ripple.set(true);
  }

  private configChangeSubject = new Subject<NgConfigChangeEvent>();
  configChange$ = this.configChangeSubject.asObservable();
  private _config: NgConfig = {
    followConfig: true,
    rtl: false,
    fixLabelPosition: 'side',
    labelPosition: 'side',
    showRequiredStar: true,
    ...this.primeNG,
    theme: {
      preset: $Aura,
      options: {
        cssLayer: {
          name: 'primeng',
          order: 'tailwind-base, primeng, tailwind-components, tailwind-utilities'
        }
      }
    },
    ripple: this.primeNG.ripple(),
    inputStyle: this.primeNG.inputStyle(),
    csp: this.primeNG.csp(),
  };

  update(config: NgConfig) {
    this._config = {...this._config, ...config};
    this.primeNG.zIndex = this._config.zIndex;
    this.primeNG.overlayOptions = this._config.overlayOptions;
    if (this._config.translation) {
      this.primeNG.setTranslation(this._config.translation);
    }
    if (this._config.theme) {
      this.primeNG.theme.set(this._config.theme);
    }
    if (this._config.csp) {
      this.primeNG.csp.set(this._config.csp);
    }
    if (this._config.inputStyle) {
      this.primeNG.inputStyle.set(this._config.inputStyle);
    }
    if (this._config.ripple === false) {
      this.document.body.classList.add('p-ripple-disabled');
    } else {
      this.document.body.classList.remove('p-ripple-disabled');
    }
    this.document.documentElement.setAttribute('dir', this._config.rtl ? 'rtl' : 'ltr');
    this.themeService.initTheme();
    // this.themeService.changeTheme(this._config.theme);
    this.handleBodyClasses();
    this.configChangeSubject.next({currentConfig: this._config, modifiedConfig: config});
  }

  get() {
    return this._config;
  }

  applyConfigToComponent<T>(component: any) {
    Object.entries(this._config).forEach(([key, value]) => {
      let componentKey = this.getComponentConfigKey(key as keyof NgConfig);
      component[componentKey] = value;
    })
    this.configChange$.pipe(takeUntil(component.destroy$)).subscribe(({modifiedConfig}) => {
      Object.entries(modifiedConfig).forEach(([key, value]) => {
        let componentKey = this.getComponentConfigKey(key as keyof NgConfig);
        component[componentKey] = component.followConfig ? value : component[componentKey];
      });
    });
  }

  private handleBodyClasses() {
    const toKebabCase = (test: string) => {
      return test.split(/(?=[A-Z])/).join('-').toLowerCase();
    }
    const bodyClasses = this.document.body.classList.value.split(" ");
    Object.entries(this._config).filter(c => typeof c[1] !== 'object').forEach(([key, value]) => {
      key = toKebabCase(key);
      const foundedClass = bodyClasses.find(c => c.includes(key));
      let newClass: string;
      if (typeof value == 'boolean') {
        if (value) {
          newClass = `ng-${key}`;
        } else {
          this.document.body.classList.remove(`ng-${key}`);
        }
        if (key === 'ripple' && value === false) {
          newClass = 'p-ripple-disabled';
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

  private getComponentConfigKey(key: keyof NgConfig) {
    if (key === 'fixLabelPosition') return 'labelPosition';
    if (key === 'inputStyle') return 'variant';
    return key;
  }
}

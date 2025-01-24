import {inject, Injectable, isSignal, Signal} from '@angular/core';
import {Subject, takeUntil} from "rxjs";
import {NgConfig, NgConfigChangeEvent, NgInitialConfig} from "@powell/models";
import {ThemeService} from "@powell/api";
import {$PrimeNG} from "@powell/primeng";

// DON'T provide anywhere. will provide automatically after `providePowell` call.
@Injectable()
export class ConfigService {
  private primeNG = inject($PrimeNG);
  private themeService = inject(ThemeService);
  private _config: Partial<NgConfig> = {};
  private configChangeSubject = new Subject<NgConfigChangeEvent>();
  private initialized: boolean = false;
  configChange$ = this.configChangeSubject.asObservable();

  constructor() {
    // set default ripple to true, so 'ink' element will present in rippleable elements.
    this.primeNG.ripple.set(true);

    // add default primeng config to our config object
    for (const key in this.primeNG) {
      if (isSignal(this.primeNG[key])) {
        this._config[key] = this.primeNG[key]();
      } else {
        this._config[key] = this.primeNG[key];
      }
    }
    // and add other default config of our app
    this._config = {
      ...this._config,
      followConfig: true,
      rtl: false,
      fixLabelPosition: 'side',
      labelPosition: 'side',
      showRequiredStar: true,
      theme: this.themeService.currentPreset
    }
  }

  init(config: NgInitialConfig) {
    if (this.initialized) {
      return;
    }
    this._config = {...this._config, ...config};
    config = {...this._config, ...config};
    this.applyConfig(config);
    this.initialized = true;
  }

  private applyConfig(config: NgInitialConfig) {
    for (const key in config) {
      if (key in this.primeNG && isSignal(this.primeNG[key] as Signal<any>)) {
        if (key === 'theme') {
          const theme = config.theme;
          if (!this.initialized) {
            const convertedTheme = {
              preset: theme.name ? this.themeService.presets[theme.name] : theme.preset,
              options: {
                ...config.themeOptions,
                darkModeSelector: this.themeService.darkModeSelector
              }
            }
            this.primeNG.theme.set(convertedTheme);
          }
          this.themeService.usePreset(theme);
        } else if (key === 'translation') {
          this.primeNG.setTranslation(config.translation);
        } else {
          this.primeNG[key].set(config[key]);
        }
      } else if (key in this.primeNG) {
        this.primeNG[key] = config[key];
      }
    }
    this.themeService.applyConfigToDom(config);
  }

  update(config: NgConfig) {
    this._config = {...this._config, ...config};
    this.applyConfig(config);
    this.configChangeSubject.next({currentConfig: this._config, modifiedConfig: config});
    this.initialized = true;
  }

  get() {
    return this._config;
  }

  applyConfigToComponent(component: any) {
    Object.entries(this._config).forEach(([key, value]) => {
      let componentKey = this.getComponentConfigKey(key as keyof NgConfig);
      if (!component[componentKey]) {
        component[componentKey] = value;
      }
    })
    this.configChange$.pipe(takeUntil(component.destroy$)).subscribe(({modifiedConfig}) => {
      Object.entries(modifiedConfig).forEach(([key, value]) => {
        let componentKey = this.getComponentConfigKey(key as keyof NgConfig);
        component[componentKey] = component.followConfig ? value : component[componentKey];
      });
    });
  }

  private getComponentConfigKey(key: keyof NgConfig) {
    if (key === 'fixLabelPosition') return 'labelPosition';
    if (key === 'inputStyle') return 'variant';
    return key;
  }
}

import {inject, Injectable, isSignal, Signal} from '@angular/core';
import {Subject, takeUntil} from "rxjs";
import {NgConfig, NgConfigChangeEvent, NgTheme, NgThemeObject} from "@powell/models";
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
      theme: {
        preset: this.themeService.currentPreset.name
      }
    }
  }

  update(config: NgConfig) {
    this._config = {...this._config, ...config};
    if (!this.initialized) {
      config = {...this._config, ...config}
    }
    for (const key in config) {
      if (key in this.primeNG && isSignal(this.primeNG[key] as Signal<any>)) {
        if (key === 'theme') {
          this.setThemePreset(config.theme);
        } else {
          this.primeNG[key].set(config[key]);
        }
      } else if ('transition' in config) {
        this.primeNG.setTranslation(config.translation);
      } else if (key in this.primeNG) {
        this.primeNG[key] = config[key];
      }
    }
    this.themeService.applyConfigToDom(config);
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

  private setThemePreset(theme: NgTheme) {
    let themeObj: any;
    if (typeof theme === 'object') {
      themeObj = {} as NgThemeObject;
      // if theme is an object, it will update preset palette
      if (typeof theme.preset === 'object') {
        themeObj.preset = theme.preset;
        this.themeService.updatePreset(themeObj.preset);
      // otherwise it change the preset
      } else {
        themeObj.preset = this.themeService.presets[theme.preset];
        this.themeService.usePreset(theme.preset);
      }
      themeObj.options = theme.options;
    } else {
      themeObj = theme;
    }
    if (!this.initialized) {
      this.primeNG.theme.set(themeObj);
    }
  }

  private getComponentConfigKey(key: keyof NgConfig) {
    if (key === 'fixLabelPosition') return 'labelPosition';
    if (key === 'inputStyle') return 'variant';
    return key;
  }
}

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
  private registeredComponents: {component: any; isFixLabel: boolean}[] = [];
  configChange$ = this.configChangeSubject.asObservable();

  constructor() {
    this.initializeDefaultConfig();

    this.configChange$.subscribe(({modifiedConfig}) => {
      this.registeredComponents.forEach(({component, isFixLabel}) => {
        if (component.followConfig) {
          this.syncComponentWithConfig(component, isFixLabel, modifiedConfig, true);
        }
      });
    });
  }

  update(config: NgConfig) {
    this.handleConfigChanges(config);
    this.configChangeSubject.next({currentConfig: this._config, modifiedConfig: config});
    this.initialized = true;
  }

  get() {
    return this._config;
  }

  configureComponent(component: any, isFixLabel?: boolean) {
    this.registeredComponents.push({component, isFixLabel});
    this.syncComponentWithConfig(component, isFixLabel, this._config, false);
    const destroySubscription = component.destroy$?.subscribe(() => {
      this.unregisterComponent(component)
      destroySubscription?.unsubscribe();
    })
  }

  private syncComponentWithConfig(component: any, isFixLabel: boolean, config: Partial<NgConfig>, forceApply: boolean) {
    Object.entries(config).forEach(([key, value]: [key: keyof NgConfig, value: any]) => {
      let componentKey = this.getComponentConfigKey(key);
      if (!(componentKey in component)) {
        return;
      }
      if (!forceApply && typeof component[componentKey] != 'undefined') {
        return;
      }

      if (key === 'fixLabelPosition') {
        if (isFixLabel) {
          component[componentKey] = value;
        }
      } else if (key === 'labelPosition') {
        if (!isFixLabel) {
          component[componentKey] = value;
        }
      } else {
        component[componentKey] = value;
      }
    })
  }

  private handleConfigChanges(config: NgInitialConfig) {
    this._config = {...this._config, ...config};
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

  private getComponentConfigKey(key: keyof NgConfig) {
    if (key === 'fixLabelPosition') return 'labelPosition';
    if (key === 'inputStyle') return 'variant';
    return key;
  }

  private unregisterComponent(component: any) {
    this.registeredComponents = this.registeredComponents.filter(item => item.component !== component);
  }

  private initializeDefaultConfig() {
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
}

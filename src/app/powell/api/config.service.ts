import {inject, Injectable} from '@angular/core';
import {Subject} from "rxjs";
import {Config, ConfigChangeEvent} from "@powell/models";
import {ThemeService} from "@powell/api";
import {$PrimeNG} from "@powell/primeng";

type InServiceConfigType = Omit<Config, "theme" | "platformId" | "csp"> & {
  theme?: Omit<Config["theme"], "options">;
}

// DON'T provide anywhere. will provide automatically after `providePowell` call.
@Injectable()
export class ConfigService {
  private primeNG = inject($PrimeNG);
  private themeService = inject(ThemeService);
  private _config: Partial<Config> = {};
  private configChangeSubject = new Subject<ConfigChangeEvent>();
  private registeredComponents: {component: SafeAny; isFixLabel: boolean}[] = [];
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

  update(config: InServiceConfigType) {
    this.handleConfigChanges(config);
    this.configChangeSubject.next({currentConfig: this._config, modifiedConfig: config});
  }

  get() {
    return this._config;
  }

  configureComponent(component: SafeAny, isFixLabel: boolean = false) {
    this.registeredComponents.push({component, isFixLabel});
    this.syncComponentWithConfig(component, isFixLabel, this._config, false);
    const destroySubscription = component.destroy$?.subscribe(() => {
      this.unregisterComponent(component)
      destroySubscription?.unsubscribe();
    })
  }

  private syncComponentWithConfig(component: SafeAny, isFixLabel: boolean, config: Partial<Config>, forceApply: boolean) {
    Object.entries(config).forEach(([key, value]) => {
      let componentKey = this.getComponentConfigKey(key as keyof Config);
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

  private handleConfigChanges(config: InServiceConfigType) {
    this._config = {...this._config, ...config};
    for (const k in config) {
      const key = k as keyof typeof this.primeNG & keyof Config;
      if ([
        'ripple',
        'overlayAppendTo',
        'inputVariant',
        'csp',
        'overlayOptions',
        'translation',
        'zIndex',
        'filterMatchModeOptions',
      ].includes(key)) {
        this.primeNG.setConfig({
          [key]: config[key]
        })
      }
      if (key === 'theme') {
        const {mode, preset, surfacePalette, primaryPalette} = config.theme;
        if (preset) {
          this.themeService.usePreset(preset);
        }
        if (mode) {
          this.themeService.updateMode(mode);
        }
        if (primaryPalette) {
          setTimeout(() => {
            this.themeService.updatePrimaryPalette(primaryPalette);
          })
        }
        if (surfacePalette) {
          setTimeout(() => {
            this.themeService.updateSurfacePalette(surfacePalette);
          })
        }
      }
    }
    this.themeService.applyConfigToDom({...config, injectDirectionToRoot: this._config.injectDirectionToRoot});
  }

  private getComponentConfigKey(key: keyof Config) {
    if (key === 'fixLabelPosition') return 'labelPosition';
    if (key === 'inputVariant') return 'variant';
    return key;
  }

  private unregisterComponent(component: SafeAny) {
    this.registeredComponents = this.registeredComponents.filter(item => item.component !== component);
  }

  private initializeDefaultConfig() {
    // set default ripple to true, so 'ink' element will present in rippleable elements.
    this.primeNG.setConfig({
      ripple: true,
    });

    this._config = {
      // PrimeNG configs
      csp: this.primeNG.csp(),
      filterMatchModeOptions: this.primeNG.filterMatchModeOptions,
      getTranslation: this.primeNG.getTranslation,
      injectDirectionToRoot: true,
      inputSize: undefined,
      inputVariant: this.primeNG.inputVariant(),
      overlayAppendTo: this.primeNG.overlayAppendTo(),
      overlayOptions: this.primeNG.overlayOptions,
      platformId: this.primeNG.platformId,
      ripple: true,
      translation: this.primeNG.translation,
      zIndex: this.primeNG.zIndex,
      setTranslation: this.primeNG.setTranslation,
      // non-PrimeNG configs
      followConfig: true,
      rtl: false,
      fixLabelPosition: 'side',
      labelPosition: 'side',
      showRequiredStar: true,
      theme: {
        preset: this.themeService.presets['Aura'],
        mode: 'system',
      }
    }
  }
}

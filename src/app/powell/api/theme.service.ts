import {DOCUMENT, inject, Injectable} from "@angular/core";

import {
  $Aura,
  $Lara,
  $Material,
  $Nora,
  $updatePreset,
  $updatePrimaryPalette,
  $updateSurfacePalette,
  $usePreset
} from "@powell/primeng";
import {Config, Theme, ThemeMode} from "@powell/models";
import {CONFIG_CLASS_PREFIX, DARK_MODE_CLASS, DARK_MODE_SELECTOR} from "@powell/api";

type BodyClassRule = {
  condition: (value: SafeAny) => boolean;
  className: string;
};

// DON'T provide anywhere. will provide automatically after `providePowell` call.
@Injectable()
export class ThemeService {
  private document = inject(DOCUMENT);
  private _presets = {
    Aura: $Aura,
    Material: $Material,
    Lara: $Lara,
    Nora: $Nora,
  };
  private _currentPreset: Theme = {};
  private _darkModeIdentifier = DARK_MODE_CLASS;
  private _configClassPrefix = CONFIG_CLASS_PREFIX;

  updateSurfacePalette(palette: SafeAny) {
    this._currentPreset.surfacePalette = palette;
    $updateSurfacePalette(palette);
  }

  updatePrimaryPalette(palette: SafeAny) {
    this._currentPreset.primaryPalette = palette;
    $updatePrimaryPalette(palette);
  }

  usePreset(preset: Theme["preset"]) {
    $usePreset(preset);
    this._currentPreset.preset = preset;
  }

  updatePreset(preset: Theme["preset"]) {
    $updatePreset(preset);
    this._currentPreset.preset = {...this._currentPreset.preset, ...preset};
  }

  updateMode(mode: ThemeMode) {
    this._currentPreset.mode = mode;
    this.handleDarkModeTransition();
  }

  applyConfigToDom(config: Config) {
    this.handleBodyClasses(config);

    if ('rtl' in config) {
      if (config.injectDirectionToRoot) {
        this.document.documentElement.setAttribute('dir', config.rtl ? 'rtl' : 'ltr');
      } else {
        this.document.documentElement.removeAttribute('dir');
      }
    }
  }

  get currentPreset() {
    return this._currentPreset;
  }

  get presets() {
    return this._presets;
  }

  private handleDarkModeTransition() {
    const doc = this.document as SafeAny;
    if (doc.startViewTransition) {
      doc.startViewTransition(() => this.toggleDarkMode());
    } else {
      this.toggleDarkMode();
    }
  }

  private toggleDarkMode() {
    const htmlElement = this.document.querySelector('html');
    const systemIsDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (this._currentPreset.mode === 'dark' || (this._currentPreset.mode === 'system' && systemIsDark)) {
      htmlElement?.classList.add(this._darkModeIdentifier);
    } else {
      htmlElement?.classList.remove(this._darkModeIdentifier);
    }
  }

  private kebabCase(str: string) {
    return str.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
  }

  private handleBodyClasses(config: Config) {
    const specialBodyClassRules: Partial<Record<keyof Config, BodyClassRule[]>> = {
      ripple: [
        {
          condition: (v) => v === false,
          className: 'p-ripple-disabled',
        },
      ],
      inputVariant: [
        {
          condition: (v) => v === 'filled',
          className: 'p-input-filled',
        },
      ],
    };

    for (const key in config) {
      const value = config[key as keyof Config];
      if (value === undefined || typeof value === 'object' || typeof value === 'function') continue;

      const rules = specialBodyClassRules[key as keyof Config];

      if (rules && rules.length) {
        for (const rule of rules) {
          const shouldApply = rule.condition(value);
          this.document.body.classList.toggle(rule.className, shouldApply);
        }
      } else {
        const prefix = `${this._configClassPrefix}-${this.kebabCase(key)}-`;
        this.document.body.classList.forEach((cls) => {
          if (cls.startsWith(prefix)) {
            this.document.body.classList.remove(cls);
          }
        });
        const finalValue = typeof value === 'boolean' ? (value ? 'enabled' : 'disabled') : value;
        this.document.body.classList.add(`${prefix}${finalValue}`);
      }
    }
  }
}

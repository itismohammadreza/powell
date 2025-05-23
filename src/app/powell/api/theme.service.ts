import {inject, Injectable} from "@angular/core";
import {DOCUMENT} from "@angular/common";
import {
  $Aura,
  $Lara,
  $Material,
  $Nora,
  $Preset,
  $t,
  $updatePreset,
  $updateSurfacePalette,
  $usePreset
} from "@powell/primeng";
import {NgConfig, NgPresetName, NgTheme, NgThemeMode} from "@powell/models";

type BodyClassRule = {
  condition: (value: any) => boolean;
  className: string;
};

// DON'T provide anywhere. will provide automatically after `providePowell` call.
@Injectable()
export class ThemeService {
  private document = inject(DOCUMENT);
  private _initialized: boolean = false;
  private _presets: Partial<Record<NgPresetName, $Preset<any>>> = {
    Aura: $Aura,
    Material: $Material,
    Lara: $Lara,
    Nora: $Nora,
  };
  private _currentPreset: NgTheme = {preset: this.presets.Aura, name: 'Aura', mode: 'system'};
  private _darkModeIdentifier: string = 'ng-dark';
  private _darkModeSelector: string = `.${this._darkModeIdentifier}`;

  init(preset: $Preset<any>) {
    if (this._initialized) {
      return;
    }
    $t().preset(preset).use({useDefaultOptions: true});
    this._initialized = true;
  }

  updateSurfacePalette(palette: any) {
    $updateSurfacePalette(palette);
  }

  updateMode(mode: NgThemeMode) {
    this._currentPreset.mode = mode;
    this.handleDarkModeTransition();
  }

  usePreset(theme: NgTheme) {
    const {name, preset, mode} = theme;
    if (preset && !name) {
      // if theme is only preset, it will update preset palette
      this.updatePreset(preset);
      return
    }
    // otherwise it change the preset
    if (name || preset) {
      let presetObj = preset ?? this.presets[name];
      if (!this._initialized) {
        this.init(presetObj);
      } else {
        $usePreset(presetObj);
      }
      this._currentPreset = {...this._currentPreset, preset: presetObj, name};
    }
    if (mode) {
      this.updateMode(mode);
      this._currentPreset.mode = mode;
    }
  }

  private updatePreset(preset: $Preset<any>) {
    $updatePreset(preset);
    this._currentPreset = {...this._currentPreset, preset};
  }

  applyConfigToDom(config: NgConfig) {
    this.handleBodyClasses(config);
    if ('rtl' in config && config.injectDirectionToRoot) {
      this.document.documentElement.setAttribute('dir', config.rtl ? 'rtl' : 'ltr');
    } else {
      this.document.documentElement.removeAttribute('dir');
    }
  }

  get currentPreset() {
    return this._currentPreset;
  }

  get presets() {
    return this._presets;
  }

  get darkModeSelector() {
    return this._darkModeSelector;
  }

  private handleDarkModeTransition() {
    const doc = this.document as any;
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

  private handleBodyClasses(config: NgConfig) {
    const specialBodyClassRules: Partial<Record<keyof NgConfig, BodyClassRule[]>> = {
      ripple: [
        {
          condition: (v) => v === false,
          className: 'p-ripple-disabled',
        },
      ],
      inputStyle: [
        {
          condition: (v) => v === 'filled',
          className: 'p-input-filled',
        },
      ],
    };

    for (const key in config) {
      const value = key == 'theme' ? config.theme.name : config[key as keyof NgConfig];
      if (value === undefined || typeof value === 'object') continue;

      const rules = specialBodyClassRules[key as keyof NgConfig];

      if (rules && rules.length) {
        for (const rule of rules) {
          const shouldApply = rule.condition(value);
          this.document.body.classList.toggle(rule.className, shouldApply);
        }
      } else {
        const prefix = `powell-${this.kebabCase(key)}-`;
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

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
import {Config, PresetName, Theme, ThemeMode} from "@powell/models";

type BodyClassRule = {
  condition: (value: any) => boolean;
  className: string;
};

// DON'T provide anywhere. will provide automatically after `providePowell` call.
@Injectable()
export class ThemeService {
  private document = inject(DOCUMENT);
  private _initialized: boolean = false;
  private _presets: Partial<Record<PresetName, $Preset<any>>> = {
    Aura: $Aura,
    Material: $Material,
    Lara: $Lara,
    Nora: $Nora,
  };
  private _currentPreset: Theme = {preset: this.presets.Aura, name: 'Aura', mode: 'system'};
  private _darkModeIdentifier: string = 'pw-dark';
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

  updateMode(mode: ThemeMode) {
    this._currentPreset.mode = mode;
    this.handleDarkModeTransition();
  }

  usePreset(theme: Theme) {
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

  private handleBodyClasses(config: Config) {
    const specialBodyClassRules: Partial<Record<keyof Config, BodyClassRule[]>> = {
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
      const value = key == 'theme' ? config.theme.name : config[key as keyof Config];
      if (value === undefined || typeof value === 'object') continue;

      const rules = specialBodyClassRules[key as keyof Config];

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

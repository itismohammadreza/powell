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
      this._currentPreset = {preset: presetObj, name};
    }
    if (mode) {
      this.updateMode(mode);
      this._currentPreset.mode = mode;
    }
  }

  private updatePreset(preset: $Preset<any>) {
    $updatePreset(preset);
    this._currentPreset = {preset, name: this._currentPreset.name};
  }

  applyConfigToDom(config: NgConfig) {
    if (config.ripple === false) {
      this.document.body.classList.add('p-ripple-disabled');
    } else {
      this.document.body.classList.remove('p-ripple-disabled');
    }
    this.document.documentElement.setAttribute('dir', config.rtl ? 'rtl' : 'ltr');
    this.handleBodyClasses(config);
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

  private handleBodyClasses(config: NgConfig) {
    const toKebabCase = (test: string) => {
      return test.split(/(?=[A-Z])/).join('-').toLowerCase();
    }
    const bodyClasses = this.document.body.classList.value.split(" ");
    Object.entries(config).filter(c => typeof c[1] !== 'object').forEach(([key, value]) => {
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
}

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
import {NgConfig, NgPresetName, Preset} from "@powell/models";

// DON'T provide anywhere. will provide automatically after `providePowell` call.
@Injectable()
export class ThemeService {
  private document = inject(DOCUMENT);
  private _initialized: boolean = false;
  private _presets: Record<NgPresetName, $Preset<any>> = {
    Aura: $Aura,
    Material: $Material,
    Lara: $Lara,
    Nora: $Nora
  };
  private _currentPreset: Preset = {...this.presets.Aura, name: 'Aura'};

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

  usePreset(name: NgPresetName) {
    let preset: $Preset<any> = this.presets[name];
    if (!this._initialized) {
      this.init(preset);
    } else {
      $usePreset(preset);
    }
    this._currentPreset = {...this.presets[name], name};
  }

  updatePreset(preset: $Preset<any>) {
    $updatePreset(preset);
    this._currentPreset = {...this._currentPreset, ...preset}
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

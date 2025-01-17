import {inject, Injectable} from "@angular/core";
import {DOCUMENT} from "@angular/common";
import {$Aura, $Lara, $Material, $Nora} from "@powell/primeng";

// DON'T provide anywhere. will provide automatically after `providePowell` call.
@Injectable()
export class ThemeService {
  private document = inject(DOCUMENT);
  private initialized: boolean = false;
  private presets = {
    Aura: $Aura,
    Material: $Material,
    Lara: $Lara,
    Nora: $Nora
  };

  initTheme() {
    if (this.initialized) {
      return;
    }
    const head = this.document.querySelector('head');
    const link = this.document.createElement('link');
    link.id = "powell-theme-link"
    link.rel = "stylesheet";
    link.type = "text/css";
    head.appendChild(link);
    this.initialized = true;
  }

  getPresets() {
    return this.presets;
  }
}

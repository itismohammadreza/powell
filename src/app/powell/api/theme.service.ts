import {Inject, Injectable} from "@angular/core";
import {DOCUMENT} from "@angular/common";
import {NgTheme} from "@powell/models";

// DON'T provide anywhere. will provide automatically after `initiateNgConfigProvider` call.
@Injectable()
export class ThemeService {
  constructor(@Inject(DOCUMENT) private document: Document) {
  }

  private _currentTheme: NgTheme;
  private _allThemes: NgTheme[] = [
    'arya-blue',
    'arya-green',
    'arya-orange',
    'arya-purple',
    'bootstrap4-dark-blue',
    'bootstrap4-dark-purple',
    'bootstrap4-light-blue',
    'bootstrap4-light-purple',
    'fluent-light',
    'lara-dark-indigo',
    'lara-dark-purple',
    'lara-light-indigo',
    'lara-light-purple',
    'luna-amber',
    'luna-blue',
    'luna-green',
    'luna-pink',
    'md-dark-deeppurple',
    'md-dark-indigo',
    'md-light-deeppurple',
    'md-light-indigo',
    'mdc-dark-deeppurple',
    'mdc-dark-indigo',
    'mdc-light-deeppurple',
    'mdc-light-indigo',
    'mira',
    'nano',
    'nova',
    'nova-accent',
    'nova-alt',
    'rhea',
    'saga-blue',
    'saga-green',
    'saga-orange',
    'saga-purple',
    'soho-dark',
    'soho-light',
    'vela-blue',
    'vela-green',
    'vela-orange',
    'vela-purple',
    'viva-dark',
    'viva-light',
  ]
  private initialized: boolean = false;

  changeTheme(theme: NgTheme) {
    if (!this.initialized) {
      console.warn('theme not initialized, call initTheme() first!');
      return;
    }
    if (this.currentTheme === theme) {
      return;
    }
    const themeElement = this.document.getElementById('powell-theme-link');
    const themeLink = `${theme}.css`;
    themeElement.setAttribute('href', themeLink);
    this._currentTheme = theme;
  }

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

  get currentTheme() {
    return this._currentTheme;
  }

  getAllThemes() {
    return this._allThemes
  }
}

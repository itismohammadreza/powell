import {Inject, Injectable} from "@angular/core";
import {DOCUMENT} from "@angular/common";
import {NgConfig, NgTheme} from "@ng/models/config";

@Injectable({providedIn: 'root'})
export class ThemeService {
  constructor(@Inject(DOCUMENT) private document: Document,
              @Inject('NG_CONFIG') private config: NgConfig) {
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
    'tailwind-light',
    'vela-blue',
    'vela-green',
    'vela-orange',
    'vela-purple',
    'viva-dark',
    'viva-light',
  ]

  changeTheme(theme: NgTheme) {
    const themeElement = this.document.getElementById('prime-theme-link');
    themeElement.setAttribute('href', themeElement.getAttribute('href').replace(this._currentTheme, theme));
    this._currentTheme = theme;
  }

  initTheme() {
    if (this.document.getElementById('prime-theme-link')) {
      console.warn('theme already initialized')
      return
    }
    const head = this.document.querySelector('head');
    const link = this.document.createElement('link');
    link.id = "prime-theme-link"
    link.rel = "stylesheet";
    link.type = "text/css";
    link.href = `assets/themes/${this.config.theme}/theme.css`;
    this._currentTheme = this.config.theme;
    head.appendChild(link)
  }

  get currentTheme() {
    return this._currentTheme;
  }

  getAllThemes() {
    return this._allThemes
  }
}

import {Inject, Injectable} from "@angular/core";
import {DOCUMENT} from "@angular/common";
import {NgConfig, NgTheme} from "@ng/models/config";

@Injectable({providedIn: 'root'})
export class ThemeService {
  constructor(@Inject(DOCUMENT) private document: Document,
              @Inject('CONFIG') private config: NgConfig) {
  }

  private currentTheme: NgTheme;

  changeTheme(theme: NgTheme) {
    const themeElement = this.document.getElementById('prime-theme-link');
    themeElement.setAttribute('href', themeElement.getAttribute('href').replace(this.currentTheme, theme));
    this.currentTheme = theme;
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
    this.currentTheme = this.config.theme;
    head.appendChild(link)
  }
}

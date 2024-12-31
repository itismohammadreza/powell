import {inject, Injectable} from "@angular/core";
import {DOCUMENT} from "@angular/common";

// DON'T provide anywhere. will provide automatically after `providePowell` call.
@Injectable()
export class ThemeService {
  private document = inject(DOCUMENT);

  private initialized: boolean = false;

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

  getAllThemes() {
  }
}

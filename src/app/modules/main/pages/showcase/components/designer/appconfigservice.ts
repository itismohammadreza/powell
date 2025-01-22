import {DOCUMENT, isPlatformBrowser} from '@angular/common';
import {effect, inject, Injectable, PLATFORM_ID, signal} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppConfigService {
  appState = signal<{
    darkTheme: boolean,
  }>(null);

  private readonly STORAGE_KEY = 'appConfigState';
  private document = inject(DOCUMENT);
  private platformId = inject(PLATFORM_ID);
  private initialized = false;

  constructor() {
    this.appState.set(this.loadAppState());
    effect(() => {
      const state = this.appState();
      if (!this.initialized || !state) {
        this.initialized = true;
        return;
      }
      this.saveAppStateToLocalStorage(state);
      this.handleDarkModeTransition(state);
    });
  }

  private handleDarkModeTransition(state: any): void {
    if (isPlatformBrowser(this.platformId)) {
      if ((document as any).startViewTransition) {
        this.startViewTransition(state);
      } else {
        this.toggleDarkMode(state);
      }
    }
  }

  private startViewTransition(state: any): void {
    const transition = (document as any).startViewTransition(() => this.toggleDarkMode(state));
    transition.ready.then();
  }

  private toggleDarkMode(state: any): void {
    if (state.darkTheme) {
      this.document.documentElement.classList.add('p-dark');
    } else {
      this.document.documentElement.classList.remove('p-dark');
    }
  }

  private loadAppState(): any {
    if (isPlatformBrowser(this.platformId)) {
      const storedState = localStorage.getItem(this.STORAGE_KEY);
      if (storedState) {
        return JSON.parse(storedState);
      }
    }
    return {
      darkTheme: false,
    };
  }

  private saveAppStateToLocalStorage(state: any): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(state));
    }
  }
}

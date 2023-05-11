import {Inject, Injectable} from '@angular/core';
import {DOCUMENT} from "@angular/common";
import {Observable} from 'rxjs';
import {LangChangeEvent, TranslateService} from '@ngx-translate/core';
import {Global} from "@core/config";

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  private currentLang: string;

  constructor(private translate: TranslateService,
              @Inject(DOCUMENT) private document: Document) {
  }

  async init() {
    this.onLangChange().subscribe((res: any) => {
      this.storeLang(res.lang, this.currentLang);
      this.currentLang = res.lang;
    });
    this.currentLang = Global.Config.lang;
    this.storeLang(this.currentLang);
    if (!this.getDefaultLang()) {
      this.setDefaultLang(this.currentLang);
    }
    await this.use(this.currentLang).toPromise();
  }

  storeLang(currentLang: string, prevLang?: string) {
    const body = this.document.body;
    body.classList.remove(`ng-lang-${prevLang}`);
    body.classList.add(`ng-lang-${currentLang}`);
    this.document.documentElement.setAttribute('lang', currentLang);
    localStorage.setItem('ng-lang', currentLang);
  }

  get en(): boolean {
    return this.currentLang === 'en';
  }

  get fa(): boolean {
    return this.currentLang === 'fa';
  }

  /**
   * Get language changes as observable
   */
  onLangChange(): Observable<LangChangeEvent> {
    return this.translate.onLangChange.asObservable();
  }

  /**
   * Sets the default language to use as a fallback
   */
  setDefaultLang(lang: string): void {
    return this.translate.setDefaultLang(lang);
  }

  /**
   * Gets the default language
   */
  getDefaultLang(): string {
    return this.translate.getDefaultLang();
  }

  /**
   * Changes the lang currently used
   */
  use(lang: string): Observable<any> {
    return this.translate.use(lang);
  }

  /**
   * Gets an object of translations for a given language with the current loader
   */
  getTranslation(lang: string): Observable<any> {
    return this.translate.getTranslation(lang);
  }

  /**
   * Manually sets object of translations for a given language,set shouldMerge=true if want append the translations
   * insteadof replacing them
   */
  setTranslation(
    lang: string,
    translations: any,
    shouldMerge: boolean = false
  ): void {
    return this.translate.setTranslation(lang, translations, shouldMerge);
  }

  /**
   * Add new langs to the list
   */
  addLangs(langs: Array<string>): void {
    return this.translate.addLangs(langs);
  }

  /**
   * Returns an array of currently available langs
   */
  getLangs(): string[] {
    return this.translate.getLangs();
  }

  /**
   * Gets the translated value of a key (or an array of keys) or the key if the value was not found
   */
  get(
    key: string | Array<string>,
    interpolateParams?: any
  ): Observable<string | object> {
    return this.translate.get(key, interpolateParams);
  }

  /**
   * Returns a stream of translated values of a key or the key if the value wasn't found.Without any
   * onTranslationChange events.
   */
  getStreamOnTranslationChange(
    key: string | Array<string>,
    interpolateParams?: any
  ): Observable<string | object> {
    return this.translate.getStreamOnTranslationChange(key, interpolateParams);
  }

  /**
   * Returns a stream of translated values of a key (or an array of keys) or the key if the value was not found.
   */
  stream(
    key: string | Array<string>,
    interpolateParams?: any
  ): Observable<string | object> {
    return this.translate.stream(key, interpolateParams);
  }

  /**
   * Gets the instant translated value of a key. This method is synchronous and the default file loader is
   * asynchronous.
   */
  instant(
    key: string | Array<string>,
    interpolateParams?: any
  ): string | object {
    return this.translate.instant(key, interpolateParams);
  }

  /**
   * Sets the translated value of a key
   */
  set(key: string, value: string, lang?: string): void {
    return this.translate.set(key, value, lang);
  }

  /**
   * Calls resetLang and retrieves the translations object for the current loader
   */
  reloadLang(lang: string): Observable<string | object> {
    return this.translate.reloadLang(lang);
  }

  /**
   * Removes the current translations for this lang.You have to call use, reloadLang or getTranslation again to be
   * able to get translations
   */
  resetLang(lang: string): void {
    return this.translate.resetLang(lang);
  }

  /**
   * Returns the current browser lang if available, or undefined otherwise
   */
  getBrowserLang(): string | undefined {
    return this.translate.getBrowserLang();
  }

  /**
   * Returns the current browser culture language name (e.g. "de-DE" if available, or undefined otherwise
   */
  getBrowserCultureLang(): string | undefined {
    return this.translate.getBrowserCultureLang();
  }
}

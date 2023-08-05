import {Inject, Injectable} from '@angular/core';
import {DOCUMENT} from "@angular/common";
import {TranslateService} from '@ngx-translate/core';
import {appConfig} from "@core/config";

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  private currentLang: string;

  constructor(private translate: TranslateService,
              @Inject(DOCUMENT) private document: Document) {
  }

  async init() {
    this.onLangChange().subscribe(res => {
      this.storeLang(res.lang, this.currentLang);
      this.currentLang = res.lang;
    });
    this.currentLang = appConfig.lang;
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

  get en() {
    return this.currentLang === 'en';
  }

  get fa() {
    return this.currentLang === 'fa';
  }

  /**
   * Get language changes as observable
   */
  onLangChange() {
    return this.translate.onLangChange.asObservable();
  }

  /**
   * Sets the default language to use as a fallback
   */
  setDefaultLang(lang: string) {
    return this.translate.setDefaultLang(lang);
  }

  /**
   * Gets the default language
   */
  getDefaultLang() {
    return this.translate.getDefaultLang();
  }

  /**
   * Changes the lang currently used
   */
  use(lang: string) {
    return this.translate.use(lang);
  }

  /**
   * Gets an object of translations for a given language with the current loader
   */
  getTranslation(lang: string) {
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
  ) {
    return this.translate.setTranslation(lang, translations, shouldMerge);
  }

  /**
   * Add new langs to the list
   */
  addLangs(langs: string[]) {
    return this.translate.addLangs(langs);
  }

  /**
   * Returns an array of currently available langs
   */
  getLangs() {
    return this.translate.getLangs();
  }

  /**
   * Gets the translated value of a key (or an array of keys) or the key if the value was not found
   */
  get(key: string | Array<string>, interpolateParams?: any) {
    return this.translate.get(key, interpolateParams);
  }

  /**
   * Returns a stream of translated values of a key or the key if the value wasn't found.Without any
   * onTranslationChange events.
   */
  getStreamOnTranslationChange(key: string | string[], interpolateParams?: any) {
    return this.translate.getStreamOnTranslationChange(key, interpolateParams);
  }

  /**
   * Returns a stream of translated values of a key (or an array of keys) or the key if the value was not found.
   */
  stream(key: string | string[], interpolateParams?: any) {
    return this.translate.stream(key, interpolateParams);
  }

  /**
   * Gets the instant translated value of a key. This method is synchronous and the default file loader is
   * asynchronous.
   */
  instant(key: string | string[], interpolateParams?: any) {
    return this.translate.instant(key, interpolateParams);
  }

  /**
   * Sets the translated value of a key
   */
  set(key: string, value: string, lang?: string) {
    return this.translate.set(key, value, lang);
  }

  /**
   * Calls resetLang and retrieves the translations object for the current loader
   */
  reloadLang(lang: string) {
    return this.translate.reloadLang(lang);
  }

  /**
   * Removes the current translations for this lang.You have to call use, reloadLang or getTranslation again to be
   * able to get translations
   */
  resetLang(lang: string) {
    return this.translate.resetLang(lang);
  }

  /**
   * Returns the current browser lang if available, or undefined otherwise
   */
  getBrowserLang() {
    return this.translate.getBrowserLang();
  }

  /**
   * Returns the current browser culture language name (e.g. "de-DE" if available, or undefined otherwise
   */
  getBrowserCultureLang() {
    return this.translate.getBrowserCultureLang();
  }
}

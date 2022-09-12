import {GlobalInjector} from '@ng/global.injector';
import {TranslationService} from '@core/utils';
import {DOCUMENT} from "@angular/common";

export class LanguageChecker {
  constructor() {
    this.translationService = GlobalInjector.Injector.get(TranslationService);
    this.document = GlobalInjector.Injector.get(DOCUMENT);
    this.translationService.onLangChange().subscribe((res: any) => {
      this._currentLang = res.lang;
      this.document.documentElement.setAttribute('lang', this._currentLang);
      const body = this.document.body;
      if (this.fa) {
        body.style.direction = 'rtl';
        body.classList.add('ng-rtl');
        body.classList.remove('ng-ltr');
      } else if (this.en) {
        body.style.direction = 'ltr';
        body.classList.add('ng-ltr');
        body.classList.remove('ng-rtl');
      }
    });
  }

  private _currentLang: string = localStorage.getItem('lang');
  protected document: Document;
  protected translationService: TranslationService;

  get en(): boolean {
    return this._currentLang === 'en';
  }

  get fa(): boolean {
    return this._currentLang === 'fa';
  }

  instant(key: string) {
    return this.translationService.instant(key) as any;
  }
}

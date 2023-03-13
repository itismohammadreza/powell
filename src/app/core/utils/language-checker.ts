import {NgGlobal} from '@core/config';
import {TranslationService} from '@core/utils';

export class LanguageChecker {
  protected translationService: TranslationService;

  constructor() {
    this.translationService = NgGlobal.Injector.get(TranslationService);
  }

  get en(): boolean {
    return this.translationService.en;
  }

  get fa(): boolean {
    return this.translationService.fa;
  }

  instant(key: string) {
    return this.translationService.instant(key) as any;
  }
}

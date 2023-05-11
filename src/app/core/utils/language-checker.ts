import {TranslationService} from '@core/utils';
import {inject} from "@angular/core";

export class LanguageChecker {
  protected translationService: TranslationService;

  constructor() {
    this.translationService = inject(TranslationService);
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

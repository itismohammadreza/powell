import {TranslationService} from '@core/utils';
import {inject} from "@angular/core";

export class LanguageChecker {
  protected readonly translationService: TranslationService;

  constructor() {
    this.translationService = inject(TranslationService);
  }

  get en() {
    return this.translationService.en;
  }

  get fa() {
    return this.translationService.fa;
  }

  instant(key: string, interpolateParams?: any) {
    return this.translationService.instant(key, interpolateParams) as any;
  }
}

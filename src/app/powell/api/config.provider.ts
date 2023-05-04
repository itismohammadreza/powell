import {DOCUMENT} from "@angular/common";
import {NgConfig} from "@powell/models";
import {ConfigService, ThemeService} from "@powell/api";
import {
  PrimeConfig,
  PrimeConfirmationService,
  PrimeDialogService,
  PrimeFilterService,
  PrimeMessageService
} from "@powell/primeng/api";

export function initiateNgConfigProvider(ngConfig?: NgConfig) {
  return [
    ThemeService,
    PrimeMessageService,
    PrimeDialogService,
    PrimeConfirmationService,
    PrimeFilterService,
    {
      provide: ConfigService,
      useFactory: (primengConfig: PrimeConfig, themeService: ThemeService, document: Document) => {
        const configService = new ConfigService(primengConfig, themeService, document);
        configService.setConfig(ngConfig);
        return configService;
      },
      deps: [PrimeConfig, ThemeService, DOCUMENT]
    }
  ]
}

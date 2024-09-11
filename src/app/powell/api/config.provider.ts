import {NgConfig} from "@powell/models";
import {ConfigService, ThemeService} from "@powell/api";
import {
  PrimeConfirmationService,
  PrimeDialogService,
  PrimeFilterService,
  PrimeMessageService
} from "@powell/primeng";

export function providePowell(config?: NgConfig) {
  return [
    ThemeService,
    PrimeMessageService,
    PrimeDialogService,
    PrimeConfirmationService,
    PrimeFilterService,
    {
      provide: ConfigService,
      useFactory: () => {
        const configService = new ConfigService();
        configService.update(config);
        return configService;
      },
    }
  ]
}

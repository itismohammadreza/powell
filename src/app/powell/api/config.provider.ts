import {NgConfig} from "@powell/models";
import {ConfigService, ThemeService} from "@powell/api";
import {$ConfirmationService, $DialogService, $FilterService, $MessageService, $providePrimeNG} from "@powell/primeng";

export function providePowell(config?: NgConfig) {
  return [
    ThemeService,
    $MessageService,
    $DialogService,
    $ConfirmationService,
    $FilterService,
    $providePrimeNG(config),
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

import {NgInitialConfig} from "@powell/models";
import {ConfigService, ThemeService} from "@powell/api";
import {$ConfirmationService, $DialogService, $FilterService, $MessageService} from "@powell/primeng";

export function providePowell(config?: NgInitialConfig) {
  return [
    ThemeService,
    $MessageService,
    $DialogService,
    $ConfirmationService,
    $FilterService,
    {
      provide: ConfigService,
      useFactory: () => {
        const configService = new ConfigService();
        configService.init(config);
        return configService;
      },
    }
  ]
}

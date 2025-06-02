import {InitialConfig} from "@powell/models";
import {ConfigService, ThemeService} from "@powell/api";
import {$ConfirmationService, $DialogService, $FilterService, $MessageService} from "@powell/primeng";

export function providePowell(config?: InitialConfig) {
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
        configService.update(config);
        return configService;
      },
    }
  ]
}

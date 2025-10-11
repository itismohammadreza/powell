import {Config} from "@powell/models";
import {ConfigService, DARK_MODE_SELECTOR, ThemeService} from "@powell/api";
import {$ConfirmationService, $DialogService, $FilterService, $MessageService, $providePrimeNG} from "@powell/primeng";

export const providePowell = (config: Config = {}) => {
  return [
    ThemeService,
    $MessageService,
    $DialogService,
    $ConfirmationService,
    $FilterService,
    $providePrimeNG({
      ...(config.csp && {csp: config.csp}),
      theme: {
        preset: undefined,
        options: {
          ...config.theme?.options,
          darkModeSelector: DARK_MODE_SELECTOR,
        }
      }
    }),
    {
      provide: ConfigService,
      useFactory: () => {
        const configService = new ConfigService();
        configService.update({
          ...configService.get(),
          ...config
        });
        return configService;
      },
    }
  ]
}

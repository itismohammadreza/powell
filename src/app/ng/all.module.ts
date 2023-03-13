import {Injector, ModuleWithProviders, NgModule} from '@angular/core';
import {DOCUMENT} from "@angular/common";
import {ConfirmationService, FilterService, MessageService, PrimeNGConfig} from 'primeng/api';
import {DialogService} from 'primeng/dynamicdialog';
import {NgComponentsModule} from '@ng/components/components.module';

@NgModule({
  imports: [NgComponentsModule],
  exports: [NgComponentsModule]
})
export class NgAllModule {
  static forRoot(): ModuleWithProviders<NgAllModule> {
    return {
      ngModule: NgAllModule,
      providers: [
        {
          provide: ConfigService,
          useFactory: (primengConfig: PrimeNGConfig, themeService: ThemeService, document: Document) => {
            const configService = new ConfigService(primengConfig, themeService, document);
            configService.setConfig(ngConfig);
            themeService.initTheme();
            themeService.changeTheme(configService.getConfig().theme);
            return configService;
          },
          deps: [PrimeNGConfig, ThemeService, DOCUMENT]
        },
        MessageService,
        DialogService,
        ConfirmationService,
        FilterService,
      ],
    };
  }
}

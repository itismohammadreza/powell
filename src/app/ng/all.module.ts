import {Injector, ModuleWithProviders, NgModule} from '@angular/core';
import {ConfirmationService, FilterService, MessageService, PrimeNGConfig,} from 'primeng/api';
import {DialogService} from 'primeng/dynamicdialog';
import {NgComponentsModule} from './components/components.module';
import {ThemeService} from "@ng/services";
import {NgGlobal} from '@ng/global';
import {NgConfig} from "@ng/models/config";
import {ConfigService} from "@ng/services/config.service";
import {DOCUMENT} from "@angular/common";

@NgModule({
  imports: [NgComponentsModule],
  exports: [NgComponentsModule],
})
export class NgAllModule {
  constructor(private injector: Injector) {
    NgGlobal.Injector = this.injector;
  }

  static forRoot(ngConfig?: NgConfig): ModuleWithProviders<NgAllModule> {
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

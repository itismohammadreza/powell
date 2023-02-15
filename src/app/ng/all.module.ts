import {Injector, ModuleWithProviders, NgModule} from '@angular/core';
import {ConfirmationService, FilterService, MessageService, PrimeNGConfig,} from 'primeng/api';
import {DialogService} from 'primeng/dynamicdialog';
import {GlobalInjector} from './global.injector';
import {NgComponentsModule} from './components/components.module';
import {NgConfig} from "@ng/models/config";
import {ThemeService} from "@ng/services";

@NgModule({
  imports: [NgComponentsModule],
  exports: [NgComponentsModule],
})
export class NgAllModule {
  constructor(private injector: Injector, private themeService: ThemeService) {
    GlobalInjector.Injector = this.injector;
    this.themeService.initTheme();
  }

  static forRoot(ngConfig: NgConfig): ModuleWithProviders<NgAllModule> {
    return {
      ngModule: NgAllModule,
      providers: [
        {
          provide: PrimeNGConfig,
          useFactory: () => {
            const primeNgConfig = new PrimeNGConfig();
            primeNgConfig.ripple = ngConfig.ripple;
            return primeNgConfig;
          },
        },
        {
          provide: 'NG_CONFIG',
          useValue: ngConfig,
        },
        MessageService,
        DialogService,
        ConfirmationService,
        FilterService,
      ],
    };
  }
}

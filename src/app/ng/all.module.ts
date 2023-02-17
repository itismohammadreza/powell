import {Injector, ModuleWithProviders, NgModule} from '@angular/core';
import {ConfirmationService, FilterService, MessageService, PrimeNGConfig,} from 'primeng/api';
import {DialogService} from 'primeng/dynamicdialog';
import {NgComponentsModule} from './components/components.module';
import {ThemeService} from "@ng/services";
import {NgGlobal} from '@ng/ng-global';
import {NgConfig} from "@ng/models/config";

@NgModule({
  imports: [NgComponentsModule],
  exports: [NgComponentsModule],
})
export class NgAllModule {
  constructor(private injector: Injector, private themeService: ThemeService) {
    NgGlobal.Injector = this.injector;
    this.themeService.initTheme();
  }

  static forRoot(ngConfig?: NgConfig): ModuleWithProviders<NgAllModule> {
    if (ngConfig) {
      NgGlobal.config = ngConfig;
    }
    return {
      ngModule: NgAllModule,
      providers: [
        {
          provide: PrimeNGConfig,
          useFactory: () => {
            const primeNgConfig = new PrimeNGConfig();
            primeNgConfig.ripple = NgGlobal.config.ripple;
            return primeNgConfig;
          },
        },
        MessageService,
        DialogService,
        ConfirmationService,
        FilterService,
      ],
    };
  }
}

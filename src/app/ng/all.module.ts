import {Injector, ModuleWithProviders, NgModule} from '@angular/core';
import {ConfirmationService, FilterService, MessageService, PrimeNGConfig,} from 'primeng/api';
import {DialogService} from 'primeng/dynamicdialog';
import {Global} from './global';
import {NgComponentsModule} from './components/components.module';

@NgModule({
  imports: [NgComponentsModule],
  exports: [NgComponentsModule],
})
export class NgAllModule {
  constructor(private injector: Injector) {
    Global.Injector = this.injector;
  }

  static forRoot(
    config: {
      ripple: boolean;
    } = { ripple: true }
  ): ModuleWithProviders<NgAllModule> {
    return {
      ngModule: NgAllModule,
      providers: [
        {
          provide: PrimeNGConfig,
          useFactory: () => {
            const primeNgConfig = new PrimeNGConfig();
            primeNgConfig.ripple = config.ripple;
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

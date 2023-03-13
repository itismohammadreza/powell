import {ModuleWithProviders, NgModule} from '@angular/core';
import {ConfirmationService, FilterService, MessageService} from 'primeng/api';
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
        MessageService,
        DialogService,
        ConfirmationService,
        FilterService,
      ],
    };
  }
}

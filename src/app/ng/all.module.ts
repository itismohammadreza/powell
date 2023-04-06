import {ModuleWithProviders, NgModule} from '@angular/core';
import {ConfirmationService, FilterService, MessageService} from 'primeng/api';
import {DialogService} from 'primeng/dynamicdialog';

@NgModule({})
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

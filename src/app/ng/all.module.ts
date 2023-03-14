import {ModuleWithProviders, NgModule} from '@angular/core';
import {FilterService} from 'primeng/api';

@NgModule({
  // imports: [NgComponentsModule],
  // exports: [NgComponentsModule]
})
export class NgAllModule {
  static forRoot(): ModuleWithProviders<NgAllModule> {
    return {
      ngModule: NgAllModule,
      providers: [
        FilterService,
      ],
    };
  }
}

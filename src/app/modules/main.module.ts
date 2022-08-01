import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { MainRoutingModule } from './main-routing.module';
import { MainPage } from './main.page';

@NgModule({
  imports: [MainRoutingModule, SharedModule],
  declarations: [MainPage],
})
export class MainModule {}

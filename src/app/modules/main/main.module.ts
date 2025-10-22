import {NgModule} from '@angular/core';
import {MainPage} from '@modules/main/main.page';
import {LoadingComponent} from '@modules/layout/loading/loading.component';
import {NavbarMenuComponent} from '@modules/layout/navbar-menu/navbar-menu.component';
import {MainRoutingModule} from '@modules/main/main-routing.module';
import {$ScrollTopModule} from '@powell/primeng';

@NgModule({
  declarations: [
    MainPage
  ],
  imports: [
    LoadingComponent,
    NavbarMenuComponent,
    MainRoutingModule,
    $ScrollTopModule,
  ],
})
export class MainModule {
}

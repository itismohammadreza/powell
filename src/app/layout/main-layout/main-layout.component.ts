import {RouterOutlet} from '@angular/router';
import {Component} from '@angular/core';
import {$ScrollTopModule} from '@powell/primeng';
import {LoadingComponent} from '@layout/loading/loading.component';
import {NavbarMenuComponent} from '@layout/navbar-menu/navbar-menu.component';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  imports: [
    LoadingComponent,
    NavbarMenuComponent,
    $ScrollTopModule,
    RouterOutlet,
  ]
})
export class MainLayoutComponent {
}

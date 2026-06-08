import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  DOCUMENT,
  HostListener,
  inject,
  OnInit,
} from '@angular/core';
import { LanguageChecker } from '@core/utils';
import { GlobalConfig, DrawerType } from '@core/models';
import { globalConfig } from '@core/config';
import {
  $AvatarModule,
  $DividerModule,
  $DrawerModule,
  $MenubarModule,
  $MenuItem,
  $PanelMenuModule,
  $PopoverModule,
  $SelectChangeEvent,
  $TooltipModule,
} from '@powell/primeng';
import { ButtonModule } from '@powell/components/button';
import { InputTextModule } from '@powell/components/input-text';
import { SelectModule } from '@powell/components/select';
import { ToggleSwitchModule } from '@powell/components/toggle-switch';
import { FilterModule } from '@powell/pipes/filter';
import { TranslatePipe } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { LogoComponent } from '@layout/logo/logo.component';
import { routes } from '@pages/showcase/showcase-routing.module';
import { RadioModule } from '@powell/components/radio';
import { DesignerComponent } from '@layout/designer/designer.component';

@Component({
  selector: 'app-navbar-menu',
  templateUrl: './navbar-menu.component.html',
  styleUrl: 'navbar-menu.component.scss',
  imports: [
    LogoComponent,
    $AvatarModule,
    $MenubarModule,
    $DrawerModule,
    $PanelMenuModule,
    $DividerModule,
    ButtonModule,
    InputTextModule,
    SelectModule,
    ToggleSwitchModule,
    FilterModule,
    TranslatePipe,
    FormsModule,
    $PopoverModule,
    RadioModule,
    $TooltipModule,
    DesignerComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarMenuComponent extends LanguageChecker implements OnInit, AfterContentInit {
  private document = inject(DOCUMENT);

  drawerType: DrawerType = 'static';
  drawerTypes: $MenuItem[];
  drawerVisible: boolean = true;
  designerDrawerVisible: boolean;
  drawerLock: boolean; // overrides the drawerVisible.
  drawerItems: $MenuItem[];
  config: GlobalConfig = globalConfig;
  tempDrawerType: DrawerType = this.drawerType;
  searchValue: string;

  @HostListener('window:resize', [])
  onResize() {
    this.handleResize();
  }

  ngOnInit() {
    this.loadData();
    this.tempDrawerType = this.drawerType;
    if (this.drawerLock && !this.drawerVisible) {
      this.drawerVisible = true;
    }
    this.handleResize();
  }

  ngAfterContentInit() {
    this.toggleDrawer(this.drawerVisible);
    this.toggleDrawerLock(this.drawerLock);
  }

  handleResize() {
    const responsiveThreshold: number = 768;
    const windowWidth = this.document.defaultView.innerWidth;
    if (windowWidth < responsiveThreshold) {
      if (this.drawerLock) {
        this.toggleDrawerLock(false);
      }
      this.changeDrawerType('overlay', false);
    } else if (windowWidth >= responsiveThreshold) {
      this.changeDrawerType(this.drawerType, false);
    }
  }

  loadData() {
    const drawerTypes: DrawerType[] = [
      'overlay',
      'overlay-mask',
      'push',
      'push-mask',
      'static',
      'horizontal',
    ];
    this.drawerTypes = drawerTypes.map((t) => ({ label: t, value: t }));
    this.drawerItems = routes
      .filter((item) => !item.redirectTo)
      .map((item) => ({
        label: item.title as string,
        icon: 'pi pi-minus',
        routerLink: `showcase/${item.path}`,
        routerLinkActiveOptions: item.path ? '' : { exact: true },
        command: () => {
          if ((!this.drawerLock && this.showBackdrop) || item.path === 'home') {
            this.toggleDrawer(false);
          }
        },
      }));
  }

  changeDrawerType(event: $SelectChangeEvent | DrawerType, assign: boolean) {
    this.tempDrawerType = typeof event === 'string' ? event : event.value;
    if (assign) {
      this.drawerType = this.tempDrawerType;
    }
  }

  toggleDrawerClick() {
    this.drawerVisible = !this.drawerVisible;
    this.toggleDrawer(this.drawerVisible);
  }

  toggleDrawerLockClick() {
    this.drawerLock = !this.drawerLock;
    this.toggleDrawerLock(this.drawerLock);
  }

  toggleDrawer(activate: boolean) {
    this.drawerVisible = activate;
  }

  toggleDrawerLock(activate: boolean) {
    this.drawerLock = activate;
  }

  get showBackdrop() {
    return ['overlay-mask', 'push-mask'].includes(this.tempDrawerType);
  }
}

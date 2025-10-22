import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  DOCUMENT,
  HostListener,
  inject,
  OnInit
} from '@angular/core';
import {LanguageChecker} from '@core/utils';
import {GlobalConfig, SidebarType} from '@core/models';
import {globalConfig} from "@core/config";
import {
  $AvatarModule,
  $DividerModule,
  $DrawerModule,
  $MenubarModule,
  $MenuItem,
  $PanelMenuModule,
  $PopoverModule,
  $SelectChangeEvent,
  $TooltipModule
} from "@powell/primeng";
import {ButtonModule} from "@powell/components/button";
import {InputTextModule} from "@powell/components/input-text";
import {SelectModule} from "@powell/components/select";
import {ToggleSwitchModule} from "@powell/components/toggle-switch";
import {FilterModule} from "@powell/pipes/filter";
import {TranslatePipe} from "@ngx-translate/core";
import {FormsModule} from "@angular/forms";
import {LogoComponent} from "@modules/layout/logo/logo.component";
import {routes} from "@modules/main/pages/showcase/showcase-routing.module";
import {RadioModule} from "@powell/components/radio";
import {DesignerComponent} from '@modules/layout/designer/designer.component';

@Component({
  selector: 'app-navbar-menu',
  templateUrl: './navbar-menu.component.html',
  styleUrls: ['navbar-menu.component.scss'],
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
    DesignerComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarMenuComponent extends LanguageChecker implements OnInit, AfterContentInit {
  private document = inject(DOCUMENT);

  sidebarType: SidebarType = 'static';
  sidebarTypes: $MenuItem[];
  sidebarVisible: boolean = true;
  designerSidebarVisible: boolean;
  sidebarLock: boolean; // overrides the sidebarVisible.
  sidebarItems: $MenuItem[];
  config: GlobalConfig = globalConfig;
  tempSidebarType: SidebarType = this.sidebarType;
  searchValue: string;

  @HostListener('window:resize', [])
  onResize() {
    this.handleResize()
  }

  ngOnInit() {
    this.loadData();
    this.tempSidebarType = this.sidebarType;
    if (this.sidebarLock && !this.sidebarVisible) {
      this.sidebarVisible = true;
    }
    this.handleResize()
  }

  ngAfterContentInit() {
    this.toggleSidebar(this.sidebarVisible);
    this.toggleSidebarLock(this.sidebarLock);
  }

  handleResize() {
    const responsiveThreshold: number = 768;
    const windowWidth = this.document.defaultView.innerWidth;
    if (windowWidth < responsiveThreshold) {
      if (this.sidebarLock) {
        this.toggleSidebarLock(false)
      }
      this.changeSidebarType('overlay', false);
    } else if (windowWidth >= responsiveThreshold) {
      this.changeSidebarType(this.sidebarType, false);
    }
  }

  loadData() {
    const sidebarTypes: SidebarType[] = ['overlay', 'overlay-mask', 'push', 'push-mask', 'static', 'horizontal'];
    this.sidebarTypes = sidebarTypes.map(t => ({label: t, value: t}));
    this.sidebarItems = routes.filter(item => !item.redirectTo).map(item => ({
      label: item.title as string,
      icon: 'pi pi-minus',
      routerLink: `showcase/${item.path}`,
      routerLinkActiveOptions: item.path ? '' : {exact: true},
      command: () => {
        if ((!this.sidebarLock && this.showBackdrop) || item.path === 'home') {
          this.toggleSidebar(false);
        }
      }
    }));
  }

  changeSidebarType(event: $SelectChangeEvent | SidebarType, assign: boolean) {
    this.tempSidebarType = typeof event === 'string' ? event : event.value;
    if (assign) {
      this.sidebarType = this.tempSidebarType;
    }
  }

  toggleSidebarClick() {
    this.sidebarVisible = !this.sidebarVisible;
    this.toggleSidebar(this.sidebarVisible);
  }

  toggleLockSidebarClick() {
    this.sidebarLock = !this.sidebarLock;
    this.toggleSidebarLock(this.sidebarLock);
  }

  toggleSidebar(activate: boolean) {
    this.sidebarVisible = activate;
  }

  toggleSidebarLock(activate: boolean) {
    this.sidebarLock = activate;
  }

  get showBackdrop() {
    return ['overlay-mask', 'push-mask'].includes(this.tempSidebarType);
  }
}

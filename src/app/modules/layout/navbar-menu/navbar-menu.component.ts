import {AfterContentInit, ChangeDetectionStrategy, Component, HostListener, inject, OnInit} from '@angular/core';
import {CommonModule, DOCUMENT} from "@angular/common";
import {LanguageChecker} from '@core/utils';
import {GlobalConfig, SidebarType} from '@core/models';
import {ConfigService, ThemeService} from "@powell/api";
import {globalConfig} from "@core/config";
import {
  $AvatarModule,
  $DividerModule,
  $DropdownChangeEvent,
  $MenubarModule,
  $MenuItem,
  $MenuModule,
  $PanelMenuModule,
  $SidebarModule
} from "@powell/primeng";
import {ButtonModule} from "@powell/components/button";
import {InputTextModule} from "@powell/components/input-text";
import {DropdownModule} from "@powell/components/dropdown";
import {SwitchModule} from "@powell/components/switch";
import {FilterModule} from "@powell/pipes/filter";
import {TranslateModule} from "@ngx-translate/core";
import {FormsModule} from "@angular/forms";
import {LogoComponent} from "@modules/layout/logo/logo.component";
import {routes} from "@modules/main/pages/showcase/showcase-routing.module";
import {lastValueFrom} from "rxjs";

@Component({
  selector: 'ng-navbar-menu',
  templateUrl: './navbar-menu.component.html',
  styleUrls: ['./navbar-menu.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    LogoComponent,
    $AvatarModule,
    $MenubarModule,
    $SidebarModule,
    $PanelMenuModule,
    $MenuModule,
    $DividerModule,
    ButtonModule,
    InputTextModule,
    DropdownModule,
    SwitchModule,
    FilterModule,
    TranslateModule,
    FormsModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarMenuComponent extends LanguageChecker implements OnInit, AfterContentInit {
  private document = inject(DOCUMENT);
  private themeService = inject(ThemeService);
  private configService = inject(ConfigService);

  sidebarType: SidebarType = 'push-mask';
  sidebarTypes: $MenuItem[];
  sidebarVisible: boolean;
  configSidebarVisible: boolean;
  sidebarLock: boolean; // overrides the sidebarVisible.
  sidebarItems: $MenuItem[];
  config: GlobalConfig = globalConfig;
  tempSidebarType: SidebarType = 'push-mask';
  themes: $MenuItem[];
  searchValue: string;

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.handleResize()
  }

  ngOnInit() {
    this.loadData();
    this.tempSidebarType = this.sidebarType;
    if (this.sidebarLock && !this.sidebarVisible) {
      this.sidebarVisible = true;
    }
  }

  ngAfterContentInit() {
    this.toggleSidebar(this.sidebarVisible);
    this.toggleSidebarLock(this.sidebarLock);
  }

  handleResize() {
    const responsiveThreshold: number = 768;
    const windowWidth = this.document.defaultView.innerWidth;
    if (windowWidth < responsiveThreshold) {
      this.changeSidebarType('overlay', false);
    } else if (windowWidth >= responsiveThreshold) {
      this.changeSidebarType(this.sidebarType, false);
    }
  }

  loadData() {
    const themes: string[] = this.themeService.getAllThemes();
    const sidebarTypes: SidebarType[] = ['overlay', 'overlay-mask', 'push', 'push-mask', 'hover', 'static', 'horizontal'];
    this.themes = themes.map(t => ({label: t, value: t}));
    this.sidebarTypes = sidebarTypes.map(t => ({label: t, value: t}));
    this.sidebarItems = routes.map(item => ({
      label: item.title as string,
      routerLink: `showcase/${item.path}`,
      routerLinkActiveOptions: item.path ? '' : {exact: true},
      icon: 'pi pi-minus',
      command: () => {
        if (!this.sidebarLock && this.showBackdrop) {
          this.toggleSidebar(false);
        }
      }
    }));
  }

  changeGlobalConfig(config: string, value: any) {
    this.config[config] = value;
    this.configService.update({[config]: value});
  }

  async changeLang(event: $DropdownChangeEvent) {
    await lastValueFrom(this.translationService.use(event.value));
  }

  changeSidebarType(event: $DropdownChangeEvent | SidebarType, assign: boolean) {
    this.tempSidebarType = typeof event === 'string' ? event : event.value;
    if (assign) {
      this.sidebarType = this.tempSidebarType;
    }
    if (this.tempSidebarType === 'hover') {
      this.toggleSidebar(true);
    } else {
      this.toggleSidebar(false);
    }
    this.toggleSidebarLock(false);
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

  showBackdrop() {
    return ['overlay-mask', 'push-mask'].includes(this.tempSidebarType);
  }
}

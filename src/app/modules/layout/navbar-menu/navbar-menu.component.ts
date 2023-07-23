import {AfterContentInit, AfterViewChecked, Component, HostListener, Inject, Input, OnInit} from '@angular/core';
import {CommonModule, DOCUMENT} from "@angular/common";
import {LanguageChecker} from '@core/utils';
import {SidebarType} from '@core/models';
import {ConfigService, ThemeService} from "@powell/api";
import {NgConfig} from "@powell/models";
import {appConfig} from "@core/config";
import {PrimeMenuItem} from "@powell/primeng/api";
import {
  PrimeAvatarModule,
  PrimeDividerModule,
  PrimeMenubarModule,
  PrimeMenuModule,
  PrimePanelMenuModule,
  PrimeSidebarModule
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

@Component({
  selector: 'ng-navbar-menu',
  templateUrl: './navbar-menu.component.html',
  styleUrls: ['./navbar-menu.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    LogoComponent,
    PrimeAvatarModule,
    PrimeMenubarModule,
    PrimeSidebarModule,
    PrimePanelMenuModule,
    PrimeMenuModule,
    PrimeDividerModule,
    ButtonModule,
    InputTextModule,
    DropdownModule,
    SwitchModule,
    FilterModule,
    TranslateModule,
    FormsModule,
  ]
})
export class NavbarMenuComponent extends LanguageChecker implements OnInit, AfterViewChecked, AfterContentInit {
  @Input() sidebarType: SidebarType = 'push-mask';
  @Input() sidebarVisible: boolean = false;
  @Input() sidebarLock: boolean = false; // overrides the sidebarVisible.
  @Input() responsiveThreshold: number = 768;
  @Input() sidebarItems: PrimeMenuItem[];

  configSidebarVisible: boolean = false;
  config: NgConfig = {
    rtl: this.configService.getConfig().rtl,
    theme: this.configService.getConfig().theme,
    labelPos: this.configService.getConfig().labelPos,
    fixLabelPos: this.configService.getConfig().fixLabelPos,
    filled: this.configService.getConfig().filled,
    showRequiredStar: this.configService.getConfig().showRequiredStar,
    inputSize: this.configService.getConfig().inputSize,
    ripple: this.configService.getConfig().ripple,
  }
  lang: string = appConfig.lang;
  tempSidebarType: SidebarType = 'push-mask';
  themes: PrimeMenuItem[];
  sidebarTypes: PrimeMenuItem[];
  searchValue: string;
  accountItems: PrimeMenuItem[] = [
    {
      label: 'خروج',
      icon: 'pi pi-sign-out',
      command: () => {
      }
    }
  ];

  @HostListener('window:resize', ['$event'])
  onResize() {
    if (this.document.defaultView.innerWidth < this.responsiveThreshold) {
      this.changeSidebarType('overlay', false);
      this.maskEl?.classList.remove('d-none');
    } else if (this.document.defaultView.innerWidth >= this.responsiveThreshold) {
      this.changeSidebarType(this.sidebarType, false);
    }
  }

  constructor(@Inject(DOCUMENT) private document: Document,
              private themeService: ThemeService,
              private configService: ConfigService) {
    super();
  }

  ngOnInit() {
    this.loadData();
    this.tempSidebarType = this.sidebarType;
    if (this.sidebarLock && !this.sidebarVisible) {
      this.sidebarVisible = true;
    }
  }

  ngAfterViewChecked() {
    this.toggleSidebar(this.sidebarVisible);
    this.toggleSidebarLock(this.sidebarLock);
  }

  ngAfterContentInit() {
    if (this.document.defaultView.innerWidth < this.responsiveThreshold) {
      this.changeSidebarType('overlay', false);
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
        if (!this.sidebarLock && this.isModalSidebar) {
          this.toggleSidebar(false);
        }
      }
    }));
  }

  changeGlobalConfig(config: string, value: any) {
    this.config[config] = value;
    this.configService.setConfig({[config]: value});
  }

  async changeLang(event) {
    await this.translationService.use(event.value).toPromise();
  }

  changeSidebarType(event: any, assign: boolean) {
    this.tempSidebarType = event.value || event;
    if (assign) {
      this.sidebarType = this.tempSidebarType;
    }
    if (this.tempSidebarType == 'hover') {
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
    if (['overlay', 'push'].includes(this.tempSidebarType)) {
      setTimeout(() => {
        if (this.sidebarVisible) {
          this.toggleMaskVisibility(false);
        }
      }, 0);
    }
  }

  toggleSidebarLock(activate: boolean) {
    this.sidebarLock = activate;
    if (this.isModalSidebar && this.sidebarVisible) {
      this.toggleMaskDisplay(!this.sidebarLock);
    }
  }

  toggleMaskDisplay(activate: boolean) {
    const body = this.document.body;
    if (activate) {
      this.maskEl?.classList.remove('d-none');
      body.classList.add('p-overflow-hidden');
    } else {
      this.maskEl?.classList.add('d-none');
      body.classList.remove('p-overflow-hidden');
    }
  }

  toggleMaskVisibility(activate: boolean) {
    if (this.maskEl) {
      if (activate) {
        this.maskEl.style.transitionDuration = '0.2ms';
        this.maskEl.style.opacity = '1';
      } else {
        this.maskEl.style.transitionDuration = '0ms';
        this.maskEl.style.opacity = '0';
      }
    }
  }

  get maskEl() {
    return this.document.querySelector('.p-sidebar-mask') as HTMLDivElement;
  }

  get isModalSidebar() {
    return (this.tempSidebarType == 'overlay' || this.tempSidebarType == 'overlay-mask' || this.tempSidebarType == 'push' || this.tempSidebarType == 'push-mask');
  }
}

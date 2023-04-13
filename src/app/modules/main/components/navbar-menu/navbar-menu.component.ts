import {AfterContentInit, AfterViewChecked, Component, HostListener, Inject, Input, OnInit} from '@angular/core';
import {DOCUMENT} from "@angular/common";
import {LanguageChecker} from '@core/utils';
import {SidebarType} from '@core/models';
import {ConfigService, ThemeService} from "@ng/api";
import {NgFixLabelPosition, NgLabelPosition, NgSize, NgTheme} from "@ng/models";
import {Global} from "@core/config";
import {PrimeMenuItem, PrimeOverlayOptions} from "@ng/primeng/api";

@Component({
  selector: 'ng-navbar-menu',
  templateUrl: './navbar-menu.component.html',
  styleUrls: ['./navbar-menu.component.scss']
})
export class NavbarMenuComponent extends LanguageChecker implements OnInit, AfterViewChecked, AfterContentInit {
  @Input() sidebarType: SidebarType = 'push-mask';
  @Input() sidebarVisible: boolean = false;
  @Input() sidebarLock: boolean = false; // overrides the sidebarVisible.
  @Input() responsiveThreshold: number = 768;

  configSidebarVisible: boolean = false;
  rtl: boolean = this.configService.getConfig().rtl;
  theme: NgTheme = this.configService.getConfig().theme;
  labelPos: NgLabelPosition = this.configService.getConfig().labelPos;
  fixLabelPos: NgFixLabelPosition = this.configService.getConfig().fixLabelPos;
  filled: boolean = this.configService.getConfig().filled;
  showRequiredStar: boolean = this.configService.getConfig().showRequiredStar;
  inputSize: NgSize = this.configService.getConfig().inputSize;
  ripple: boolean = this.configService.getConfig().ripple;
  overlayOptions: PrimeOverlayOptions = this.configService.getConfig().overlayOptions;
  lang: string = Global.config.lang;

  tempSidebarType: SidebarType;
  themes: PrimeMenuItem[];
  sidebarTypes: PrimeMenuItem[];
  sidebarItems: PrimeMenuItem[];
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
      this.changeSidebarType('overlay');
      this.maskEl?.classList.remove('d-none');
    } else if (this.document.defaultView.innerWidth >= this.responsiveThreshold) {
      this.changeSidebarType(this.sidebarType);
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
      this.changeSidebarType('overlay');
    }
  }

  loadData() {
    const themes: string[] = this.themeService.getAllThemes();
    const sidebarTypes: SidebarType[] = ['overlay', 'overlay-mask', 'push', 'push-mask', 'hover', 'static', 'horizontal'];
    const sidebarItems: string[] = [
      'dashboard',
      'animate-on-scroll',
      'auto-complete',
      'bottom-sheet',
      'button',
      'cascade-select',
      'checkbox',
      'chips',
      'color-picker',
      'confirm-dialog',
      'confirm-popup',
      'dialog',
      'dialog-form',
      'dropdown',
      'dual-label-switch',
      'dynamic-form',
      'editor',
      'empty',
      'file-picker',
      'file-picker2',
      'gregorian-datepicker',
      'image',
      'image-slider',
      'infinite-scroll',
      'input-mask',
      'input-number',
      'input-otp',
      'input-password',
      'input-text',
      'input-textarea',
      'iran-map',
      'jalali-datepicker',
      'knob',
      'listbox',
      'loading-container',
      'map',
      'message',
      'multi-checkbox',
      'multi-select',
      'radio',
      'rating',
      'select-button',
      'slider',
      'split-button',
      'status',
      'switch',
      'table',
      'toast',
      'toggle-button',
      'tree',
      'tree-select',
      'tri-state-checkbox',
      'utils',
    ];
    this.themes = themes.map((t, i) => ({label: t, value: t}));
    this.sidebarTypes = sidebarTypes.map((t) => ({label: t, value: t}));
    this.sidebarItems = sidebarItems.map(item => ({
      label: item,
      routerLink: `showcase/${item}`,
      icon: 'pi pi-minus',
      command: () => {
        if (!this.sidebarLock && this.isModalSidebar) {
          this.toggleSidebar(false);
        }
      }
    }));
  }

  changeGlobalConfig(config: string, value: any) {
    this[config] = value;
    this.configService.setConfig({[config]: value});
  }

  async changeLang(event) {
    await this.translationService.use(event.value).toPromise();
  }

  changeSidebarType(event: any) {
    this.tempSidebarType = event.value || event;
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

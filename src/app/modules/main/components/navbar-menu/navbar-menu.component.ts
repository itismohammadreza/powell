import {AfterContentInit, AfterViewChecked, Component, HostListener, OnInit, ViewChild} from '@angular/core';
import {LanguageChecker} from '@core/utils';
import {MenuItem} from 'primeng/api';
import {SidebarType} from '@core/models';
import {OverlayPanel} from "primeng/overlaypanel";
import {GlobalConfig} from "@core/global.config";

@Component({
  selector: 'ng-navbar-menu',
  templateUrl: './navbar-menu.component.html',
  styleUrls: ['./navbar-menu.component.scss']
})
export class NavbarMenuComponent extends LanguageChecker implements OnInit, AfterViewChecked, AfterContentInit {
  @ViewChild(OverlayPanel) overlayPanel: OverlayPanel;

  @HostListener('window:resize', ['$event'])
  onResize() {
    if (this.document.defaultView.innerWidth < this.responsiveThreshold) {
      this.changeSidebarType('overlay');
      this.toggleOverlayDisplay(true);
    } else if (this.document.defaultView.innerWidth > this.responsiveThreshold && this.sidebarType != GlobalConfig.defaultSidebarType) {
      this.changeSidebarType(GlobalConfig.defaultSidebarType);
    }
  }

  responsiveThreshold: number = 768;
  theme: string = GlobalConfig.defaultTheme;
  language: string = GlobalConfig.defaultLang;
  sidebarVisible: boolean = GlobalConfig.defaultSidebarVisible;
  sidebarLock: boolean = GlobalConfig.defaultSidebarLock;
  sidebarType: SidebarType = GlobalConfig.defaultSidebarType;
  themes: MenuItem[];
  sidebarTypes: MenuItem[];
  sidebarItems: MenuItem[];
  searchValue: string;
  accountItems: MenuItem[] = [
    {
      label: 'خروج',
      icon: 'pi pi-sign-out',
      command: () => {
      }
    }
  ];

  constructor() {
    super();
  }

  ngOnInit() {
    this.loadData();
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
    const themes: string[] = [
      'arya-blue',
      'arya-green',
      'arya-orange',
      'arya-purple',
      'bootstrap4-dark-blue',
      'bootstrap4-dark-purple',
      'bootstrap4-light-blue',
      'bootstrap4-light-purple',
      'fluent-light',
      'lara-dark-indigo',
      'lara-dark-purple',
      'lara-light-indigo',
      'lara-light-purple',
      'luna-amber',
      'luna-blue',
      'luna-green',
      'luna-pink',
      'md-dark-deeppurple',
      'md-dark-indigo',
      'md-light-deeppurple',
      'md-light-indigo',
      'mdc-dark-deeppurple',
      'mdc-dark-indigo',
      'mdc-light-deeppurple',
      'mdc-light-indigo',
      'mira',
      'nano',
      'nova',
      'nova-accent',
      'nova-alt',
      'rhea',
      'saga-blue',
      'saga-green',
      'saga-orange',
      'saga-purple',
      'soho-dark',
      'soho-light',
      'tailwind-light',
      'vela-blue',
      'vela-green',
      'vela-orange',
      'vela-purple',
      'viva-dark',
      'viva-light',
    ];
    const sidebarTypes: SidebarType[] = ['overlay', 'overlay-mask', 'push', 'push-mask', 'hover', 'static', 'horizontal'];
    const sidebarItems: string[] = [
      'dashboard',
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
      'input-mask',
      'input-number',
      'input-password',
      'input-text',
      'input-textarea',
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

    this.themes = themes.map((t, i) => ({label: `${i + 1}-${t}`, value: t}));
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

  changeTheme(event) {
    const themeElement = this.document.getElementById('theme-link');
    themeElement.setAttribute(
      'href',
      themeElement.getAttribute('href').replace(this.theme, event.value)
    );
    this.theme = event.value;
    this.overlayPanel?.hide();
  }

  async changeLang(event) {
    await this.translationService.use(event.value).toPromise();
    this.language = event.value;
    this.overlayPanel?.hide();
  }

  changeSidebarType(event: any) {
    this.sidebarType = event.value || event;
    if (this.sidebarType == 'hover') {
      this.toggleSidebar(true);
    } else {
      this.toggleSidebar(false);
    }
    this.toggleSidebarLock(false);
    this.overlayPanel?.hide();
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
    if (['overlay', 'push'].includes(this.sidebarType)) {
      setTimeout(() => {
        if (this.sidebarVisible) {
          this.toggleOverlayVisibility(false);
        }
      }, 0);
    }
  }

  toggleSidebarLock(activate: boolean) {
    this.sidebarLock = activate;
    if (['overlay', 'push', 'overlay-mask', 'push-mask'].includes(this.sidebarType) && this.sidebarVisible) {
      this.toggleOverlayDisplay(!this.sidebarLock);
    }
  }

  toggleOverlayDisplay(activate: boolean) {
    const overlay = this.document.querySelector('.p-sidebar-mask');
    const body = this.document.body;
    if (activate) {
      overlay?.classList.remove('d-none');
      body.classList.add('p-overflow-hidden');
    } else {
      overlay?.classList.add('d-none');
      body.classList.remove('p-overflow-hidden');
    }
  }

  toggleOverlayVisibility(activate: boolean) {
    const overlay: any = this.document.querySelector('.p-sidebar-mask');
    if (overlay) {
      if (activate) {
        overlay.style.transitionDuration = '0.2ms';
        overlay.style.opacity = 1;
      } else {
        overlay.style.transitionDuration = '0ms';
        overlay.style.opacity = 0;
      }
    }
  }

  getWrapperClasses() {
    return `menu-${this.sidebarType} ${this.fa ? 'rtl' : ''} ${this.sidebarLock ? 'sidebar-lock' : ''}  ${this.sidebarVisible ? 'sidebar-open' : ''}`
  }

  get isModalSidebar() {
    return (this.sidebarType == 'overlay' || this.sidebarType == 'overlay-mask' || this.sidebarType == 'push' || this.sidebarType == 'push-mask');
  }
}

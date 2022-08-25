import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {LanguageChecker} from '@core/utils';
import {MenuItem} from 'primeng/api';
import {SidebarType} from '@core/models';
import {AuthService} from '@core/http';
import {OverlayPanel} from "primeng/overlaypanel";

@Component({
  selector: 'ng-navbar-menu',
  templateUrl: './navbar-menu.component.html',
  styleUrls: ['./navbar-menu.component.scss']
})
export class NavbarMenuComponent extends LanguageChecker implements OnInit {
  @Input() sidebarVisible: boolean;
  @Input() sidebarLock: boolean;
  @Input() sidebarType: SidebarType;
  @Input() user: any;
  @Output() sidebarVisibleChange = new EventEmitter();
  @Output() sidebarLockChange = new EventEmitter();
  @Output() sidebarTypeChange = new EventEmitter();
  @ViewChild(OverlayPanel) overlayPanel: OverlayPanel;

  accountItems: MenuItem[] = [
    {
      label: 'خروج',
      icon: 'pi pi-sign-out',
      command: async () => {
        this.authService.logout();
      }
    }
  ];
  language = this.translationService.getDefaultLang();
  theme = 'lara-light-indigo';
  themes: MenuItem[];
  sidebarTypes: MenuItem[];
  sidebarItems: MenuItem[];
  searchValue: string;

  constructor(
    private router: Router,
    private authService: AuthService,
  ) {
    super();
  }

  ngOnInit() {
    this.loadData();
  }

  changeTheme(event) {
    const themeElement = this.document.getElementById('theme-link');
    themeElement.setAttribute(
      'href',
      themeElement.getAttribute('href').replace(this.theme, event.value)
    );
    this.theme = event.value;
    this.overlayPanel.hide();
  }

  async changeLang(event) {
    await this.translationService.use(event.value).toPromise();
    this.language = event.value;
    this.overlayPanel.hide();
  }

  changeSidebarType(event: any) {
    this.sidebarTypeChange.emit(event.value);
    this.sidebarType = event.value;
    this.overlayPanel.hide();
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
    this.sidebarVisibleChange.emit(this.sidebarVisible);
  }

  toggleSidebarLock(activate: boolean) {
    this.sidebarLock = activate;
    this.sidebarLockChange.emit(this.sidebarLock);
  }

  loadData() {
    const themes = [
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
    const sidebarItems = [
      'dashboard',
      'auto-complete',
      'button',
      'button-async',
      'cascade-select',
      'chips',
      'color-picker',
      'date-picker',
      'dynamic-form',
      'dropdown',
      'editor',
      'file-picker',
      'file-picker2',
      'image-slider',
      'mask',
      'number',
      'password',
      'text',
      'textarea',
      'knob',
      'list-box',
      'map',
      'multi-checkbox',
      'multi-select',
      'radio',
      'rating',
      'select-button',
      'single-checkbox',
      'slider',
      'split-button',
      'switch',
      'table',
      'toggle-button',
      'tree',
      'tree-select',
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

  get isModalSidebar() {
    return (this.sidebarType == 'overlay' || this.sidebarType == 'overlay-mask' || this.sidebarType == 'push' || this.sidebarType == 'push-mask');
  }

  onClickOutside() {
    console.log('is out')
  }
}

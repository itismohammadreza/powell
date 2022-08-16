import {Component, HostListener, OnInit} from '@angular/core';
import {LanguageChecker} from '@core/utils';
import {MenuType} from '@core/models';
import {MenuItem} from 'primeng/api';

@Component({
  selector: 'ng-main-page',
  styleUrls: ['main.page.scss'],
  templateUrl: './main.page.html',
})
export class MainPage extends LanguageChecker implements OnInit {
  constructor() {
    super();
  }

  sidebarVisible = false;
  sidebarLock = false;
  menuType: MenuType = 'overlay';
  sidebarItems: MenuItem[];

  @HostListener('window:resize', ['$event']) onResize(e) {
    this.handleResize();
  }

  ngOnInit(): void {
    this.handleResize();
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
    this.sidebarItems = sidebarItems.map(item => ({
      label: item,
      routerLink: `showcase/${item}`,
      icon: 'pi pi-minus'
    }));
  }

  handleResize() {
    if (this.document.defaultView.innerWidth < 767) {
      this.onMenuTypeChange('overlay');
      this.toggleOverlayDisplay(false);
    } else {
      this.onMenuTypeChange('push');
    }
  }


  getClasses() {
    let classes = `menu-${this.menuType}`;
    if (this.fa) {
      classes += ' rtl ';
    }
    if (this.sidebarLock) {
      classes += ' sidebar-lock ';
    }
    if (this.sidebarVisible) {
      classes += ' sidebar-open ';
    }
    return classes;
  }

  onMenuTypeChange(event: MenuType) {
    this.menuType = event;
    if (event == 'hover') {
      this.onSidebarVisibleChange(true);
    } else {
      this.onSidebarVisibleChange(false);
    }
    this.onSidebarLockChange(false);
  }

  onSidebarVisibleChange(event: boolean) {
    this.sidebarVisible = event;
    if (this.menuType == 'overlay' || this.menuType == 'push') {
      setTimeout(() => {
        if (this.sidebarVisible) {
          this.toggleOverlayVisibility(false);
        }
      }, 0);
    }
  }

  onSidebarLockChange(event: boolean) {
    this.sidebarLock = event;
    if (this.menuType == 'overlay' || this.menuType == 'overlay-mask' || this.menuType == 'push' || this.menuType == 'push-mask') {
      this.toggleOverlayDisplay(!event);
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
    const overlay = this.document.querySelector('.p-sidebar-mask') as any;
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
}

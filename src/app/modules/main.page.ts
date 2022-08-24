import {Component, HostListener, OnInit} from '@angular/core';
import {LanguageChecker} from '@core/utils';
import {SidebarType} from '@core/models';

@Component({
  selector: 'ng-main-page',
  styleUrls: ['main.page.scss'],
  templateUrl: './main.page.html',
})
export class MainPage extends LanguageChecker implements OnInit {
  constructor() {
    super();
  }

  sidebarVisible = true;
  sidebarLock = true;
  sidebarType: SidebarType = 'push';

  @HostListener('window:resize', ['$event']) onResize(e) {
    this.handleResize();
  }

  ngOnInit(): void {
    this.onSidebarTypeChange(this.sidebarType);
  }

  handleResize() {
    if (this.document.defaultView.innerWidth < 767) {
      this.onSidebarTypeChange('overlay');
      this.toggleOverlayDisplay(false);
    } else {
      this.onSidebarTypeChange(this.sidebarType);
    }
  }

  onSidebarTypeChange(event: SidebarType) {
    this.sidebarType = event;
    if (event == 'hover') {
      this.onSidebarVisibleChange(true);
    } else {
      this.onSidebarVisibleChange(false);
    }
    this.onSidebarLockChange(false);
  }

  onSidebarVisibleChange(event: boolean) {
    this.sidebarVisible = event;
    if (this.sidebarType == 'overlay' || this.sidebarType == 'push') {
      setTimeout(() => {
        if (this.sidebarVisible) {
          this.toggleOverlayVisibility(false);
        }
      }, 0);
    }
  }

  onSidebarLockChange(event: boolean) {
    this.sidebarLock = event;
    if (this.sidebarType == 'overlay' || this.sidebarType == 'overlay-mask' || this.sidebarType == 'push' || this.sidebarType == 'push-mask') {
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

  getWrapperClasses() {
    return {
      [`menu-${this.sidebarType}`]: true,
      rtl: this.fa,
      'sidebar-lock': this.sidebarLock,
      'sidebar-open': this.sidebarVisible
    }
  }
}

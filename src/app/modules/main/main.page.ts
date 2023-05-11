import {Component, Inject} from '@angular/core';
import {Global} from "@core/config";
import {ConfigService} from "@powell/api";
import {DOCUMENT} from "@angular/common";

@Component({
  selector: 'ng-main-page',
  styleUrls: ['main.page.scss'],
  templateUrl: './main.page.html',
  animations: [Global.Config.routeAnimation]
})
export class MainPage {
  constructor(private configService: ConfigService, @Inject(DOCUMENT) private document: Document) {
    this.handleBootstrapFiles(Global.Config.rtl);
    this.configService.configChange$.subscribe(res => {
      this.handleBootstrapFiles(res.currentConfig.rtl)
    })
  }

  private handleBootstrapFiles(rtl: boolean) {
    let bootStrapLinkEl: any = this.document.querySelector('#bootstrap-style-link');
    if (!bootStrapLinkEl) {
      const head = this.document.querySelector('head');
      bootStrapLinkEl = this.document.createElement('link');
      bootStrapLinkEl.id = "bootstrap-style-link";
      bootStrapLinkEl.rel = "stylesheet";
      bootStrapLinkEl.type = "text/css";
      head.appendChild(bootStrapLinkEl);
    }
    const themeLink = `assets/styles/vendor/bootstrap/bootstrap${rtl ? '.rtl' : ''}.css`;
    bootStrapLinkEl.setAttribute('href', themeLink);
  }
}

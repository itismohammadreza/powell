import {Component, Inject} from '@angular/core';
import {ConfigService} from "@powell/api";
import {DOCUMENT} from "@angular/common";
import {appConfig} from "@core/config";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private configService: ConfigService, @Inject(DOCUMENT) private document: Document) {
    this.handleBootstrapFiles(appConfig.rtl);
    this.configService.configChange$.subscribe(res => {
      this.handleBootstrapFiles(res.currentConfig.rtl)
    })
  }

  private handleBootstrapFiles(rtl: boolean) {
    let bootstrapLink: HTMLLinkElement = this.document.querySelector('#bootstrap-style-link');
    const {documentElement, head} = this.document;
    const themeLink = `assets/styles/vendor/bootstrap/bootstrap${rtl ? '.rtl' : ''}.css`;
    if (!bootstrapLink) {
      bootstrapLink = this.document.createElement('link');
      bootstrapLink.id = "bootstrap-style-link";
      bootstrapLink.rel = "stylesheet";
      bootstrapLink.type = "text/css";
      head.insertBefore(bootstrapLink, head.childNodes[1]);
    }
    bootstrapLink.setAttribute('href', themeLink);
    documentElement.setAttribute('dir', rtl ? 'rtl' : 'ltr');
  }
}

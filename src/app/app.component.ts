import {Component, inject, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {ConfigService} from "@powell/api";
import {DOCUMENT} from "@angular/common";
import {globalConfig} from "@core/config";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  private document = inject(DOCUMENT);
  private configService = inject(ConfigService);

  ngOnInit() {
    this.handleBootstrapFiles(globalConfig.rtl);
    this.configService.configChange$.subscribe(res => {
      this.handleBootstrapFiles(res.currentConfig.rtl)
    })
  }

  handleBootstrapFiles(rtl: boolean) {
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

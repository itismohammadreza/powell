import {APP_INITIALIZER, Injector, NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {CoreModule} from "@core/core.module";
import {EnvServiceProvider, TranslationService} from "@core/utils";
import {NgAllModule} from "@ng/all.module";
import {initiateNgConfigProvider} from "@ng/api";
import {NgGlobal} from "@core/config";

export function httpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

export function initiateLanguage(translationService: TranslationService) {
  return (): Promise<any> => {
    return translationService.init();
  }
}

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CoreModule,
    NgAllModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    EnvServiceProvider,
    {provide: APP_INITIALIZER, useFactory: initiateLanguage, deps: [TranslationService], multi: true},
    initiateNgConfigProvider()
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private injector: Injector) {
    NgGlobal.Injector = this.injector;
  }
}

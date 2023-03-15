import {APP_INITIALIZER, Injector, NgModule} from '@angular/core';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {CoreModule} from "@core/core.module";
import {SharedModule} from "@shared/shared.module";
import {EnvServiceProvider, TranslationService} from "@core/utils";
import {NgAllModule} from "@ng/all.module";
import {setNgConfigProvider} from "@ng/api";
import {NgGlobal} from "@core/config";
import {LayoutModule} from "@modules/layout/layout.module";

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

export function InitializeLanguage(translationService: TranslationService) {
  return (): Promise<any> => {
    return translationService.init();
  }
}

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CoreModule,
    LayoutModule,
    SharedModule,
    NgAllModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    EnvServiceProvider,
    {provide: APP_INITIALIZER, useFactory: InitializeLanguage, deps: [TranslationService], multi: true},
    setNgConfigProvider()
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private injector: Injector) {
    NgGlobal.Injector = this.injector;
  }
}

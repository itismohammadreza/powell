import {APP_INITIALIZER, NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {NotFoundPage} from '@modules/layout/not-found/not-found.page';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {CoreModule} from "@core/core.module";
import {SharedModule} from "@shared/shared.module";
import {EnvServiceProvider, TranslationService} from "@core/utils";
import {NgAllModule} from "@ng/all.module";

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
    NotFoundPage
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CoreModule,
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
    {provide: APP_INITIALIZER, useFactory: InitializeLanguage, deps: [TranslationService], multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private injector: Injector) {
    NgGlobal.Injector = this.injector;
  }
}

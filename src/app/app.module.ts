import {APP_INITIALIZER, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {CommonModule} from "@angular/common";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {CoreModule} from "@core/core.module";
import {SharedModule} from "@shared/shared.module";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {EnvServiceProvider, TranslationService} from "@core/utils";
import {NotFoundPage} from '@modules/layout/not-found/not-found.page';

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
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    SharedModule,
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
}

import {NgModule} from '@angular/core';
import {HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {CoreModule} from "@core/core.module";

@NgModule({
  declarations: [AppComponent],
  imports: [
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CoreModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

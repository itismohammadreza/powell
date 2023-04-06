import {NgModule} from '@angular/core';
import {AuthRoutingModule} from '@modules/auth/auth-routing.module';
import {COMPONENTS} from '.';
import {InputTextModule} from "@ng/components/input-text";
import {ButtonModule} from "@ng/components/button";
import {CheckboxModule} from "@ng/components/checkbox";
import {ReactiveFormsModule} from "@angular/forms";
import {LayoutModule} from "@modules/layout/layout.module";

@NgModule({
  declarations: [...COMPONENTS],
  exports: [...COMPONENTS],
  imports: [
    AuthRoutingModule,
    InputTextModule,
    ButtonModule,
    CheckboxModule,
    ReactiveFormsModule,
    LayoutModule
  ],
})
export class AuthModule {
}

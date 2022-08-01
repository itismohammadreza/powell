import { NgModule } from '@angular/core';
import { AuthRoutingModule } from '@modules/auth/auth-routing.module';
import { SharedModule } from '@shared/shared.module';
import { COMPONENTS } from '.';

@NgModule({
  declarations: [...COMPONENTS],
  exports: [...COMPONENTS],
  imports: [AuthRoutingModule, SharedModule],
})
export class AuthModule {}

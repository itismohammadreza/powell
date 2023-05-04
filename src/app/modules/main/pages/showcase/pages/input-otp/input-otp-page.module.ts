import {NgModule} from "@angular/core";
import {ReactiveFormsModule} from "@angular/forms";
import {InputOtpModule} from "@powell/components/input-otp";
import {ExtrasModule} from "@modules/main/pages/showcase/extras.module";
import {RouterModule} from "@angular/router";
import {InputOtpPage} from "@modules/main/pages/showcase/pages/input-otp";

@NgModule({
  declarations: [InputOtpPage],
  imports: [
    InputOtpModule,
    ReactiveFormsModule,
    ExtrasModule,
    RouterModule.forChild([{path: '', component: InputOtpPage}])
  ],
})
export class InputOtpPageModule {
}

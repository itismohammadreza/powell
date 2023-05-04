import {NgModule} from '@angular/core';
import {AutoCompleteModule} from "@powell/components/auto-complete";
import {AutoCompletePage} from "@modules/main/pages/showcase/pages/auto-complete";
import {RouterModule} from "@angular/router";
import {ReactiveFormsModule} from "@angular/forms";
import {ExtrasModule} from "@modules/main/pages/showcase/extras.module";

@NgModule({
  declarations: [AutoCompletePage],
  imports: [
    AutoCompleteModule,
    ExtrasModule,
    ReactiveFormsModule,
    RouterModule.forChild([{path: '', component: AutoCompletePage}])
  ]
})
export class AutoCompletePageModule {
}

import {NgModule} from "@angular/core";
import {ReactiveFormsModule} from "@angular/forms";
import {ListboxModule} from "@powell/components/listbox";
import {ExtrasModule} from "@modules/main/pages/showcase/extras.module";
import {RouterModule} from "@angular/router";
import {ListboxPage} from "@modules/main/pages/showcase/pages/listbox";

@NgModule({
  declarations: [ListboxPage],
  imports: [
    ListboxModule,
    ReactiveFormsModule,
    ExtrasModule,
    RouterModule.forChild([{path: '', component: ListboxPage}])
  ],
})
export class ListboxPageModule {
}

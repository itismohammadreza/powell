import {NgModule} from '@angular/core';
import {DIRECTIVES} from '.';

@NgModule({
  exports: [...DIRECTIVES],
  declarations: [...DIRECTIVES],
})
export class NgDirectivesModule {}

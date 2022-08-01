import {NgModule} from '@angular/core';
import {PIPES} from '.';

@NgModule({
  exports: [...PIPES],
  declarations: [...PIPES],
})
export class NgPipesModule {}

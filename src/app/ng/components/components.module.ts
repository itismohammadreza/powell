import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LeafletModule} from '@asymmetrik/ngx-leaflet';
import {NgPipesModule} from '@ng/pipes/pipes.module';

import {COMPONENTS} from '.';
import {NgDirectivesModule} from '../directives/directives.module';
import {PrimengModule} from '../primeng/primeng.module';

@NgModule({
  declarations: [...COMPONENTS],
  exports: [...COMPONENTS, PrimengModule, NgDirectivesModule, NgPipesModule],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PrimengModule,
    LeafletModule,
    NgDirectivesModule,
    NgPipesModule,
  ],
})
export class NgComponentsModule {
}

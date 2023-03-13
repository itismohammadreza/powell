import {NgModule} from '@angular/core';
import {FileNamePipe} from "@ng/pipes/file-name";

@NgModule({
  declarations: [FileNamePipe],
  exports: [FileNamePipe]
})
export class FileNameModule {
}

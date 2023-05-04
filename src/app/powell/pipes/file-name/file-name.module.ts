import {NgModule} from '@angular/core';
import {FileNamePipe} from "@powell/pipes/file-name";

@NgModule({
  declarations: [FileNamePipe],
  exports: [FileNamePipe]
})
export class FileNameModule {
}

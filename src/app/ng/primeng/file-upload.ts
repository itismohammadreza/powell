import {NgModule} from '@angular/core';
import {FileUpload, FileUploadModule} from "primeng/fileupload";

@NgModule({
  exports: [FileUploadModule]
})
export class PrimeFileUploadModule {
}

export const PrimeFileUpload = FileUpload;
export type PrimeFileUpload = FileUpload;

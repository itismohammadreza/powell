import {NgModule} from '@angular/core';
import {ConfirmationService, MessageService} from "primeng/api";
import {DialogService} from "primeng/dynamicdialog";
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmPopupModule} from 'primeng/confirmpopup';
import {DialogModule} from 'primeng/dialog';
import {DynamicDialogModule} from 'primeng/dynamicdialog';
import {ToastModule} from 'primeng/toast';
import {Dialog2Component, DialogComponent, DialogFormComponent} from '.';
import {OverlayService} from "@ng/services";

@NgModule({
  declarations: [DialogComponent, DialogFormComponent, Dialog2Component],
  imports: [
    ConfirmDialogModule,
    ConfirmPopupModule,
    DialogModule,
    DynamicDialogModule,
    ToastModule
  ],
  exports: [
    DialogComponent,
    DialogFormComponent,
    Dialog2Component
  ],
  providers: [
    OverlayService,
    MessageService,
    DialogService,
    ConfirmationService
  ]
})
export class OverlayModule {
}

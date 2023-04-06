import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {ReactiveFormsModule} from "@angular/forms";
import {ConfirmationService, MessageService} from "primeng/api";
import {DialogService} from "primeng/dynamicdialog";
import {Dialog2Component, DialogComponent, DialogFormComponent} from '.';
import {AutoCompleteModule} from "@ng/components/auto-complete";

import {
  PrimeConfirmDialogModule,
  PrimeConfirmPopupModule,
  PrimeDialogModule,
  PrimeDynamicDialogModule,
  PrimeToastModule
} from "@ng/primeng";
import {SafeModule} from "@ng/pipes/safe";
import {ButtonModule} from "@ng/components/button";

@NgModule({
  declarations: [
    DialogComponent,
    DialogFormComponent,
    Dialog2Component
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,

    PrimeConfirmDialogModule,
    PrimeConfirmPopupModule,
    PrimeDialogModule,
    PrimeDynamicDialogModule,
    PrimeToastModule,

    SafeModule,
    AutoCompleteModule,
    ButtonModule
  ],
  exports: [
    DialogComponent,
    DialogFormComponent,
    Dialog2Component
  ],
  providers: [
    // OverlayService,
    MessageService,
    DialogService,
    ConfirmationService
  ]
})
export class OverlayModule {
}

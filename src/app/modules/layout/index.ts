import {Type} from '@angular/core';
import {LoadingComponent} from "@modules/layout/loading/loading.component";
import {NotFoundPage} from "@modules/layout/not-found/not-found.page";
import {LogoComponent} from "@modules/layout/logo/logo.component";
import {StatusModule} from "@powell/components/status";
import {RouterModule} from "@angular/router";

export const DECLARATIONS: Type<any>[] = [
  LoadingComponent,
  NotFoundPage,
  LogoComponent
];

export const IMPORTS = [
  StatusModule,
  RouterModule,
]

export const EXPORTS = [
  ...DECLARATIONS
]


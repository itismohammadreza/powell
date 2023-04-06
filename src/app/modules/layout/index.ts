import {Type} from '@angular/core';
import {LoadingComponent} from "@modules/layout/loading/loading.component";
import {NotFoundPage} from "@modules/layout/not-found/not-found.page";
import {LogoComponent} from "@modules/layout/logo/logo.component";

export const COMPONENTS: Type<any>[] = [
  LoadingComponent,
  NotFoundPage,
  LogoComponent
];

import {NgModule} from '@angular/core';
import {Badge, BadgeModule} from "primeng/badge";

@NgModule({
  exports: [BadgeModule]
})
export class PrimeBadgeModule {
}

export const PrimeBadge = Badge;
export type PrimeBadge = Badge;

import {NgModule} from '@angular/core';
import {Avatar, AvatarModule} from "primeng/avatar";
import {AvatarGroup, AvatarGroupModule} from "primeng/avatargroup";

@NgModule({
  exports: [AvatarModule, AvatarGroupModule]
})
export class PrimeAvatarModule {
}

export const PrimeAvatar = Avatar;
export const PrimeAvatarGroup = AvatarGroup;
export type PrimeAvatar = Avatar;
export type PrimeAvatarGroup = AvatarGroup;

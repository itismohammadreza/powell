import {NgModule} from '@angular/core';
import {Skeleton, SkeletonModule} from "primeng/skeleton";

@NgModule({
  exports: [SkeletonModule]
})
export class PrimeSkeletonModule {
}

export const PrimeSkeleton = Skeleton;
export type PrimeSkeleton = Skeleton;

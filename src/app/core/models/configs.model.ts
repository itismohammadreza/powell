import {AnimationTransitionMetadata, AnimationTriggerMetadata} from "@angular/animations";

type RequestMethods = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
export type SidebarType = 'overlay' | 'push' | 'overlay-mask' | 'push-mask' | 'static' | 'hover' | 'horizontal';

export interface AnimationDefinition {
  [key: string]: AnimationTransitionMetadata[]
}

export interface AppGlobalConfig {
  readonly lang?: string;
  readonly routeAnimation: AnimationTriggerMetadata | null;
}

export interface RequestConfig {
  pathTemplate?: string | RegExp,
  method: RequestMethods;
  loading?: boolean,
  success?: boolean,
  failure?: boolean,
  catch?: boolean,
}

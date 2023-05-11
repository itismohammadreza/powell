import {AnimationTransitionMetadata, AnimationTriggerMetadata} from "@angular/animations";

export type RequestMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
export type SidebarType = 'overlay' | 'push' | 'overlay-mask' | 'push-mask' | 'static' | 'hover' | 'horizontal';

export interface AnimationDefinition {
  [key: string]: AnimationTransitionMetadata[]
}

export interface AppConfig {
  readonly lang: string;
  readonly rtl: boolean;
  readonly routeAnimation: AnimationTriggerMetadata | null;
}

export interface RequestConfig {
  pathTemplate?: string | RegExp,
  method: RequestMethod;
  loading?: boolean,
  success?: boolean,
  failure?: boolean,
  catch?: boolean,
}

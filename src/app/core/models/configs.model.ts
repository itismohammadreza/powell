import {AnimationTransitionMetadata, AnimationTriggerMetadata} from "@angular/animations";

export type SidebarType = 'overlay' | 'push' | 'overlay-mask' | 'push-mask' | 'static' | 'hover' | 'horizontal';

export interface AnimationDefinition {
  [key: string]: AnimationTransitionMetadata[]
}

export interface AppGlobalConfig {
  readonly defaultTheme: string;
  readonly defaultLang: string;
  readonly defaultSidebarType: SidebarType;
  readonly defaultSidebarLock: boolean;
  readonly defaultSidebarVisible: boolean;
  readonly routeAnimation: AnimationTriggerMetadata | null
}

export interface RequestConfig {
  pathTemplate: string | RegExp,
  loading: boolean,
  success: boolean,
  failure: boolean,
  catch: boolean,
  method: string
}

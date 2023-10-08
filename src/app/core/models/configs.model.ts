import {AnimationTransitionMetadata, AnimationTriggerMetadata} from "@angular/animations";
import {HttpRequest, HttpResponseBase} from "@angular/common/http";

export type RequestMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
export type SidebarType = 'overlay' | 'push' | 'overlay-mask' | 'push-mask' | 'static' | 'hover' | 'horizontal';

export interface AnimationDefinition {
  [key: string]: AnimationTransitionMetadata[]
}

export interface AppConfig {
  readonly lang: string;
  readonly rtl: boolean;
  readonly requestTimeout: number;
  readonly routeAnimation: AnimationTriggerMetadata | null;
}

export interface RequestConfig {
  pathTemplate?: string | RegExp,
  method: RequestMethod;
  // null: default message, false: don't show message, string: custom message
  successMessage?: string | null | false | ((request: HttpRequest<any>, response?: HttpResponseBase) => string | null | false);
  failureMessage?: string | null | false | ((request: HttpRequest<any>, response?: HttpResponseBase) => string | null | false);
  catch?: boolean | ((request: HttpRequest<any>) => boolean);
  loading?: boolean | ((request: HttpRequest<any>) => boolean);
  isCustomApi?: boolean;
  loadingOnlyOnce?: boolean;
  timeout?: number | 'none' | ((request: HttpRequest<any>) => number | 'none');
}

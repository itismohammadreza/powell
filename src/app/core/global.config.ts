import {AppGlobalConfig} from "@core/models";
import {RouteAnimation} from "@core/animations";

export const GlobalConfig: AppGlobalConfig = {
  defaultLang: 'fa',
  defaultSidebarType: 'push-mask',
  defaultSidebarLock: true, // overrides the defaultSidebarVisible.
  defaultSidebarVisible: false,
  routeAnimation: RouteAnimation('slide')
  // defaultTheme: 'lara-light-indigo',
  // rtl: true,
  // defaultLabelPos: 'float',
  // defaultFixLabelPos: 'fix-top',
};

import {SidebarType} from "@core/models";

interface IAppGlobalConfig {
  readonly enableCachingApis: boolean;
  readonly defaultTheme: string;
  readonly defaultLang: string;
  readonly defaultSidebarType: SidebarType
  readonly defaultSidebarLock: boolean
  readonly defaultSidebarVisible: boolean
}

export const GlobalConfig: IAppGlobalConfig = {
  enableCachingApis: true,
  defaultTheme: 'lara-light-indigo',
  defaultLang: 'fa',
  defaultSidebarType: 'push-mask',
  defaultSidebarLock: true, // overrides the defaultSidebarVisible.
  defaultSidebarVisible: false,
};

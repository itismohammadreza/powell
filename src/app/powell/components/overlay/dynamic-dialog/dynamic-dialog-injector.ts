import {InjectionToken, InjectOptions, Injector, Type} from '@angular/core';

export class DynamicDialogInjector implements Injector {
  get<T>(token: Type<T> | InjectionToken<T>, notFoundValue?: T, flags?: InjectOptions): T;
  get(token: any, notFoundValue?: any);
  get(token: any, notFoundValue?: any, flags?: any) {
    const value = this._additionalTokens.get(token);

    if (value) {
      return value;
    }

    return this._parentInjector.get<any>(token, notFoundValue);
  }

  constructor(private _parentInjector: Injector, private _additionalTokens: WeakMap<any, any>) {
  }
}

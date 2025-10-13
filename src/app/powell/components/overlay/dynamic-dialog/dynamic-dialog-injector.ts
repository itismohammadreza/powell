import {InjectionToken, InjectOptions, Injector, Type} from '@angular/core';

export class DynamicDialogInjector implements Injector {
  get<T>(token: Type<T> | InjectionToken<T>, notFoundValue?: T, flags?: InjectOptions): T;
  get(token: SafeAny, notFoundValue?: SafeAny): SafeAny;
  get(token: SafeAny, notFoundValue?: SafeAny, flags?: SafeAny) {
    const value = this._additionalTokens.get(token);

    if (value) {
      return value;
    }

    return this._parentInjector.get<SafeAny>(token, notFoundValue);
  }

  constructor(private _parentInjector: Injector, private _additionalTokens: WeakMap<SafeAny, SafeAny>) {
  }
}

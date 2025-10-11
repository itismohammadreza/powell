declare type SafeAny = any;
declare type Optional<T> = T | undefined;
declare type Nullable<T = SafeAny> = T | null;
declare type Maybe<T> = T | null | undefined;
declare type Fn<Args extends SafeAny[] = SafeAny[], Return = SafeAny> = (...args: Args) => Return;
declare type ChangeFn<T> = Fn<[T], void>;
declare type TouchedFn = Fn<[], void>;

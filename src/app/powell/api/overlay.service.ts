import {
  ApplicationRef,
  ComponentFactoryResolver,
  ComponentRef,
  createComponent,
  DOCUMENT,
  EnvironmentInjector,
  inject,
  Injectable,
  Injector,
  Type
} from '@angular/core';
import {Router} from "@angular/router";
import {LocationStrategy} from '@angular/common';
import {Observable, Subject} from "rxjs";
import {ConfigService} from "@powell/api";
import {
  DialogComponent,
  DialogFormComponent,
  DynamicDialogComponent,
  DynamicDialogConfig,
  DynamicDialogInjector,
  DynamicDialogRef
} from "@powell/components/overlay";
import {
  $ButtonProps,
  $Confirmation,
  $ConfirmationService,
  $ConfirmDialog,
  $ConfirmEventType,
  $ConfirmPopup,
  $MessageService,
  $Toast,
  $ToastMessageOptions,
  $uuid
} from "@powell/primeng";
import {
  ButtonProps,
  ConfirmOptions,
  DialogFormConfig,
  DialogFormOptions,
  DialogFormResult,
  DialogOptions,
  HistoryState,
  ToastOptions
} from '@powell/models';

@Injectable()
export class OverlayService {
  private document = inject(DOCUMENT);
  private confirmationService = inject($ConfirmationService);
  private messageService = inject($MessageService);
  private injector = inject(Injector);
  private appRef = inject(ApplicationRef);
  private router = inject(Router);
  private location = inject(LocationStrategy);
  private envInjector = inject(EnvironmentInjector);
  private cfr = inject(ComponentFactoryResolver);

  private toastCmpRef?: ComponentRef<$Toast>;
  private confirmPopupCmpRef?: ComponentRef<$ConfirmPopup>;
  private confirmCmpRef?: ComponentRef<$ConfirmDialog>;
  private dialogCmpRef?: ComponentRef<DialogComponent>;
  private dialogFormCmpRef?: ComponentRef<DialogFormComponent>;
  private dynamicDialogCmpRef?: ComponentRef<DynamicDialogComponent>;
  private states: HistoryState[] = [];
  private stateChangeSubject = new Subject<HistoryState>();

  constructor() {
    this.location.onPopState((e) => {
      const currentState = this.states.pop();
      if (!currentState) {
        return
      }
      switch (currentState.component) {
        case 'dialog':
          this.dialogCmpRef!.instance.close();
          break;
        case 'dialogForm':
          this.dialogFormCmpRef!.instance.close();
          break;
        case 'confirmDialog':
        case 'confirmPopup':
          this.confirmationService.close();
          break;
      }
      this.stateChangeSubject.next(currentState);
    })
  }

  open(componentType: Type<SafeAny>, config: DynamicDialogConfig) {
    const map = new WeakMap();
    map.set(DynamicDialogConfig, config);

    const dialogRef = new DynamicDialogRef();
    map.set(DynamicDialogRef, dialogRef);

    const afterClosedSub = dialogRef.afterClosed.subscribe(() => {
      this.removeFromBody(this.dynamicDialogCmpRef!);
      afterClosedSub.unsubscribe();
    });

    // یه وقتایی پیش میاد که میخایم یه چیزی رو پرواید کنیم ولی به این صورت که هر بار یه ولیوی جدید به ما بده . خب پس نمیتونیم توی اپ ماژول یا روت پروایدش کنیم . از طرفی
    // میخایم این چیزی که پرواید کردیم رو توی یه کامپوننت داینامیک استفادش کنیم . ینی کانستراکتور اون کاپوننت داینامیک ، میخاد از این کلاسه استفاده کنه و ما میخایم هر بار که کامپوننت رو انداختیم ، یه ولیوی جدید داشته باشه . اونم چه
    // ولیویی؟ احسنت، ولیویی که خود کاربر داده رو میخایم ست کنیم توی پروایدمون و پاسش بدیم به کامپوننت.
    // خلاصه کلام اینکه وقتی کامپوننت رو داریم بصورت داینامیک میسازیمش ، پروایدرش رو هم بسازیم و بهش پاس بدیم.
    // یه روش اینه که یه کلاس بسازیم و اینترفیس اینجکتور انگولار رو توش پیاده سازی کنیم . یه روش راحت ترشم اینه که همینجا اینجکتورو بسازیم . مثل کاری که
    // من توی این کامنته کردم . و توی متد کریت باید پاسش بدیم. تامام
    // const inj = Injector.create({
    //   providers: [
    //     {
    //       provide: DynamicDialogConfig,
    //       useValue: map.get(DynamicDialogConfig)
    //     },
    //     {
    //       provide: DynamicDialogRef,
    //       useValue: map.get(DynamicDialogRef)
    //     }
    //   ]
    // });
    this.dynamicDialogCmpRef = this.addToBody(DynamicDialogComponent, new DynamicDialogInjector(this.injector, map))
    const onCloseSub = this.dynamicDialogCmpRef.instance.onClose.subscribe(() => {
      this.removeFromBody(this.dynamicDialogCmpRef!);
      onCloseSub.unsubscribe();
    });
    this.dynamicDialogCmpRef.instance.open(componentType);
    return dialogRef;
  }

  showToast(options: ToastOptions) {
    if (!this.bodyContains(this.toastCmpRef)) {
      this.toastCmpRef = this.addToBody($Toast);
    }
    const {instance} = this.toastCmpRef!;
    const toast: $ToastMessageOptions = {
      severity: 'info',
      ...options,
    }
    for (const k in options) {
      const key = k as keyof ComponentRef<$Toast> & keyof ToastOptions;
      instance[key] = options[key];
    }
    instance.styleClass = `toast-wrapper ${!options.summary ? 'no-summary' : ''} ${!options.detail ? 'no-detail' : ''} ${options.styleClass ?? ''} ${(options.rtl ?? this.config.rtl) ? 'is-rtl' : 'is-ltr'}`;
    instance.breakpoints = {'767px': {width: '100%', right: '0', left: '0'}, ...options.breakpoints};
    instance.position = options.position ?? 'top-right';
    instance.showTransformOptions = options.showTransformOptions ?? 'translateY(100%)';
    instance.showTransitionOptions = options.showTransitionOptions ?? '300ms ease-out';
    instance.hideTransformOptions = options.hideTransformOptions ?? 'translateY(-100%)';
    instance.hideTransitionOptions = options.hideTransitionOptions ?? '250ms ease-in';

    const timeout = setTimeout(() => {
      this.messageService.add(toast);
      clearTimeout(timeout);
    }, 0);
    return new Promise((resolve) => {
      const subscription = instance.onClose.subscribe(() => {
        subscription.unsubscribe();
        const timeout = setTimeout(() => {
          resolve(true);
          clearTimeout(timeout);
        }, 5)
      });
    });
  }

  showConfirmPopup(options: ConfirmOptions) {
    if (!this.bodyContains(this.confirmPopupCmpRef)) {
      this.confirmPopupCmpRef = this.addToBody($ConfirmPopup);
    }
    const {instance} = this.confirmPopupCmpRef!;
    const confirmation: $Confirmation = {
      ...options,
      acceptButtonProps: this.mapToButtonProps(options.acceptButtonProps),
      rejectButtonProps: this.mapToButtonProps(options.rejectButtonProps),
      closeButtonProps: this.mapToButtonProps(options.closeButtonProps),
    }
    for (const k in options) {
      const key = k as keyof ComponentRef<$Confirmation> & keyof ConfirmOptions;
      instance[key] = options[key];
    }
    instance.styleClass = `confirm-popup-wrapper ${options.styleClass ?? ''} ${(options.rtl ?? this.config.rtl) ? 'is-rtl' : 'is-ltr'}`;
    return new Promise<boolean>((resolve) => {
      const state: HistoryState = {component: 'confirmPopup'};
      this.pushState(state)
      this.confirmationService.confirm({
        ...confirmation,
        accept: () => {
          this.popState();
          this.removeFromBody(this.confirmPopupCmpRef!);
          const timeout = setTimeout(() => {
            resolve(true);
            clearTimeout(timeout);
          }, 5)
        },
        reject: () => {
          this.popState();
          this.removeFromBody(this.confirmPopupCmpRef!);
          const timeout = setTimeout(() => {
            resolve(false);
            clearTimeout(timeout);
          }, 5)
        },
      });
    });
  }

  showConfirmDialog(options: ConfirmOptions) {
    if (!this.bodyContains(this.confirmCmpRef)) {
      this.confirmCmpRef = this.addToBody($ConfirmDialog);
    }
    const {instance} = this.confirmCmpRef!;
    const confirmation: $Confirmation = {
      ...options,
      acceptButtonProps: this.mapToButtonProps(options.acceptButtonProps),
      rejectButtonProps: this.mapToButtonProps(options.rejectButtonProps),
      closeButtonProps: this.mapToButtonProps(options.closeButtonProps),
    }
    for (const k in options) {
      const key = k as keyof ComponentRef<$Confirmation> & keyof ConfirmOptions;
      instance[key] = options[key];
    }
    instance.breakpoints = options.breakpoints;
    instance.draggable = options.draggable;
    instance.position = options.position ?? 'center';
    instance.appendTo = undefined;
    instance.styleClass = `confirm-dialog-wrapper ${options.styleClass ?? ''} ${!options.header && !options.closable ? 'header-less' : ''} ${(options.rtl ?? this.config.rtl) ? 'is-rtl' : 'is-ltr'}`;
    return new Promise<Nullable<boolean>>((resolve) => {
      const state: HistoryState = {component: 'confirmDialog'};
      let timeout: SafeAny;
      this.pushState(state)
      this.confirmationService.confirm({
        ...confirmation,
        accept: () => {
          this.popState();
          this.removeFromBody(this.confirmCmpRef!);
          timeout = setTimeout(() => {
            resolve(true);
            clearTimeout(timeout);
          }, 5)
        },
        reject: (type: $ConfirmEventType) => {
          this.popState();
          switch (type) {
            case $ConfirmEventType.REJECT:
              this.removeFromBody(this.confirmCmpRef!);
              timeout = setTimeout(() => {
                resolve(false);
                clearTimeout(timeout);
              }, 5)
              break;
            case $ConfirmEventType.CANCEL:
              this.removeFromBody(this.confirmCmpRef!);
              timeout = setTimeout(() => {
                resolve(null);
                clearTimeout(timeout);
              }, 5)
              break;
          }
        }
      });
    })
  }

  showDialog(options: DialogOptions) {
    if (!this.bodyContains(this.dialogCmpRef)) {
      this.dialogCmpRef = this.addToBody(DialogComponent);
    }
    const {instance} = this.dialogCmpRef!;
    instance.options = {
      ...options,
      styleClass: `dialog-wrapper ${options.styleClass ?? ''} ${!options.showHeader || (!options.header && !options.closable && !options.maximizable) ? 'header-less' : ''} ${(options.rtl ?? this.config.rtl) ? 'is-rtl' : 'is-ltr'}`,
      closeButtonProps: this.mapToButtonProps(options.closeButtonProps),
      maximizeButtonProps: this.mapToButtonProps(options.maximizeButtonProps),
    }
    instance.show();
    const state: HistoryState = {component: 'dialog'};
    this.pushState(state);
    return new Promise<void>((resolve) => {
      const subscription = instance.onClose.subscribe(() => {
        if (!this.isPopped(state)) {
          this.popState()
        }
        subscription.unsubscribe();
        this.removeFromBody(this.dialogCmpRef!);
        const timeout = setTimeout(() => {
          resolve();
          clearTimeout(timeout);
        }, 5)
      });
    });
  }

  showDialogForm(config: DialogFormConfig[], options: DialogFormOptions = {}) {
    if (!this.bodyContains(this.dialogFormCmpRef)) {
      this.dialogFormCmpRef = this.addToBody(DialogFormComponent);
    }
    const {instance} = this.dialogFormCmpRef!;
    const hostEl = this.dialogFormCmpRef.location.nativeElement;
    hostEl.classList = `dialog-form-wrapper ${(options.rtl ?? this.config.rtl) ? 'is-rtl' : 'is-ltr'}`;
    instance.config = config;
    instance.options = {
      ...options,
      rtl: options.rtl ?? this.config.rtl,
      styleClass: `${options.styleClass ?? ''} ${!options.showHeader || (!options.header && !options.closable && !options.maximizable) ? 'header-less' : ''}`,
      closeButtonProps: this.mapToButtonProps(options.closeButtonProps),
      maximizeButtonProps: this.mapToButtonProps(options.maximizeButtonProps),
      acceptButtonProps: this.mapToButtonProps({
        appearance: 'basic',
        severity: 'success',
        rounded: false,
        ...options.acceptButtonProps
      }),
      rejectButtonProps: this.mapToButtonProps({
        appearance: 'outlined',
        severity: 'danger',
        rounded: false,
        ...options.rejectButtonProps
      })
    };
    instance.show();
    try {
      this.dialogFormCmpRef!.changeDetectorRef.detectChanges();
    } catch {
    }
    const state: HistoryState = {component: 'dialogForm'}
    this.pushState(state);
    return new Observable<Nullable<DialogFormResult>>((resolve) => {
      const submitSubscription = instance.onSubmit.subscribe(res => {
        resolve.next(res);
      });
      const closeSubscription = instance.onClose.subscribe(() => {
        if (!this.isPopped(state)) {
          this.popState()
        }
        submitSubscription.unsubscribe();
        closeSubscription.unsubscribe();
        this.removeFromBody(this.dialogFormCmpRef!);
        resolve.next(null);
      })
    })
  }

  closeAnyOpenDialog() {
    return new Promise((accept) => {
      this.toastCmpRef?.destroy();
      this.confirmPopupCmpRef?.destroy();
      this.dialogCmpRef?.destroy();
      this.dialogFormCmpRef?.destroy();
      this.confirmCmpRef?.destroy();
      this.states.length = 0
      accept(true)
    })
  }

  private get config() {
    return this.injector.get(ConfigService).get();
  }

  private addToBody<T>(component: Type<T>, injector: Injector = this.injector) {
    try {
      const componentRef = createComponent(component as SafeAny, {
        environmentInjector: this.envInjector,
        elementInjector: injector
      });
      this.appRef.attachView(componentRef.hostView);
      this.document.body.appendChild(componentRef.location.nativeElement);
      componentRef.changeDetectorRef.detectChanges();
      return componentRef;
    } catch (err) {
      try {
        const factory = this.cfr.resolveComponentFactory(component as SafeAny);
        const compRef = factory.create(injector);
        const rootNode = (compRef.hostView as SafeAny).rootNodes?.[0] || (compRef as SafeAny).location?.nativeElement;
        if (rootNode) this.document.body.appendChild(rootNode);
        this.appRef.attachView(compRef.hostView);
        compRef.changeDetectorRef.detectChanges();
        return compRef as ComponentRef<SafeAny>;
      } catch (e) {
        throw e;
      }
    }
  }

  private removeFromBody(component: ComponentRef<SafeAny>) {
    if (!component) {
      return;
    }
    const timeout = setTimeout(() => {
      this.appRef.detachView(component.hostView);
      component.destroy();
      clearTimeout(timeout);
    }, 300)
  }

  private bodyContains(componentRef: Optional<ComponentRef<SafeAny>>) {
    if (!componentRef) {
      return false;
    }
    return this.document.body.contains(componentRef.location.nativeElement);
  }

  private mapToButtonProps(props: ButtonProps = {}) {
    return {
      ...props,
      severity: props.severity ?? 'secondary',
      rounded: props.rounded ?? true,
      link: props.appearance === 'link',
      outlined: props.appearance === 'outlined',
      text: props.appearance ? props.appearance === 'text' : true,
    } as $ButtonProps;
  }

  pushState(state: HistoryState) {
    if (!state.key) {
      state.key = $uuid();
    }
    this.location.pushState(state, '', this.router.url, '');
    this.states.push(state);
  }

  popState() {
    this.location.back();
  }

  stateChange() {
    return this.stateChangeSubject.asObservable()
  }

  isPopped(state: HistoryState) {
    return this.states.findIndex(s => s.key === state.key && s.component === state.component) === -1;
  }
}

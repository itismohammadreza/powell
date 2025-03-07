import {ApplicationRef, ComponentRef, createComponent, inject, Injectable, Injector, Type} from '@angular/core';
import {Router} from "@angular/router";
import {DOCUMENT, LocationStrategy} from '@angular/common';
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
  NgButtonProps,
  NgConfirmOptions,
  NgDialogFormConfig,
  NgDialogFormOptions,
  NgDialogFormResult,
  NgDialogOptions,
  NgHistoryState,
  NgToastOptions
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
  private configService = inject(ConfigService);

  private toastCmpRef: ComponentRef<$Toast>;
  private confirmPopupCmpRef: ComponentRef<$ConfirmPopup>;
  private confirmCmpRef: ComponentRef<$ConfirmDialog>;
  private dialogCmpRef: ComponentRef<DialogComponent>;
  private dialogFormCmpRef: ComponentRef<DialogFormComponent>;
  private dynamicDialogCmpRef: ComponentRef<DynamicDialogComponent>;
  private states: NgHistoryState[] = [];
  private stateChangeSubject = new Subject<NgHistoryState>();

  constructor() {
    this.location.onPopState((e) => {
      const currentState = this.states.pop();
      if (!currentState) {
        return
      }
      switch (currentState.component) {
        case 'dialog':
          this.dialogCmpRef.instance.close();
          break;
        case 'dialogForm':
          this.dialogFormCmpRef.instance.close();
          break;
        case 'confirmDialog':
        case 'confirmPopup':
          this.confirmationService.close();
          break;
      }
      this.stateChangeSubject.next(currentState);
    })
  }

  open(componentType: Type<any>, config: DynamicDialogConfig) {
    const map = new WeakMap();
    map.set(DynamicDialogConfig, config);

    const dialogRef = new DynamicDialogRef();
    map.set(DynamicDialogRef, dialogRef);

    const afterClosedSub = dialogRef.afterClosed.subscribe(() => {
      this.removeFromBody(this.dynamicDialogCmpRef);
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
      this.removeFromBody(this.dynamicDialogCmpRef);
      onCloseSub.unsubscribe();
    });
    this.dynamicDialogCmpRef.instance.open(componentType);
    return dialogRef;
  }

  showToast(options: NgToastOptions) {
    if (!this.bodyContains(this.toastCmpRef)) {
      this.toastCmpRef = this.addToBody($Toast);
    }
    const {instance} = this.toastCmpRef;
    this.toastCmpRef.location.nativeElement.setAttribute('dir', (options.rtl ?? this.config.rtl) ? 'rtl' : 'ltr');
    const toast: $ToastMessageOptions = {
      severity: 'info',
      ...options,
    }
    for (const key in options) {
      instance[key] = options[key];
    }
    instance.styleClass = `toast-wrapper ${options.styleClass ?? ''}`;
    instance.breakpoints = {'767px': {width: '100%', right: '0', left: '0'}, ...options.breakpoints};
    instance.position = options.position;
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

  showConfirmPopup(options: NgConfirmOptions) {
    if (!this.bodyContains(this.confirmPopupCmpRef)) {
      this.confirmPopupCmpRef = this.addToBody($ConfirmPopup);
    }
    const {instance} = this.confirmPopupCmpRef;
    const confirmation: $Confirmation = {
      ...options,
      acceptButtonProps: this.mapToButtonProps(options.acceptButtonProps),
      rejectButtonProps: this.mapToButtonProps(options.rejectButtonProps),
      closeButtonProps: this.mapToButtonProps(options.closeButtonProps),
    }
    for (const key in options) {
      instance[key] = options[key];
    }
    instance.styleClass = `confirm-popup-wrapper ${options.styleClass ?? ''}`;
    this.confirmPopupCmpRef.location.nativeElement.setAttribute('dir', (options.rtl ?? this.config.rtl) ? 'rtl' : 'ltr')
    return new Promise<boolean>((resolve) => {
      const state: NgHistoryState = {component: 'confirmPopup'};
      this.pushState(state)
      this.confirmationService.confirm({
        ...confirmation,
        accept: () => {
          this.popState();
          this.removeFromBody(this.confirmPopupCmpRef);
          const timeout = setTimeout(() => {
            resolve(true);
            clearTimeout(timeout);
          }, 5)
        },
        reject: () => {
          this.popState();
          this.removeFromBody(this.confirmPopupCmpRef);
          const timeout = setTimeout(() => {
            resolve(false);
            clearTimeout(timeout);
          }, 5)
        },
      });
    });
  }

  showConfirmDialog(options: NgConfirmOptions) {
    if (!this.bodyContains(this.confirmCmpRef)) {
      this.confirmCmpRef = this.addToBody($ConfirmDialog);
    }
    const {instance} = this.confirmCmpRef;
    const confirmation: $Confirmation = {
      ...options,
      acceptButtonProps: this.mapToButtonProps(options.acceptButtonProps),
      rejectButtonProps: this.mapToButtonProps(options.rejectButtonProps),
      closeButtonProps: this.mapToButtonProps(options.closeButtonProps),
    }
    for (const key in options) {
      instance[key] = options[key];
    }
    instance.position = options.position;
    instance.appendTo = null;
    instance.el.nativeElement.setAttribute('dir', (options.rtl ?? this.config.rtl) ? 'rtl' : 'ltr');
    instance.styleClass = `confirm-dialog-wrapper ${options.styleClass ?? ''} ${!options.header && !options.closable ? 'header-less' : ''}`;
    return new Promise<boolean>((resolve) => {
      const state: NgHistoryState = {component: 'confirmDialog'};
      let timeout: any;
      this.pushState(state)
      this.confirmationService.confirm({
        ...confirmation,
        accept: () => {
          this.popState();
          this.removeFromBody(this.confirmCmpRef);
          timeout = setTimeout(() => {
            resolve(true);
            clearTimeout(timeout);
          }, 5)
        },
        reject: (type: $ConfirmEventType) => {
          this.popState();
          switch (type) {
            case $ConfirmEventType.REJECT:
              this.removeFromBody(this.confirmCmpRef);
              timeout = setTimeout(() => {
                resolve(false);
                clearTimeout(timeout);
              }, 5)
              break;
            case $ConfirmEventType.CANCEL:
              this.removeFromBody(this.confirmCmpRef);
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

  showDialog(options: NgDialogOptions) {
    if (!this.bodyContains(this.dialogCmpRef)) {
      this.dialogCmpRef = this.addToBody(DialogComponent);
    }
    const {instance} = this.dialogCmpRef;
    instance.options = {
      ...options,
      styleClass: `dialog-wrapper ${options.styleClass ?? ''} ${!options.showHeader || (!options.header && !options.closable && !options.maximizable) ? 'header-less' : ''}`,
      closeButtonProps: this.mapToButtonProps(options.closeButtonProps),
      maximizeButtonProps: this.mapToButtonProps(options.maximizeButtonProps),
    }
    this.dialogCmpRef.location.nativeElement.setAttribute('dir', (options.rtl ?? this.config.rtl) ? 'rtl' : 'ltr');
    instance.show();
    const state: NgHistoryState = {component: 'dialog'};
    this.pushState(state);
    return new Promise<void>((resolve) => {
      const subscription = instance.onClose.subscribe(() => {
        if (!this.isPopped(state)) {
          this.popState()
        }
        subscription.unsubscribe();
        this.removeFromBody(this.dialogCmpRef);
        const timeout = setTimeout(() => {
          resolve();
          clearTimeout(timeout);
        }, 5)
      });
    });
  }

  showDialogForm(config: NgDialogFormConfig[], options: NgDialogFormOptions = {}) {
    if (!this.bodyContains(this.dialogFormCmpRef)) {
      this.dialogFormCmpRef = this.addToBody(DialogFormComponent);
    }
    const {instance} = this.dialogFormCmpRef;
    instance.config = config;
    instance.options = {
      ...options,
      styleClass: `dialog-form-wrapper ${options.styleClass ?? ''} ${!options.showHeader || (!options.header && !options.closable && !options.maximizable) ? 'header-less' : ''}`,
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
    this.dialogFormCmpRef.location.nativeElement.setAttribute('dir', (options.rtl ?? this.config.rtl) ? 'rtl' : 'ltr');
    instance.show();
    const state: NgHistoryState = {component: 'dialogForm'}
    this.pushState(state);
    return new Observable<NgDialogFormResult>((resolve) => {
      const submitSubscription = instance.onSubmit.subscribe(res => {
        resolve.next(res);
      });
      const closeSubscription = instance.onClose.subscribe(() => {
        if (!this.isPopped(state)) {
          this.popState()
        }
        submitSubscription.unsubscribe();
        closeSubscription.unsubscribe();
        this.removeFromBody(this.dialogFormCmpRef);
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
    return this.configService.get();
  }

  private addToBody<T>(component: Type<T>, injector: Injector = this.injector) {
    const componentRef = createComponent(component, {
      environmentInjector: this.appRef.injector,
      elementInjector: injector
    })
    this.document.body.appendChild(componentRef.location.nativeElement);
    this.appRef.attachView(componentRef.hostView);
    componentRef.changeDetectorRef.detectChanges();
    return componentRef;
  }

  private removeFromBody(component: ComponentRef<any>) {
    if (!component) {
      return;
    }
    const timeout = setTimeout(() => {
      this.appRef.detachView(component.hostView);
      component.destroy();
      clearTimeout(timeout);
    }, 300)
  }

  private bodyContains(componentRef: ComponentRef<any>) {
    return this.document.body.contains(componentRef?.location.nativeElement);
  }

  private mapToButtonProps(props: NgButtonProps = {}) {
    return {
      ...props,
      severity: props.severity ?? 'secondary',
      rounded: props.rounded ?? true,
      link: props.appearance === 'link',
      outlined: props.appearance === 'outlined',
      text: props.appearance ? props.appearance === 'text' : true,
    } as $ButtonProps;
  }

  pushState(state: NgHistoryState) {
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

  isPopped(state: NgHistoryState) {
    return this.states.findIndex(s => s.key === state.key && s.component === state.component) === -1;
  }
}

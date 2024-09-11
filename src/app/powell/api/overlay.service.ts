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
  PrimeConfirmation,
  PrimeConfirmationService,
  PrimeConfirmDialog,
  PrimeConfirmEventType,
  PrimeConfirmPopup,
  PrimeMessage,
  PrimeMessageService,
  PrimeToast,
  PrimeUniqueComponentId
} from "@powell/primeng";
import {
  NgConfirmDialogOptions,
  NgConfirmPopupOptions,
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
  private confirmationService = inject(PrimeConfirmationService);
  private messageService = inject(PrimeMessageService);
  private injector = inject(Injector);
  private appRef = inject(ApplicationRef);
  private router = inject(Router);
  private location = inject(LocationStrategy);
  private configService = inject(ConfigService);

  private toastCmpRef: ComponentRef<PrimeToast>;
  private confirmPopupCmpRef: ComponentRef<PrimeConfirmPopup>;
  private confirmCmpRef: ComponentRef<PrimeConfirmDialog>;
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
      this.toastCmpRef = this.addToBody(PrimeToast);
    }
    const {instance} = this.toastCmpRef;
    const toast: PrimeMessage = {
      severity: 'info',
      ...options,
      styleClass: `${options.styleClass} ${(options.rtl ?? this.configService.get().rtl) ? 'rtl' : 'ltr'}`,
    }
    for (const key in options) {
      instance[key] = options[key];
    }
    instance.breakpoints = {'767px': {width: '100%', right: '0', left: '0'}, ...options.breakpoints};
    setTimeout(() => {
      this.messageService.add(toast);
    }, 0);
    return new Promise((accept) => {
      const subscription = instance.onClose.subscribe(() => {
        subscription.unsubscribe();
        setTimeout(() => {
          accept(true);
        }, 5)
      });
    });
  }

  showConfirmPopup(options: NgConfirmPopupOptions) {
    if (!this.bodyContains(this.confirmPopupCmpRef)) {
      this.confirmPopupCmpRef = this.addToBody(PrimeConfirmPopup);
    }
    const {instance} = this.confirmPopupCmpRef;
    const confirmation: PrimeConfirmation = {
      ...options,
      acceptButtonStyleClass: `${options.acceptButtonStyleClass} ${options.buttonFull ? 'w-full' : ''} p-button-${options.acceptColor} p-button-${options.acceptAppearance} p-button-${options.buttonSize}`,
      rejectButtonStyleClass: `${options.rejectButtonStyleClass} ${options.buttonFull ? 'w-full' : ''} p-button-${options.rejectColor} p-button-${options.rejectAppearance || 'outlined'} p-button-${options.buttonSize}`,
    }
    for (const key in options) {
      instance[key] = options[key];
    }
    instance.styleClass = `${options.styleClass} ${(options.rtl ?? this.configService.get().rtl) ? 'rtl' : 'ltr'} p-confirm-popup-button-icon-${options.buttonIconPos || 'left'}`;
    return new Promise<boolean>((accept) => {
      const state: NgHistoryState = {component: 'confirmPopup'};
      this.pushState(state)
      this.confirmationService.confirm({
        ...confirmation,
        accept: () => {
          this.popState();
          setTimeout(() => {
            accept(true);
          }, 5)
        },
        reject: () => {
          this.popState();
          setTimeout(() => {
            accept(false);
          }, 5)
        },
      });
    });
  }

  showConfirmDialog(options: NgConfirmDialogOptions) {
    if (!this.bodyContains(this.confirmCmpRef)) {
      this.confirmCmpRef = this.addToBody(PrimeConfirmDialog);
    }
    const {instance} = this.confirmCmpRef;
    const confirmation: PrimeConfirmation = {
      ...options,
      acceptButtonStyleClass: `${options.acceptButtonStyleClass} ${options.buttonFull ? 'w-full' : ''} p-button-${options.acceptColor} p-button-${options.acceptAppearance} p-button-${options.buttonSize}`,
      rejectButtonStyleClass: `${options.rejectButtonStyleClass} ${options.buttonFull ? 'w-full' : ''} p-button-${options.rejectColor} p-button-${options.rejectAppearance || 'outlined'} p-button-${options.buttonSize}`,
    }
    for (const key in options) {
      instance[key] = options[key];
    }
    instance.styleClass = `${options.styleClass} ${(options.rtl ?? this.configService.get().rtl) ? 'rtl' : 'ltr'} p-confirm-button-icon-${options.buttonIconPos || 'left'} ${!options.header && !options.closable ? 'dialog-header-less' : ''}`;
    return new Promise<boolean>((accept) => {
      const state: NgHistoryState = {component: 'confirmDialog'};
      this.pushState(state)
      this.confirmationService.confirm({
        ...confirmation,
        accept: () => {
          this.popState();
          setTimeout(() => {
            accept(true);
          }, 5)
        },
        reject: (type: PrimeConfirmEventType) => {
          this.popState();
          switch (type) {
            case PrimeConfirmEventType.REJECT:
              setTimeout(() => {
                accept(false);
              }, 5)
              break;
            case PrimeConfirmEventType.CANCEL:
              setTimeout(() => {
                accept(null);
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
    for (const key in options) {
      instance.options[key] = options[key];
    }
    instance.options.styleClass = `${options.styleClass} ${(options.rtl ?? this.configService.get().rtl) ? 'rtl' : 'ltr'} ${!options.showHeader ? 'dialog-header-less' : ''}`;
    instance.show();
    const state: NgHistoryState = {component: 'dialog'};
    this.pushState(state);
    return new Promise<void>((accept) => {
      const subscription = instance.onClose.subscribe(() => {
        if (!this.isPopped(state)) {
          this.popState()
        }
        subscription.unsubscribe();
        setTimeout(() => {
          accept();
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
    for (const key in options) {
      instance.options[key] = options[key];
    }
    instance.options.acceptButtonStyleClass = `${options.acceptButtonStyleClass} p-dialog-form-accept`;
    instance.options.rejectButtonStyleClass = `${options.rejectButtonStyleClass} p-dialog-form-reject`;
    instance.options.styleClass = `${options.styleClass} p-dialog-form-wrapper ${(options.rtl ?? this.configService.get().rtl) ? 'rtl' : 'ltr'} ${!options.showHeader ? 'dialog-header-less' : ''}`;
    console.log(this.dialogFormCmpRef)
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
    this.appRef.detachView(component.hostView);
    component.destroy();
  }

  private bodyContains(componentRef: ComponentRef<any>) {
    return this.document.body.contains(componentRef?.location.nativeElement);
  }

  pushState(state: NgHistoryState) {
    if (!state.key) {
      state.key = PrimeUniqueComponentId();
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

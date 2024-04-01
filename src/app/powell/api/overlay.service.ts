import {ApplicationRef, ComponentRef, createComponent, Inject, Injectable, Injector, Type} from '@angular/core';
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
import {PrimeConfirmDialog, PrimeConfirmPopup, PrimeToast} from "@powell/primeng";
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
import {
  PrimeConfirmation,
  PrimeConfirmationService,
  PrimeConfirmEventType,
  PrimeMessage,
  PrimeMessageService, PrimeUniqueComponentId
} from "@powell/primeng/api";

@Injectable()
export class OverlayService {
  private toastCmpRef: ComponentRef<PrimeToast>;
  private confirmPopupCmpRef: ComponentRef<PrimeConfirmPopup>;
  private confirmCmpRef: ComponentRef<PrimeConfirmDialog>;
  private dialogCmpRef: ComponentRef<DialogComponent>;
  private dialogFormCmpRef: ComponentRef<DialogFormComponent>;
  private dynamicDialogCmpRef: ComponentRef<DynamicDialogComponent>;
  private states: NgHistoryState[] = [];
  private stateChangeSubject = new Subject<NgHistoryState>();

  constructor(
      private confirmationService: PrimeConfirmationService,
      private messageService: PrimeMessageService,
      private injector: Injector,
      private appRef: ApplicationRef,
      private router: Router,
      private location: LocationStrategy,
      @Inject(DOCUMENT) private document: Document,
      private configService: ConfigService
  ) {
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
      styleClass: `${options.styleClass} ${(options.rtl ?? this.configService.getConfig().rtl) ? 'rtl' : 'ltr'}`,
    }
    instance.key = options.key;
    instance.autoZIndex = options.autoZIndex ?? true;
    instance.baseZIndex = options.baseZIndex ?? 0;
    instance.life = options.life ?? 3000;
    instance.style = options.style;
    instance.styleClass = options.styleClass;
    instance.position = options.position || 'top-right';
    instance.preventOpenDuplicates = options.preventOpenDuplicates ?? false;
    instance.preventDuplicates = options.preventDuplicates ?? false;
    instance.showTransformOptions = options.showTransformOptions ?? 'translateY(100%)';
    instance.hideTransformOptions = options.hideTransformOptions ?? 'translateY(-100%)';
    instance.showTransitionOptions = options.showTransitionOptions ?? '300ms ease-out';
    instance.hideTransitionOptions = options.hideTransitionOptions ?? '250ms ease-in';
    instance.breakpoints = options.breakpoints;
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
      acceptButtonStyleClass: `${options.acceptButtonStyleClass} ${options.buttonFull ? 'w-100' : ''} p-button-${options.acceptColor} p-button-${options.acceptAppearance} p-button-${options.buttonSize}`,
      rejectButtonStyleClass: `${options.rejectButtonStyleClass} ${options.buttonFull ? 'w-100' : ''} p-button-${options.rejectColor} p-button-${options.rejectAppearance || 'outlined'} p-button-${options.buttonSize}`,
    }
    instance.key = options.key;
    instance.defaultFocus = options.defaultFocus ?? 'accept';
    instance.showTransitionOptions = options.showTransitionOptions ?? '.12s cubic-bezier(0, 0, 0.2, 1)';
    instance.hideTransitionOptions = options.hideTransitionOptions ?? '.1s linear';
    instance.autoZIndex = options.autoZIndex ?? true;
    instance.baseZIndex = options.baseZIndex ?? this.configService.getConfig().zIndex.modal;
    instance.style = options.style;
    instance.styleClass = `${options.styleClass} ${(options.rtl ?? this.configService.getConfig().rtl) ? 'rtl' : 'ltr'} p-confirm-popup-button-icon-${options.buttonIconPos || 'left'}`;
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
      acceptVisible: true,
      rejectVisible: true,
      closeOnEscape: true,
      dismissableMask: false,
      blockScroll: true,
      defaultFocus: 'accept',
      acceptButtonStyleClass: `${options.acceptButtonStyleClass} ${options.buttonFull ? 'w-100' : ''} p-button-${options.acceptColor} p-button-${options.acceptAppearance} p-button-${options.buttonSize}`,
      rejectButtonStyleClass: `${options.rejectButtonStyleClass} ${options.buttonFull ? 'w-100' : ''} p-button-${options.rejectColor} p-button-${options.rejectAppearance || 'outlined'} p-button-${options.buttonSize}`,
    }
    instance.header = options.header;
    instance.icon = options.icon;
    instance.message = options.message;
    instance.style = options.style;
    instance.styleClass = `${options.styleClass} ${(options.rtl ?? this.configService.getConfig().rtl) ? 'rtl' : 'ltr'} p-confirm-button-icon-${options.buttonIconPos || 'left'} ${!options.header && !options.closable ? 'dialog-header-less' : ''}`;
    instance.maskStyleClass = options.maskStyleClass;
    instance.acceptIcon = options.acceptIcon;
    instance.acceptLabel = options.acceptLabel;
    instance.closeAriaLabel = options.closeAriaLabel;
    instance.acceptAriaLabel = options.acceptAriaLabel;
    instance.acceptVisible = options.acceptVisible ?? true;
    instance.rejectIcon = options.rejectIcon;
    instance.rejectLabel = options.rejectLabel;
    instance.rejectAriaLabel = options.rejectAriaLabel;
    instance.rejectVisible = options.rejectVisible ?? true;
    instance.acceptButtonStyleClass = options.acceptButtonStyleClass;
    instance.rejectButtonStyleClass = options.rejectButtonStyleClass;
    instance.closeOnEscape = options.closeOnEscape ?? true;
    instance.dismissableMask = options.dismissableMask;
    instance.blockScroll = options.blockScroll ?? true;
    instance.closable = options.closable ?? true;
    instance.appendTo = options.appendTo;
    instance.key = options.key;
    instance.autoZIndex = options.autoZIndex ?? true;
    instance.baseZIndex = options.baseZIndex ?? this.configService.getConfig().zIndex.modal;
    instance.transitionOptions = options.transitionOptions ?? '150ms cubic-bezier(0, 0, 0.2, 1)';
    instance.focusTrap = options.focusTrap ?? true;
    instance.defaultFocus = options.defaultFocus ?? 'accept';
    instance.breakpoints = options.breakpoints;
    instance.visible = options.visible;
    instance.position = options.position;

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
    instance.options = {
      content: '',
      modal: true,
      draggable: true,
      resizable: true,
      closeOnEscape: true,
      closable: true,
      showHeader: true,
      blockScroll: false,
      autoZIndex: true,
      minX: 0,
      minY: 0,
      focusOnShow: true,
      keepInViewport: true,
      focusTrap: true,
      transitionOptions: '150ms cubic-bezier(0, 0, 0.2, 1)',
      closeTabindex: '0',
      baseZIndex: options.baseZIndex ?? this.configService.getConfig().zIndex.modal,
      ...options,
      styleClass: `${options.styleClass} ${(options.rtl ?? this.configService.getConfig().rtl) ? 'rtl' : 'ltr'} ${!options.showHeader ? 'dialog-header-less' : ''}`,
    };
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
    instance.options = {
      modal: true,
      closable: true,
      showHeader: true,
      autoZIndex: true,
      transitionOptions: '150ms cubic-bezier(0, 0, 0.2, 1)',
      closeIcon: 'pi pi-times',
      minimizeIcon: 'pi pi-window-minimize',
      maximizeIcon: 'pi pi-window-maximize',
      style: {width: '400px'},
      acceptVisible: true,
      rejectVisible: true,
      acceptLabel: 'تایید',
      rejectLabel: 'بستن',
      rejectAppearance: 'outlined',
      rejectColor: 'danger',
      defaultFocus: 'accept',
      baseZIndex: options.baseZIndex ?? this.configService.getConfig().zIndex.modal,
      rtl: this.configService.getConfig().rtl,
      ...options,
      acceptButtonStyleClass: `${options.acceptButtonStyleClass} p-dialog-form-accept`,
      rejectButtonStyleClass: `${options.rejectButtonStyleClass} p-dialog-form-reject`,
      styleClass: `${options.styleClass} p-dialog-form-wrapper ${(options.rtl ?? this.configService.getConfig().rtl) ? 'rtl' : 'ltr'} ${!options.showHeader ? 'dialog-header-less' : ''}`,
    };
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
    this.appRef.attachView(componentRef.hostView);
    this.document.body.appendChild(componentRef.location.nativeElement);
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

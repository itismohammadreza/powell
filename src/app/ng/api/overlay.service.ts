import {
  ApplicationRef,
  ComponentRef,
  createComponent,
  EmbeddedViewRef,
  Inject,
  Injectable,
  Injector,
  Type
} from '@angular/core';
import {Router} from "@angular/router";
import {DOCUMENT, LocationStrategy} from '@angular/common';
import {Observable, Subject} from "rxjs";
import {ConfigService} from "@ng/api";
import {DialogComponent, DialogFormComponent} from "@ng/components/overlay";
import {PrimeConfirmDialog, PrimeConfirmPopup, PrimeToast} from "@ng/primeng";
import {
  NgConfirmDialogOptions,
  NgConfirmPopupOptions,
  NgDialogFormConfig,
  NgDialogFormOptions,
  NgDialogFormResult,
  NgDialogOptions,
  NgHistoryState,
  NgToastOptions
} from '@ng/models';
import {
  PrimeConfirmation,
  PrimeConfirmationService,
  PrimeConfirmEventType,
  PrimeMessage,
  PrimeMessageService
} from "@ng/primeng/api";
import {
  DynamicDialogComponent,
  DynamicDialogConfig,
  DynamicDialogInjector,
  DynamicDialogRef
} from "@ng/components/dynamic-dialog";

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
    const dynamicDialogCmpRef = createComponent(DynamicDialogComponent, {
      environmentInjector: this.appRef.injector,
      elementInjector: new DynamicDialogInjector(this.injector, map)
    })
    this.appRef.attachView(dynamicDialogCmpRef.hostView);
    const domElem = (dynamicDialogCmpRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
    this.document.body.appendChild(domElem);
    const onCloseSub = dynamicDialogCmpRef.instance.onClose.subscribe(() => {
      this.removeFromBody(this.dynamicDialogCmpRef);
      onCloseSub.unsubscribe();
    });
    dynamicDialogCmpRef.instance.open(componentType);
    this.dynamicDialogCmpRef = dynamicDialogCmpRef;
    return dialogRef;
  }

  showToast(options: NgToastOptions): Promise<boolean> {
    if (!this.bodyContains(this.toastCmpRef)) {
      this.toastCmpRef = this.addToBody(PrimeToast);
    }
    const {instance} = this.toastCmpRef;
    const toast: PrimeMessage = {
      severity: 'info',
      ...options,
      styleClass: `${options.styleClass} ${(options.rtl == undefined ? this.configService.getConfig().rtl : options.rtl) ? 'rtl' : 'ltr'}`,
    }
    instance.preventDuplicates = options.preventDuplicates;
    instance.position = options.position || 'top-right';
    instance.style = options.style;
    instance.baseZIndex = options.baseZIndex;
    instance.autoZIndex = options.autoZIndex != undefined ? options.autoZIndex : true;
    instance.showTransitionOptions = options.showTransitionOptions || '300ms ease-out';
    instance.hideTransitionOptions = options.hideTransitionOptions || '250ms ease-in';
    instance.showTransformOptions = options.showTransformOptions || 'translateY(100%)';
    instance.hideTransformOptions = options.hideTransformOptions || 'translateY(-100%)';
    instance.breakpoints = options.breakpoints;
    setTimeout(() => {
      this.messageService.add(toast);
    }, 0);
    return new Promise((accept) => {
      const subscription = instance.onClose.subscribe(() => {
        subscription.unsubscribe();
        setTimeout(() => {
          accept(true);
        }, 1)
      });
    });
  }

  showConfirmPopup(options: NgConfirmPopupOptions): Promise<boolean> {
    if (!this.bodyContains(this.confirmPopupCmpRef)) {
      this.confirmPopupCmpRef = this.addToBody(PrimeConfirmPopup);
    }
    const {instance} = this.confirmPopupCmpRef;
    const confirmation: PrimeConfirmation = {
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'تایید',
      rejectLabel: 'لغو',
      ...options,
      acceptButtonStyleClass: `${options.acceptButtonStyleClass} ${options.buttonFull ? 'w-100' : ''} p-button-${options.acceptColor} p-button-${options.acceptAppearance} p-button-${options.buttonSize}`,
      rejectButtonStyleClass: `${options.rejectButtonStyleClass} ${options.buttonFull ? 'w-100' : ''} p-button-${options.rejectColor} p-button-${options.rejectAppearance || 'outlined'} p-button-${options.buttonSize}`,
    }
    instance.showTransitionOptions = options.showTransitionOptions || '.12s cubic-bezier(0, 0, 0.2, 1)';
    instance.hideTransitionOptions = options.hideTransitionOptions || '.1s linear';
    instance.autoZIndex = options.autoZIndex != undefined ? options.autoZIndex : true;
    instance.baseZIndex = options.baseZIndex;
    instance.style = options.style;
    instance.styleClass = `${options.styleClass} ${(options.rtl == undefined ? this.configService.getConfig().rtl : options.rtl) ? 'rtl' : 'ltr'} p-confirm-popup-button-icon-${options.buttonIconPos || 'left'}`;
    return new Promise((accept) => {
      const state: NgHistoryState = {component: 'confirmPopup'};
      this.pushState(state)
      this.confirmationService.confirm({
        ...confirmation,
        accept: () => {
          this.popState();
          setTimeout(() => {
            accept(true);
          }, 1)
        },
        reject: () => {
          this.popState();
          setTimeout(() => {
            accept(false);
          }, 1)
        },
      });
    });
  }

  showConfirmDialog(options: NgConfirmDialogOptions): Promise<boolean | null> {
    if (!this.bodyContains(this.confirmCmpRef)) {
      this.confirmCmpRef = this.addToBody(PrimeConfirmDialog);
    }
    const {instance} = this.confirmCmpRef;
    const confirmation: PrimeConfirmation = {
      ...options,
      acceptButtonStyleClass: `${options.acceptButtonStyleClass} ${options.buttonFull ? 'w-100' : ''} p-button-${options.acceptColor} p-button-${options.acceptAppearance} p-button-${options.buttonSize}`,
      rejectButtonStyleClass: `${options.rejectButtonStyleClass} ${options.buttonFull ? 'w-100' : ''} p-button-${options.rejectColor} p-button-${options.rejectAppearance || 'outlined'} p-button-${options.buttonSize}`,
    }
    instance.style = options.style;
    instance.styleClass = `${options.styleClass} ${(options.rtl == undefined ? this.configService.getConfig().rtl : options.rtl) ? 'rtl' : 'ltr'} p-confirm-button-icon-${options.buttonIconPos || 'left'} ${!options.header && !options.closable ? 'dialog-header-less' : ''}`;
    instance.maskStyleClass = options.maskStyleClass;
    instance.closable = options.closable != undefined ? options.closable : true;
    instance.focusTrap = options.focusTrap;
    instance.baseZIndex = options.baseZIndex;
    instance.acceptIcon = options.acceptIcon;
    instance.rejectIcon = options.rejectIcon;
    instance.autoZIndex = options.autoZIndex != undefined ? options.autoZIndex : true;
    instance.breakpoints = options.breakpoints;
    instance.transitionOptions = options.transitionOptions || '200ms cubic-bezier(0.25, 0.8, 0.25, 1)';
    return new Promise((accept) => {
      const state: NgHistoryState = {component: 'confirmDialog'};
      this.pushState(state)
      this.confirmationService.confirm({
        ...confirmation,
        accept: () => {
          this.popState();
          setTimeout(() => {
            accept(true);
          }, 1)
        },
        reject: (type: PrimeConfirmEventType) => {
          this.popState();
          switch (type) {
            case PrimeConfirmEventType.REJECT:
              setTimeout(() => {
                accept(false);
              }, 1)
              break;
            case PrimeConfirmEventType.CANCEL:
              setTimeout(() => {
                accept(null);
              }, 1)
              break;
          }
        }
      });
    })
  }

  showDialog(options: NgDialogOptions): Promise<void> {
    if (!this.bodyContains(this.dialogCmpRef)) {
      // this.dialogCmpRef = this.addToBody(DialogComponent);
    }
    const {instance} = this.dialogCmpRef;
    instance.options = {
      content: '',
      modal: true,
      autoZIndex: true,
      showHeader: true,
      buttonLabel: 'بستن',
      transitionOptions: '150ms cubic-bezier(0, 0, 0.2, 1)',
      closeIcon: 'pi pi-times',
      minimizeIcon: 'pi pi-window-minimize',
      maximizeIcon: 'pi pi-window-maximize',
      ...options,
      styleClass: `${options.styleClass} ${(options.rtl == undefined ? this.configService.getConfig().rtl : options.rtl) ? 'rtl' : 'ltr'} ${!options.showHeader ? 'dialog-header-less' : ''}`,
    };
    instance.show();
    const state: NgHistoryState = {component: 'dialog'};
    this.pushState(state);
    return new Promise((accept) => {
      const subscription = this.dialogCmpRef.instance.onClose.subscribe(() => {
        if (!this.isPopped(state)) {
          this.popState()
        }
        subscription.unsubscribe();
        setTimeout(() => {
          accept();
        }, 1)
      });
    });
  }

  showDialogForm(config: NgDialogFormConfig[], options: NgDialogFormOptions = {}): Observable<NgDialogFormResult> {
    if (!this.bodyContains(this.dialogFormCmpRef)) {
      // this.dialogFormCmpRef = this.addToBody(DialogFormComponent);
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
      rtl: this.configService.getConfig().rtl,
      ...options,
      acceptButtonStyleClass: `${options.acceptButtonStyleClass} p-dialog-form-accept`,
      rejectButtonStyleClass: `${options.rejectButtonStyleClass} p-dialog-form-reject`,
      styleClass: `${options.styleClass} p-dialog-form-wrapper ${(options.rtl == undefined ? this.configService.getConfig().rtl : options.rtl) ? 'rtl' : 'ltr'} ${!options.showHeader ? 'dialog-header-less' : ''}`,
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

  private addToBody<T>(component: Type<T>): ComponentRef<T> {
    const componentRef = createComponent(component, {
      environmentInjector: this.appRef.injector,
      elementInjector: this.injector
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
      state.key = this.getId()
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

  getId() {
    return 'id' + Math.random().toString(16).slice(2);
  }

  isPopped(state: NgHistoryState) {
    return this.states.findIndex(s => s.key === state.key && s.component === state.component) === -1;
  }
}

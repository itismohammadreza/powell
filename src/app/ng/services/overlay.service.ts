import {ApplicationRef, ComponentRef, createComponent, Inject, Injectable, Injector, Type} from '@angular/core';
import {
  NgConfirmDialogOptions,
  NgConfirmPopupOptions,
  NgDialogFormConfig,
  NgDialogFormOptions,
  NgDialogFormResult,
  NgDialogOptions,
  NgToastOptions
} from '@ng/models/overlay';
import {Confirmation, ConfirmationService, ConfirmEventType, Message, MessageService} from 'primeng/api';
import {DialogComponent} from '@ng/components/dialog/dialog.component';
import {DOCUMENT, LocationStrategy} from '@angular/common';
import {Toast} from 'primeng/toast';
import {ConfirmPopup} from 'primeng/confirmpopup';
import {ConfirmDialog} from 'primeng/confirmdialog';
import {Observable} from "rxjs";
import {DialogFormComponent} from "@ng/components/dialog-form/dialog-form.component";
import {GlobalConfig} from "@core/global.config";
import {Router} from "@angular/router";
import {NgHistoryState} from "@ng/models/offset";

@Injectable({
  providedIn: 'root'
})
export class OverlayService {
  private toastCmpRef: ComponentRef<Toast>;
  private confirmPopupCmpRef: ComponentRef<ConfirmPopup>;
  private confirmCmpRef: ComponentRef<ConfirmDialog>;
  private dialogCmpRef: ComponentRef<DialogComponent>;
  private dialogFormCmpRef: ComponentRef<DialogFormComponent>;
  // private anyDialogVisibleSubject = new BehaviorSubject<boolean>(false);
  private states: string[] = [];

  constructor(
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private injector: Injector,
    private appRef: ApplicationRef,
    private router: Router,
    private location: LocationStrategy,
    @Inject(DOCUMENT) private document: Document,
  ) {
    this.location.onPopState((e) => {
      const currentState = this.states.pop();
      switch (currentState) {
        case 'dialog':
          this.dialogCmpRef.instance.close();
          break;
        case 'dialogForm':
          this.dialogFormCmpRef.instance.close();
          break;
        case 'confirm':
          this.confirmationService.close();
          break;
      }
    })
  }

  showToast(options: NgToastOptions): Promise<boolean> {
    if (!this.bodyContains(this.toastCmpRef)) {
      this.toastCmpRef = this.addToBody(Toast);
    }
    const {instance} = this.toastCmpRef;
    const toast: Message = {
      severity: 'info',
      ...options,
      styleClass: `${options.styleClass} ${(options.rtl == undefined ? GlobalConfig.rtl : options.rtl) ? 'rtl' : 'ltr'}`,
    }
    instance.preventDuplicates = options.preventDuplicates;
    instance.position = options.position || 'top-right';
    instance.style = options.style;
    instance.baseZIndex = options.baseZIndex || 1000;
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
        accept(true);
      });
    });
  }

  showConfirmPopup(options: NgConfirmPopupOptions): Promise<boolean> {
    if (!this.bodyContains(this.confirmPopupCmpRef)) {
      this.confirmPopupCmpRef = this.addToBody(ConfirmPopup);
    }
    const {instance} = this.confirmPopupCmpRef;
    const confirmation: Confirmation = {
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
    instance.baseZIndex = options.baseZIndex || 1000;
    instance.style = options.style;
    instance.styleClass = `${options.styleClass} ${(options.rtl == undefined ? GlobalConfig.rtl : options.rtl) ? 'rtl' : 'ltr'} p-confirm-popup-button-icon-${options.buttonIconPos || 'left'}`;
    return new Promise((accept) => {
      // this.pushState('confirm')
      this.confirmationService.confirm({
        ...confirmation,
        accept: () => {
          // this.popState();
          accept(true);
        },
        reject: () => {
          // this.popState();
          accept(false);
        },
      });
    });
  }

  showConfirmDialog(options: NgConfirmDialogOptions): Promise<boolean | null> {
    if (!this.bodyContains(this.confirmCmpRef)) {
      this.confirmCmpRef = this.addToBody(ConfirmDialog);
    }
    const {instance} = this.confirmCmpRef;
    const confirmation: Confirmation = {
      ...options,
      acceptButtonStyleClass: `${options.acceptButtonStyleClass} ${options.buttonFull ? 'w-100' : ''} p-button-${options.acceptColor} p-button-${options.acceptAppearance} p-button-${options.buttonSize}`,
      rejectButtonStyleClass: `${options.rejectButtonStyleClass} ${options.buttonFull ? 'w-100' : ''} p-button-${options.rejectColor} p-button-${options.rejectAppearance || 'outlined'} p-button-${options.buttonSize}`,
    }
    instance.style = options.style;
    instance.styleClass = `${options.styleClass} ${(options.rtl == undefined ? GlobalConfig.rtl : options.rtl) ? 'rtl' : 'ltr'} p-confirm-button-icon-${options.buttonIconPos || 'left'} ${!options.header && !options.closable ? 'header-less' : ''}`;
    instance.maskStyleClass = options.maskStyleClass;
    instance.closable = options.closable != undefined ? options.closable : true;
    instance.focusTrap = options.focusTrap;
    instance.baseZIndex = options.baseZIndex || 1000;
    instance.acceptIcon = options.acceptIcon;
    instance.rejectIcon = options.rejectIcon;
    instance.autoZIndex = options.autoZIndex != undefined ? options.autoZIndex : true;
    instance.breakpoints = options.breakpoints;
    instance.transitionOptions = options.transitionOptions || '200ms cubic-bezier(0.25, 0.8, 0.25, 1)';
    return new Promise((accept) => {
      // this.pushState('confirm')
      this.confirmationService.confirm({
        ...confirmation,
        accept: () => {
          // this.popState();
          accept(true);
        },
        reject: (type: ConfirmEventType) => {
          // this.popState();
          switch (type) {
            case ConfirmEventType.REJECT:
              accept(false);
              break;
            case ConfirmEventType.CANCEL:
              accept(null);
              break;
          }
        }
      });
    })
  }

  showDialog(options: NgDialogOptions): Promise<void> {
    if (!this.bodyContains(this.dialogCmpRef)) {
      this.dialogCmpRef = this.addToBody(DialogComponent);
    }
    const {instance} = this.dialogCmpRef;
    instance.options = {
      content: '',
      modal: true,
      autoZIndex: true,
      baseZIndex: 1000,
      showHeader: true,
      buttonLabel: 'بستن',
      transitionOptions: '150ms cubic-bezier(0, 0, 0.2, 1)',
      closeIcon: 'pi pi-times',
      minimizeIcon: 'pi pi-window-minimize',
      maximizeIcon: 'pi pi-window-maximize',
      ...options,
      styleClass: `${options.styleClass} ${(options.rtl == undefined ? GlobalConfig.rtl : options.rtl) ? 'rtl' : 'ltr'} ${!options.showHeader ? 'header-less' : ''}`,
    };
    instance.show();
    // this.pushState('dialog');
    return new Promise((accept) => {
      const subscription = this.dialogCmpRef.instance.onClose.subscribe(() => {
        // if (this.lastState == 'dialog') {
        //   this.popState()
        // }
        subscription.unsubscribe();
        accept();
      });
    });
  }

  showDialogForm(config: NgDialogFormConfig[], options: NgDialogFormOptions = {}): Observable<NgDialogFormResult> {
    if (!this.bodyContains(this.dialogFormCmpRef)) {
      this.dialogFormCmpRef = this.addToBody(DialogFormComponent);
    }
    const {instance} = this.dialogFormCmpRef;
    instance.config = config;
    instance.options = {
      modal: true,
      closable: true,
      showHeader: true,
      baseZIndex: 1000,
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
      rtl: GlobalConfig.rtl,
      ...options,
      acceptButtonStyleClass: `${options.acceptButtonStyleClass} p-dialog-form-accept`,
      rejectButtonStyleClass: `${options.rejectButtonStyleClass} p-dialog-form-reject`,
      styleClass: `${options.styleClass} p-dialog-form-wrapper ${(options.rtl == undefined ? GlobalConfig.rtl : options.rtl) ? 'rtl' : 'ltr'} ${!options.showHeader ? 'header-less' : ''}`,
    };
    instance.show();
    // this.pushState('dialogForm');
    return new Observable<NgDialogFormResult>((resolve) => {
      const submitSubscription = instance.onSubmit.subscribe(res => {
        // if (this.lastState == 'dialogForm') {
        //   this.popState()
        // }
        resolve.next(res);
      });
      const closeSubscription = instance.onClose.subscribe(() => {
        // if (this.lastState == 'dialogForm') {
        //   this.popState()
        // }
        submitSubscription.unsubscribe();
        closeSubscription.unsubscribe();
        resolve.next(null);
      })
    })
  }

  closeAnyOpenDialog() {
    return new Promise((accept) => {
      this.messageService.clear();
      this.confirmationService.close();
      this.dialogCmpRef?.instance.close();
      this.dialogFormCmpRef?.instance.close();
      this.toastCmpRef?.destroy();
      this.states.forEach(x => {
        this.popState()
        this.states.pop()
      })
      accept(true)
    })
    // this.setAnyDialogVisible(false)
  }

  // isAnyDialogOpen() {
  //   return this.anyDialogVisibleSubject.getValue();
  // }

  // isAnyDialogOpenObs() {
  //   return this.anyDialogVisibleSubject.asObservable();
  // }

  // setAnyDialogVisible(value: boolean) {
  // this.anyDialogVisibleSubject.next(value);
  // }

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
    this.location.pushState({state}, '', this.router.url, '');
    this.states.push(state)
  }

  popState() {
    this.location.back()
  }

  get lastState(): NgHistoryState {
    const lastState = this.location.getState() as any;
    return lastState.state;
  }
}

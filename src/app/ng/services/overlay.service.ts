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

@Injectable({
  providedIn: 'root'
})
export class OverlayService {
  private toastCmpRef: ComponentRef<Toast>;
  private confirmPopupCmpRef: ComponentRef<ConfirmPopup>;
  private confirmCmpRef: ComponentRef<ConfirmDialog>;
  private dialogCmpRef: ComponentRef<DialogComponent>;
  private dialogFormCmpRef: ComponentRef<DialogFormComponent>;

  constructor(
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private injector: Injector,
    private appRef: ApplicationRef,
    private locationStrategy: LocationStrategy,
    @Inject(DOCUMENT) private document: Document,
  ) {
  }

  showToast(options: NgToastOptions): Promise<boolean> {
    if (!this.bodyContains(this.toastCmpRef)) {
      this.toastCmpRef = this.addToBody(Toast);
    }

    const toast: Message = {
      life: 3000,
      styleClass: `${options.styleClass} ${options.rtl ? 'rtl' : 'ltr'}`,
      closable: true,
      severity: 'info',
      ...options
    }
    this.toastCmpRef.instance.preventDuplicates = options.preventDuplicates;
    this.toastCmpRef.instance.position = options.position || 'top-right';
    this.toastCmpRef.instance.style = options.style;
    this.toastCmpRef.instance.baseZIndex = options.baseZIndex || 0;
    this.toastCmpRef.instance.autoZIndex = options.autoZIndex != undefined ? options.autoZIndex : true;
    this.toastCmpRef.instance.showTransitionOptions = options.showTransitionOptions || '300ms ease-out';
    this.toastCmpRef.instance.hideTransitionOptions = options.hideTransitionOptions || '250ms ease-in';
    this.toastCmpRef.instance.showTransformOptions = options.showTransformOptions || 'translateY(100%)';
    this.toastCmpRef.instance.hideTransformOptions = options.hideTransformOptions || 'translateY(-100%)';
    this.toastCmpRef.instance.breakpoints = options.breakpoints;
    setTimeout(() => {
      this.messageService.add(toast);
    }, 0);
    return new Promise((accept) => {
      const subscription = this.toastCmpRef.instance.onClose.subscribe(() => {
        subscription.unsubscribe();
        accept(true);
      });
    });
  }

  showConfirmPopup(options: NgConfirmPopupOptions): Promise<boolean> {
    if (!this.bodyContains(this.confirmPopupCmpRef)) {
      this.confirmPopupCmpRef = this.addToBody(ConfirmPopup);
    }
    this.confirmPopupCmpRef.instance.showTransitionOptions = options.showTransitionOptions || '.12s cubic-bezier(0, 0, 0.2, 1)';
    this.confirmPopupCmpRef.instance.hideTransitionOptions = options.hideTransitionOptions || '.1s linear';
    this.confirmPopupCmpRef.instance.autoZIndex = options.autoZIndex != undefined ? options.autoZIndex : true;
    this.confirmPopupCmpRef.instance.baseZIndex = options.baseZIndex || 0;
    this.confirmPopupCmpRef.instance.style = options.style;
    this.confirmPopupCmpRef.instance.styleClass = `${options.styleClass} ${options.rtl ? 'rtl' : 'ltr'} p-confirm-popup-button-icon-${options.buttonIconPos || 'left'}`;

    const confirmation: Confirmation = {
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'تایید',
      rejectLabel: 'لغو',
      acceptVisible: true,
      rejectVisible: true,
      defaultFocus: 'accept',
      acceptButtonStyleClass: `${options.acceptButtonStyleClass} p-button-${options.acceptColor} p-button-${options.acceptAppearance} p-button-${options.buttonSize}`,
      rejectButtonStyleClass: `${options.rejectButtonStyleClass} p-button-${options.rejectColor} p-button-${options.rejectAppearance || 'outlined'} p-button-${options.buttonSize}`,
      ...options
    }
    return new Promise((accept) => {
      this.confirmationService.confirm({
        ...confirmation,
        accept: () => {
          accept(true);
        },
        reject: () => {
          accept(false);
        },
      });
    });
  }

  showConfirmDialog(options: NgConfirmDialogOptions): Promise<boolean> {
    if (!this.bodyContains(this.confirmCmpRef)) {
      this.confirmCmpRef = this.addToBody(ConfirmDialog);
    }
    this.confirmCmpRef.instance.style = options.style;
    this.confirmCmpRef.instance.styleClass = `${options.styleClass} ${options.rtl ? 'rtl' : 'ltr'} p-confirm-button-icon-${options.buttonIconPos || 'left'}`;
    this.confirmCmpRef.instance.maskStyleClass = options.maskStyleClass;
    this.confirmCmpRef.instance.closable = options.closable != undefined ? options.closable : true;
    this.confirmCmpRef.instance.focusTrap = options.focusTrap;
    this.confirmCmpRef.instance.baseZIndex = options.baseZIndex;
    this.confirmCmpRef.instance.autoZIndex = options.autoZIndex != undefined ? options.autoZIndex : true;
    this.confirmCmpRef.instance.breakpoints = options.breakpoints;
    this.confirmCmpRef.instance.transitionOptions = options.transitionOptions || '200ms cubic-bezier(0.25, 0.8, 0.25, 1)';

    const confirmation: Confirmation = {
      acceptVisible: true,
      rejectVisible: true,
      dismissableMask: false,
      defaultFocus: 'accept',
      blockScroll: true,
      acceptButtonStyleClass: `${options.acceptButtonStyleClass} p-button-${options.acceptColor} p-button-${options.acceptAppearance} p-button-${options.buttonSize}`,
      rejectButtonStyleClass: `${options.rejectButtonStyleClass} p-button-${options.rejectColor} p-button-${options.rejectAppearance || 'outlined'} p-button-${options.buttonSize}`,
      ...options
    }
    return new Promise((accept) => {
      this.confirmationService.confirm({
        ...confirmation,
        accept: () => {
          accept(true);
        },
        reject: (type: ConfirmEventType) => {
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
    const dialog: NgDialogOptions = {
      draggable: false,
      keepInViewport: true,
      resizable: true,
      modal: true,
      position: 'center',
      blockScroll: true,
      closeOnEscape: true,
      dismissableMask: false,
      closable: true,
      showHeader: true,
      baseZIndex: 0,
      autoZIndex: true,
      minX: 0,
      minY: 0,
      focusOnShow: true,
      focusTrap: true,
      transitionOptions: '150ms cubic-bezier(0, 0, 0.2, 1)',
      closeIcon: 'pi pi-times',
      minimizeIcon: 'pi pi-window-minimize',
      maximizeIcon: 'pi pi-window-maximize',
      content: '',
      styleClass: `${options.styleClass} ${options.rtl ? 'rtl' : 'ltr'}`,
      ...options
    }
    this.dialogCmpRef.instance.options = dialog;
    this.dialogCmpRef.instance.show();
    return new Promise((accept) => {
      const subscription = this.dialogCmpRef.instance.onClose.subscribe(() => {
        subscription.unsubscribe();
        accept();
      });
    });
  }

  showDialogForm(config: NgDialogFormConfig[], options?: NgDialogFormOptions): Observable<NgDialogFormResult> {
    if (!this.bodyContains(this.dialogFormCmpRef)) {
      this.dialogFormCmpRef = this.addToBody(DialogFormComponent);
    }
    const dialogForm: NgDialogFormOptions = {
      keepInViewport: true,
      modal: true,
      position: 'center',
      closeOnEscape: true,
      closable: true,
      showHeader: true,
      baseZIndex: 0,
      autoZIndex: true,
      minX: 0,
      minY: 0,
      focusOnShow: true,
      focusTrap: true,
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
      styleClass: `${options.styleClass} p-dialog-form ${options.rtl ? 'rtl' : 'ltr'}`,
      ...options
    }
    this.dialogFormCmpRef.instance.config = config;
    this.dialogFormCmpRef.instance.options = dialogForm;
    this.dialogFormCmpRef.instance.show();
    return new Observable<NgDialogFormResult>((resolve) => {
      const submitSubscription = this.dialogFormCmpRef.instance.onSubmit.subscribe(res => {
        resolve.next(res);
      })
      const closeSubscription = this.dialogFormCmpRef.instance.onClose.subscribe(res => {
        setTimeout(() => {
          this.removeFromBody(this.dialogFormCmpRef);
        }, 200)
        submitSubscription.unsubscribe();
        closeSubscription.unsubscribe();
      })
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

  isAnyDialogOpen() {
    return ['p-toastitem', '.p-confirm-popup', '.p-confirm-dialog', '.p-dialog', '.p-dialog-form'].some(selector => {
      return !!this.document.querySelector(selector)
    })
  }

  closeAnyOpenDialog() {
    this.messageService?.clear();
    this.confirmationService?.close();
    this.dialogCmpRef?.instance.close();
    this.dialogFormCmpRef?.instance.close();
  }
}

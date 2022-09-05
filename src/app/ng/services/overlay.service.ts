import {ApplicationRef, ComponentRef, createComponent, Inject, Injectable, Injector, Type} from '@angular/core';
import {DialogFormComponent} from '@ng/components/dialog-form/dialog-form.component';
import {MessageComponent} from '@ng/components/message/message.component';
import {
  NgConfirmOptions,
  NgConfirmPopupOptions,
  NgDialog,
  NgDialogFormConfig,
  NgDialogFormOptions,
  NgMessageOptions,
  NgToastOptions
} from '@ng/models/overlay';
import {Confirmation, ConfirmationService, ConfirmEventType, FilterService, Message, MessageService} from 'primeng/api';
import {DialogService, DynamicDialogRef} from 'primeng/dynamicdialog';
import {DialogComponent} from '@ng/components/dialog/dialog.component';
import {DOCUMENT} from '@angular/common';
import {Toast} from 'primeng/toast';
import {ConfirmPopup} from 'primeng/confirmpopup';
import {ConfirmDialog} from 'primeng/confirmdialog';

@Injectable({
  providedIn: 'root'
})
export class OverlayService {
  private messageCmpRef: ComponentRef<MessageComponent>;
  private toastCmpRef: ComponentRef<Toast>;
  private confirmPopupCmpRef: ComponentRef<ConfirmPopup>;
  private confirmCmpRef: ComponentRef<ConfirmDialog>;
  private dialogCmpRef: ComponentRef<DialogComponent>;

  constructor(
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private dialogService: DialogService,
    private injector: Injector,
    private appRef: ApplicationRef,
    @Inject(DOCUMENT) private document: Document
  ) {
  }

  showMessage(options: NgMessageOptions): void {
    if (!this.document.body.contains(this.messageCmpRef?.location.nativeElement)) {
      this.messageCmpRef = this.addComponentToBody(MessageComponent, 'prepend');
    }
    Object.assign(this.messageCmpRef.instance.options, options);
    setTimeout(() => {
      this.messageService.add(options);
    }, 0);
  }

  showToast(options: NgToastOptions): void {
    if (!this.document.body.contains(this.toastCmpRef?.location.nativeElement)) {
      this.toastCmpRef = this.addComponentToBody(Toast);
    }
    const toast: Message = {
      key: options.key,
      data: options.data,
      life: options.life || 60000,
      id: options.id,
      sticky: options.sticky,
      styleClass: `${options.styleClass} ${options.rtl ? 'rtl' : ''}`,
      summary: options.summary,
      closable: options.closable,
      severity: options.severity || 'info',
      icon: options.icon,
      contentStyleClass: options.contentStyleClass,
      detail: options.detail,
    }
    this.toastCmpRef.instance.preventOpenDuplicates = options.preventOpenDuplicates;
    this.toastCmpRef.instance.preventDuplicates = options.preventDuplicates;
    this.toastCmpRef.instance.position = options.position || 'top-right';
    this.toastCmpRef.instance.style = {...options.style, direction: 'ltr'};
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
  }

  showConfirmPopup(options: NgConfirmPopupOptions): Promise<boolean> {
    if (!this.document.body.contains(this.confirmPopupCmpRef?.location.nativeElement)) {
      this.confirmPopupCmpRef = this.addComponentToBody(ConfirmPopup);
    }
    this.confirmPopupCmpRef.instance.showTransitionOptions = options.showTransitionOptions || '.12s cubic-bezier(0, 0, 0.2, 1)';
    this.confirmPopupCmpRef.instance.hideTransitionOptions = options.hideTransitionOptions || '.1s linear';
    this.confirmPopupCmpRef.instance.autoZIndex = options.autoZIndex != undefined ? options.autoZIndex : true;
    this.confirmPopupCmpRef.instance.baseZIndex = options.baseZIndex || 0;
    this.confirmPopupCmpRef.instance.style = {...options.style, direction: 'ltr'};
    this.confirmPopupCmpRef.instance.styleClass = `${options.styleClass} ${options.rtl ? 'rtl' : ''}`;

    const confirmation: Confirmation = {
      target: options.target,
      message: options.message,
      key: options.key,
      icon: options.icon || 'pi pi-exclamation-triangle',
      acceptLabel: options.acceptLabel,
      rejectLabel: options.rejectLabel,
      acceptIcon: options.acceptIcon,
      rejectIcon: options.rejectIcon,
      acceptVisible: options.acceptVisible,
      rejectVisible: options.rejectVisible,
      acceptButtonStyleClass: `${options.acceptButtonStyleClass} p-button-${options.acceptColor} p-button-${options.acceptAppearance} p-button-${options.buttonSize}`,
      rejectButtonStyleClass: `${options.rejectButtonStyleClass} p-button-${options.rejectColor} p-button-${options.rejectAppearance} p-button-${options.buttonSize}`,
      defaultFocus: options.defaultFocus || 'accept',
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

  showConfirm(options: NgConfirmOptions): Promise<boolean> {
    if (!this.document.body.contains(this.confirmCmpRef?.location.nativeElement)) {
      this.confirmCmpRef = this.addComponentToBody(ConfirmDialog);
    }
    this.confirmCmpRef.instance.style = {...options.style, direction: 'ltr'};
    this.confirmCmpRef.instance.styleClass = `${options.styleClass} ${options.rtl ? 'rtl' : ''}`;
    this.confirmCmpRef.instance.maskStyleClass = options.maskStyleClass;
    this.confirmCmpRef.instance.closable = options.closable;
    this.confirmCmpRef.instance.focusTrap = options.focusTrap;
    this.confirmCmpRef.instance.appendTo = options.appendTo;
    this.confirmCmpRef.instance.baseZIndex = options.baseZIndex;
    this.confirmCmpRef.instance.autoZIndex = options.autoZIndex != undefined ? options.autoZIndex : true;
    this.confirmCmpRef.instance.breakpoints = options.breakpoints;
    this.confirmCmpRef.instance.transitionOptions = options.transitionOptions;

    const confirmation: Confirmation = {
      message: options.message,
      key: options.key,
      icon: options.icon,
      header: options.header,
      acceptLabel: options.acceptLabel,
      rejectLabel: options.rejectLabel,
      acceptIcon: options.acceptIcon,
      rejectIcon: options.rejectIcon,
      acceptVisible: options.acceptVisible,
      rejectVisible: options.rejectVisible,
      acceptButtonStyleClass: `${options.acceptButtonStyleClass} p-button-${options.acceptColor} p-button-${options.acceptAppearance} p-button-${options.buttonSize}`,
      rejectButtonStyleClass: `${options.rejectButtonStyleClass} p-button-${options.rejectColor} p-button-${options.rejectAppearance} p-button-${options.buttonSize}`,
      closeOnEscape: options.closeOnEscape,
      dismissableMask: options.dismissableMask,
      defaultFocus: options.defaultFocus,
      blockScroll: options.blockScroll
    }
    return new Promise((accept) => {
      this.confirmationService.confirm({
        ...confirmation,
        accept: () => {
          accept(true);
        },
        reject: (type) => {
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

  showDialog(options: NgDialog): Promise<void> {
    if (!this.document.body.contains(this.dialogCmpRef?.location.nativeElement)) {
      this.dialogCmpRef = this.addComponentToBody(DialogComponent);
    }
    this.dialogCmpRef.instance.visible = true;
    this.dialogCmpRef.instance.options = options;
    return new Promise((accept) => {
      const subscription = this.dialogCmpRef.instance.onHide.subscribe(res => {
        this.dialogCmpRef.instance.visible = false;
        accept();
        subscription.unsubscribe();
      });
    });
  }

  showDialogForm(
    header: string,
    config: NgDialogFormConfig[],
    options?: NgDialogFormOptions
  ): DynamicDialogRef {
    return this.dialogService.open(DialogFormComponent, {
      header,
      data: {config, options},
      width: options?.width || '550px',
      styleClass: options?.rtl ? 'rtl' : 'ltr',
      footer: options?.footer,
      height: options?.height,
      closeOnEscape: options?.closeOnEscape,
      dismissableMask: options?.dismissableMask,
      closable: options?.closable || true,
      showHeader: options?.showHeader || true,
      baseZIndex: 1000
    });
  }

  private addComponentToBody<T>(component: Type<T>, pos: 'appendChild' | 'prepend' = 'appendChild'): ComponentRef<T> {
    const componentRef = createComponent(component, {
      environmentInjector: this.appRef.injector,
      elementInjector: this.injector
    })
    this.appRef.attachView(componentRef.hostView);
    this.document.body[pos](componentRef.location.nativeElement);
    return componentRef;
  }

  private removeComponentFromBody<T>(componentRef: ComponentRef<T>): void {
    this.appRef.detachView(componentRef.hostView);
    componentRef.destroy();
  }
}

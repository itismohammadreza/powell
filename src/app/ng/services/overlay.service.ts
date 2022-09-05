import {ApplicationRef, ComponentRef, createComponent, Inject, Injectable, Injector, Type} from '@angular/core';
import {UntypedFormGroup} from '@angular/forms';
import {ConfirmPopupComponent} from '@ng/components/confirm-popup/confirm-popup.component';
import {ConfirmComponent} from '@ng/components/confirm/confirm.component';
import {DialogFormComponent} from '@ng/components/dialog-form/dialog-form.component';
import {MessageComponent} from '@ng/components/message/message.component';
import {ToastComponent} from '@ng/components/toast/toast.component';
import {
  NgConfirmOptions,
  NgConfirmPopupOptions,
  NgDialog,
  NgDialogFormConfig,
  NgDialogFormOptions,
  NgMessageOptions,
  NgToastOptions
} from '@ng/models/overlay';
import {ConfirmationService, FilterService, MessageService} from 'primeng/api';
import {DialogService, DynamicDialogRef} from 'primeng/dynamicdialog';
import {fromEvent, merge, Observable, Observer} from 'rxjs';
import {map} from 'rxjs/operators';
import {NumberToPersianWord} from './num-to-per-word';
import {DialogComponent} from '@ng/components/dialog/dialog.component';
import {DOCUMENT, LocationStrategy} from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class OverlayService {
  private messageCmpRef: ComponentRef<MessageComponent>;
  private toastCmpRef: ComponentRef<ToastComponent>;
  private confirmPopupCmpRef: ComponentRef<ConfirmPopupComponent>;
  private confirmCmpRef: ComponentRef<ConfirmComponent>;
  private dialogCmpRef: ComponentRef<DialogComponent>;

  constructor(
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private dialogService: DialogService,
    private filterService: FilterService,
    private injector: Injector,
    private appRef: ApplicationRef,
    private location: LocationStrategy,
    @Inject(DOCUMENT) private document: Document
  ) {
  }

  //////////////////////////////////////////////////////////////////////////
  //                              MESSAGE                                 //
  //////////////////////////////////////////////////////////////////////////
  showMessage(options: NgMessageOptions): void {
    if (!this.document.body.contains(this.messageCmpRef?.location.nativeElement)) {
      this.messageCmpRef = this.addComponentToBody(MessageComponent, 'prepend');
    }
    Object.assign(this.messageCmpRef.instance.options, options);
    setTimeout(() => {
      this.messageService.add(options);
    }, 0);
  }

  //////////////////////////////////////////////////////////////////////////
  //                                TOAST                                 //
  //////////////////////////////////////////////////////////////////////////
  showToast(options: NgToastOptions): void {
    if (!this.document.body.contains(this.toastCmpRef?.location.nativeElement)) {
      this.toastCmpRef = this.addComponentToBody(ToastComponent);
    }
    Object.assign(this.toastCmpRef.instance.options, options);
    setTimeout(() => {
      this.messageService.add(options);
    }, 0);
  }

  //////////////////////////////////////////////////////////////////////////
  //                           CONFIRM POPUP                              //
  //////////////////////////////////////////////////////////////////////////
  showConfirmPopup(options: NgConfirmPopupOptions): Promise<boolean> {
    if (!this.document.body.contains(this.confirmPopupCmpRef?.location.nativeElement)) {
      this.confirmPopupCmpRef = this.addComponentToBody(ConfirmPopupComponent);
    }
    Object.assign(this.confirmPopupCmpRef.instance.options, options);
    return new Promise((accept, reject) => {
      this.confirmationService.confirm({
        target: options.target,
        message: options.message,
        icon: options.icon,
        accept: () => {
          this.removeComponentFromBody(this.confirmPopupCmpRef);
          accept(true);
        },
        reject: () => {
          this.removeComponentFromBody(this.confirmPopupCmpRef);
          accept(false);
        },
        key: options.key,
        acceptLabel: options.acceptLabel,
        rejectLabel: options.rejectLabel,
        acceptIcon: options.acceptIcon,
        rejectIcon: options.rejectIcon,
        acceptVisible: options.acceptVisible,
        rejectVisible: options.rejectVisible,
        acceptButtonStyleClass: options.acceptStyleClass,
        rejectButtonStyleClass: options.rejectStyleClass,
        defaultFocus: options.defaultFocus,
      });
    });
  }

  showConfirm(options: NgConfirmOptions): Promise<boolean> {
    if (!this.document.body.contains(this.confirmCmpRef?.location.nativeElement)) {
      this.confirmCmpRef = this.addComponentToBody(ConfirmComponent);
    }
    Object.assign(this.confirmCmpRef.instance.options, options);
    return new Promise((accept, reject) => {
      this.confirmationService.confirm({
        key: options.key,
        header: options.header,
        message: options.message,
        icon: options.icon,
        blockScroll: options.blockScroll,
        accept: () => {
          this.removeComponentFromBody(this.confirmCmpRef);
          accept(true);
        },
        reject: (data) => {
          this.removeComponentFromBody(this.confirmCmpRef);
          if (data == 2) {
            accept(null);
          } else if (data == 1) {
            accept(false);
          }
        },
        dismissableMask: options.dismissableMask,
        closeOnEscape: options.closeOnEscape,
      });
    });
  }

  //////////////////////////////////////////////////////////////////////////
  //                              DIALOG                                  //
  //////////////////////////////////////////////////////////////////////////
  showDialog(options: NgDialog): Promise<void> {
    if (!this.document.body.contains(this.dialogCmpRef?.location.nativeElement)) {
      this.dialogCmpRef = this.addComponentToBody(DialogComponent);
    }
    Object.assign(this.dialogCmpRef.instance.options, options);
    this.dialogCmpRef.instance.visible = true;
    return new Promise((accept, reject) => {
      this.dialogCmpRef.instance.onHide.subscribe(res => {
        this.removeComponentFromBody(this.dialogCmpRef);
        accept();
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

  //////////////////////////////////////////////////////////////////////////
  //                              GENERAL                                 //
  //////////////////////////////////////////////////////////////////////////

  addComponentToBody<T>(component: Type<T>, pos: 'appendChild' | 'prepend' = 'appendChild'): ComponentRef<T> {
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

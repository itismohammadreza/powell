import {ApplicationRef, ComponentRef, createComponent, Inject, Injectable, Injector, Type} from '@angular/core';
import {UntypedFormGroup} from '@angular/forms';
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
import {fromEvent, merge, Observable, Observer} from 'rxjs';
import {map} from 'rxjs/operators';
import {NumberToPersianWord} from './num-to-per-word';
import {DialogComponent} from '@ng/components/dialog/dialog.component';
import {DOCUMENT, LocationStrategy} from '@angular/common';
import {Toast} from "primeng/toast";
import {ConfirmDialog} from "primeng/confirmdialog";
import {ConfirmPopup} from "primeng/confirmpopup";

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  private messageCmpRef: ComponentRef<MessageComponent>;
  private toastCmpRef: ComponentRef<Toast>;
  private confirmPopupCmpRef: ComponentRef<ConfirmPopup>;
  private confirmCmpRef: ComponentRef<ConfirmDialog>;
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

  //////////////////////////////////////////////////////////////////////////
  //                           CONFIRM POPUP                              //
  //////////////////////////////////////////////////////////////////////////
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

  //////////////////////////////////////////////////////////////////////////
  //                              DIALOG                                  //
  //////////////////////////////////////////////////////////////////////////
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

  //////////////////////////////////////////////////////////////////////////
  //                               FILTER                                 //
  //////////////////////////////////////////////////////////////////////////
  startsWith(value: any, filter: any) {
    return this.filterService.filters.startsWith(value, filter);
  }

  contains(value: any, filter: any) {
    return this.filterService.filters.contains(value, filter);
  }

  endsWith(value: any, filter: any) {
    return this.filterService.filters.endsWith(value, filter);
  }

  equals(value: any, filter: any) {
    return this.filterService.filters.equals(value, filter);
  }

  notEquals(value: any, filter: any) {
    return this.filterService.filters.notEquals(value, filter);
  }

  in(value: any, filter: any) {
    return this.filterService.filters.in(value, filter);
  }

  lt(value: any, filter: any) {
    return this.filterService.filters.lt(value, filter);
  }

  lte(value: any, filter: any) {
    return this.filterService.filters.lte(value, filter);
  }

  gt(value: any, filter: any) {
    return this.filterService.filters.gt(value, filter);
  }

  gte(value: any, filter: any) {
    return this.filterService.filters.gte(value, filter);
  }

  is(value: any, filter: any) {
    return this.filterService.filters.is(value, filter);
  }

  isNot(value: any, filter: any) {
    return this.filterService.filters.isNot(value, filter);
  }

  before(value: any, filter: any) {
    return this.filterService.filters.before(value, filter);
  }

  //////////////////////////////////////////////////////////////////////////
  //                         PERSIAN-ENGLISH                              //
  //////////////////////////////////////////////////////////////////////////
  after(value: any, filter: any) {
    return this.filterService.filters.after(value, filter);
  }

  replaceArabicLettersWithPersianLetters(inputStr: string): string {
    if (inputStr == undefined) {
      return '';
    }
    inputStr = inputStr.replace(/ي/g, 'ی');
    inputStr = inputStr.replace(/ك/g, 'ک');
    return inputStr;
  }

  isPersianNumber(num: number | string): boolean {
    const regexp = new RegExp('^[\u06F0-\u06F9]+$');
    return regexp.test(num as string);
  }

  toPersianNumber(num: number | string): string {
    return this.arabicNumberToPersian(this.engNumberToPersian(num as string));
  }

  toEngNumber(num: string): number {
    const engNumber = +this.persianNumberToEng(num);
    if (isNaN(engNumber)) {
      throw new Error(`${num} is not valid persian Number`);
    }
    return engNumber;
  }

  toPersianWord(num: number | string): string {
    return new NumberToPersianWord().convertNumberToString(
      this.toEngNumber(num as string)
    );
  }

  engNumberToPersian(num: string): string {
    if (num == undefined) {
      return '';
    }
    let str = num.toString().trim();
    if (str === '') {
      return '';
    }
    str = str.replace(/0/g, '۰');
    str = str.replace(/1/g, '۱');
    str = str.replace(/2/g, '۲');
    str = str.replace(/3/g, '۳');
    str = str.replace(/4/g, '۴');
    str = str.replace(/5/g, '۵');
    str = str.replace(/6/g, '۶');
    str = str.replace(/7/g, '۷');
    str = str.replace(/8/g, '۸');
    str = str.replace(/9/g, '۹');
    return str;
  }

  arabicNumberToPersian(num: string): string {
    if (num == undefined) {
      return '';
    }
    let str = num.toString().trim();
    if (str === '') {
      return '';
    }
    str = str.replace(/٤/g, '۴');
    str = str.replace(/٥/g, '۵');
    str = str.replace(/٦/g, '۶');
    return str;
  }

  //////////////////////////////////////////////////////////////////////////
  //                              GENERAL                                 //
  //////////////////////////////////////////////////////////////////////////
  persianNumberToEng(num: string) {
    if (num == undefined) {
      return NaN;
    }
    let str = num.toString().trim();
    if (str === '') {
      return NaN;
    }
    str = str.replace(/۰/g, '0');
    str = str.replace(/۱/g, '1');
    str = str.replace(/۲/g, '2');
    str = str.replace(/۳/g, '3');
    str = str.replace(/۴/g, '4');
    str = str.replace(/۵/g, '5');
    str = str.replace(/۶/g, '6');
    str = str.replace(/۷/g, '7');
    str = str.replace(/۸/g, '8');
    str = str.replace(/۹/g, '9');
    return str;
  }

  checkConnection(): Observable<boolean> {
    return merge(
      fromEvent(this.document.defaultView, 'offline').pipe(map(() => false)),
      fromEvent(this.document.defaultView, 'online').pipe(map(() => true)),
    ).pipe(map(() => navigator.onLine));
  }

  deepClone(obj) {
    return JSON.parse(JSON.stringify(obj));
  }

  shallowClone(obj) {
    return Object.assign({}, obj);
  }

  getDirtyControls(
    form: UntypedFormGroup,
    type: 'object' | 'array' | 'names' = 'object'
  ): {} {
    const kv = Object.entries(form.controls).filter((val) => val[1].dirty);
    const result = {
      object: () =>
        kv.reduce(
          (accum, val) => Object.assign(accum, {[val[0]]: val[1].value}),
          {}
        ),
      array: () => kv.map((val) => val[1]),
      names: () => kv.map((val) => val[0])
    }[type]();
    return Object.assign(result, {id: form.get('id').value});
  }

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

  convertToTimeFormat(duration: number) {
    const hrs = Math.floor((duration / 3600));
    const mins = Math.floor(((duration % 3600) / 60));
    const secs = Math.floor(duration % 60);
    let result = '';
    if (hrs > 0) {
      result += '' + hrs + ':' + (mins < 10 ? '0' : '');
    }
    result += '' + mins + ':' + (secs < 10 ? '0' : '');
    result += '' + secs;
    return result;
  }

  checkConnectionState(callback: any) {
    const imageUrl = 'https://via.placeholder.com/2000x2000';
    const downloadSize = 4995374;
    let startTime;
    let endTime;
    const download = new Image();
    download.onload = () => {
      endTime = (new Date()).getTime();
      const duration = (endTime - startTime) / 1000;
      const bitsLoaded = downloadSize * 8;
      const speedBps = +(bitsLoaded / duration).toFixed(2);
      const speedKbps = +(speedBps / 1024).toFixed(2);
      const speedMbps = +(speedKbps / 1024).toFixed(2);
      callback(speedMbps);
    };
    startTime = (new Date()).getTime();
    const cacheBuster = '?nnn=' + startTime;
    download.src = imageUrl + cacheBuster;
  }

  checkOnlineState(): Observable<boolean> {
    return merge(
      fromEvent(this.document.defaultView, 'offline').pipe(map(() => false)),
      fromEvent(this.document.defaultView, 'online').pipe(map(() => true)),
      new Observable((observer: Observer<boolean>) => {
        observer.next(navigator.onLine);
        observer.complete();
      })
    );
  }

  disableBrowserBackButton() {
    history.pushState(null, null, location.href);
    this.location.onPopState(() => {
      history.pushState(null, null, location.href);
    });
  }

  toggleFullScreen(elem: any) {
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) {
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
      elem.msRequestFullscreen();
    }
  }
}

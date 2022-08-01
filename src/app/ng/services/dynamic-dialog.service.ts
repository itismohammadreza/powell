import {
  Injectable,
  ComponentFactoryResolver,
  ApplicationRef,
  Injector,
  Type,
  EmbeddedViewRef,
  ComponentRef
} from '@angular/core';
import {DynamicDialogComponent} from '@ng/components/dynamic-dialog/dynamic-dialog.component';
import {DynamicDialogConfig} from '@ng/components/dynamic-dialog/dynamic-dialog-config';
import {DynamicDialogRef} from '@ng/components/dynamic-dialog/dynamic-dialog-ref';
import {DynamicDialogInjector} from '@ng/components/dynamic-dialog/dynamic-dialog-injector';


@Injectable({
  providedIn: 'root'
})
export class DynamicDialogService {
  dialogComponentRef: ComponentRef<DynamicDialogComponent>;

  constructor(private componentFactoryResolver: ComponentFactoryResolver, private appRef: ApplicationRef, private injector: Injector) {
  }

  public open(componentType: Type<any>, config: DynamicDialogConfig) {
    const dialogRef = this.appendDialogComponentToBody(config);

    this.dialogComponentRef.instance.childComponentType = componentType;

    return dialogRef;
  }

  private appendDialogComponentToBody(config: DynamicDialogConfig) {
    const map = new WeakMap();
    map.set(DynamicDialogConfig, config);

    const dialogRef = new DynamicDialogRef();
    map.set(DynamicDialogRef, dialogRef);

    const sub = dialogRef.afterClosed.subscribe(() => {
      this.removeDialogComponentFromBody();
      sub.unsubscribe();
    });

    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(DynamicDialogComponent);
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
    const componentRef = componentFactory.create(new DynamicDialogInjector(this.injector, map));

    this.appRef.attachView(componentRef.hostView);

    const domElem = (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
    document.body.appendChild(domElem);

    this.dialogComponentRef = componentRef;

    this.dialogComponentRef.instance.onClose.subscribe(() => {
      this.removeDialogComponentFromBody();
    });

    return dialogRef;
  }

  private removeDialogComponentFromBody() {
    this.appRef.detachView(this.dialogComponentRef.hostView);
    this.dialogComponentRef.destroy();
  }
}

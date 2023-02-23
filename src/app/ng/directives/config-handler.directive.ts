import {Directive, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {ConfigService} from "@ng/services";
import {Subject, takeUntil} from "rxjs";

@Directive({
  selector: '[ngConfigHandler]'
})
export class ConfigHandlerDirective implements OnInit, OnDestroy {
  @Input() rtl: boolean;
  @Output() rtlChange = new EventEmitter();

  destroy$: Subject<any> = new Subject<any>()

  constructor(private configService: ConfigService) {
  }

  ngOnInit() {
    this.configService.configChange$.pipe(takeUntil(this.destroy$)).subscribe(res => {
      this.rtl = res.rtl;
      this.rtlChange.emit(this.rtl);
    })
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}

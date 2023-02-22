import {Directive, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ConfigService} from "@ng/services";

@Directive({
  selector: '[ngConfigHandler]'
})
export class ConfigHandlerDirective implements OnInit {
  @Input() rtl: boolean;
  @Output() rtlChange = new EventEmitter();

  constructor(private configService: ConfigService) {
  }

  ngOnInit() {
    this.configService.configChange$.subscribe(res => {
      this.rtl = res.rtl;
      this.rtlChange.emit(this.rtl);
    })
  }
}

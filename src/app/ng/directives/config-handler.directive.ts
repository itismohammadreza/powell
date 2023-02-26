import {Directive, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {ConfigService} from "@ng/services";
import {Subject, takeUntil} from "rxjs";
import {NgFixLabelPosition, NgLabelPosition} from "@ng/models/forms";
import {NgTheme} from "@ng/models/config";
import {NgSize} from "@ng/models/offset";
import {OverlayOptions} from "primeng/api";

@Directive({
  selector: '[ngConfigHandler]'
})
export class ConfigHandlerDirective implements OnInit, OnDestroy {
  @Input() rtl: boolean = this.configService.getConfig().rtl;
  @Output() rtlChange = new EventEmitter();
  @Input() fixLabelPos: NgFixLabelPosition = this.configService.getConfig().fixLabelPos;
  @Output() fixLabelPosChange = new EventEmitter();
  @Input() labelPos: NgLabelPosition = this.configService.getConfig().labelPos;
  @Output() labelPosChange = new EventEmitter();
  @Input() filled: boolean = this.configService.getConfig().filled;
  @Output() filledChange = new EventEmitter();
  @Input() inputSize: NgSize = this.configService.getConfig().inputSize;
  @Output() inputSizeChange = new EventEmitter();
  @Input() showRequiredStar: boolean = this.configService.getConfig().showRequiredStar;
  @Output() showRequiredStarChange = new EventEmitter();
  @Input() theme: NgTheme = this.configService.getConfig().theme;
  @Output() themeChange = new EventEmitter();
  @Input() ripple: boolean = this.configService.getConfig().ripple;
  @Output() rippleChange = new EventEmitter();
  @Input() overlayOptions: OverlayOptions = this.configService.getConfig().overlayOptions;
  @Output() overlayOptionsChange = new EventEmitter();

  @Input() disableConfigChangeEffect: boolean;
  @Output() configChange = new EventEmitter();

  destroy$: Subject<any> = new Subject<any>()

  constructor(private configService: ConfigService) {
  }

  ngOnInit() {
    if (this.disableConfigChangeEffect) {
      return
    }
    this.configService.configChange$.pipe(takeUntil(this.destroy$)).subscribe(({modifiedConfig, currentConfig}) => {
      const configs: string[] = [
        'rtl',
        'fixLabelPos',
        'labelPos',
        'filled',
        'inputSize',
        'showRequiredStar',
        'theme',
        'ripple',
        'overlayOptions',
      ]
      configs.forEach(config => {
        this[config] = currentConfig[config];
        if (modifiedConfig[config] != undefined) {
          this[`${config}Change`].emit(this[config]);
        }
      })
      this.configChange.emit({modifiedConfig, currentConfig})
    })
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}

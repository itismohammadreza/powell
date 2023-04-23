import {Directive, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges} from '@angular/core';
import {Subject, takeUntil} from "rxjs";
import {NgConfig, NgFixLabelPosition, NgLabelPosition, NgSize} from "@ng/models";
import {ConfigService} from "@ng/api";
import {Global} from "@core/config";

@Directive({
  selector: '[ngConfigHandler]'
})
export class ConfigHandlerDirective implements OnInit, OnChanges, OnDestroy {
  @Input() rtl: boolean;
  @Output() rtlChange = new EventEmitter();
  @Input() fixLabelPos: NgFixLabelPosition;
  @Output() fixLabelPosChange = new EventEmitter();
  @Input() labelPos: NgLabelPosition;
  @Output() labelPosChange = new EventEmitter();
  @Input() filled: boolean;
  @Output() filledChange = new EventEmitter();
  @Input() inputSize: NgSize;
  @Output() inputSizeChange = new EventEmitter();
  @Input() showRequiredStar: boolean;
  @Output() showRequiredStarChange = new EventEmitter();
  @Input() disableConfigChangeEffect: boolean;
  @Output() disableConfigChangeEffectChange = new EventEmitter();

  @Output() configChange = new EventEmitter();

  stopConfigSubscription$: Subject<any>;
  configService: ConfigService;

  constructor() {
    this.configService = Global.Injector.get(ConfigService);
  }

  ngOnInit() {
    // add initial configService value to above Inputs and then emit them to apply to components.
    this.applyConfig(this.configService.getConfig(), this.configService.getConfig())
    if (this.disableConfigChangeEffect) {
      return
    }
    this.startSubscription();
  }

  startSubscription() {
    this.stopConfigSubscription$ = new Subject<boolean>();
    this.configService.configChange$.pipe(takeUntil(this.stopConfigSubscription$)).subscribe(({modifiedConfig, currentConfig}) => {
      this.applyConfig(modifiedConfig, currentConfig);
      this.configChange.emit({modifiedConfig, currentConfig});
      if (currentConfig.disableConfigChangeEffect) {
        this.stopSubscription();
      }
    })
  }

  applyConfig(modifiedConfig: NgConfig, currentConfig: NgConfig) {
    const configs: (keyof NgConfig)[] = [
      'disableConfigChangeEffect',
      'rtl',
      'fixLabelPos',
      'labelPos',
      'filled',
      'inputSize',
      'showRequiredStar'
    ]
    configs.forEach(config => {
      this[config] = currentConfig[config];
      if (modifiedConfig[config] != undefined) {
        this[`${config}Change`].emit(this[config]);
      }
    })
  }

  ngOnChanges(changes: SimpleChanges) {
    const {firstChange = true, previousValue, currentValue} = changes.disableConfigChangeEffect || {};
    if (firstChange) {
      return
    }
    if (currentValue === true) {
      this.stopSubscription()
    } else if (currentValue === false && previousValue === true) {
      this.startSubscription()
    }
  }

  stopSubscription() {
    if (this.stopConfigSubscription$) {
      this.stopConfigSubscription$.next(true);
      this.stopConfigSubscription$.complete();
    }
  }

  ngOnDestroy() {
    this.stopSubscription();
  }
}

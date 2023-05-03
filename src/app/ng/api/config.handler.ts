import {Directive, EventEmitter, OnChanges, OnDestroy, OnInit, Output, SimpleChanges} from '@angular/core';
import {Subject, takeUntil} from "rxjs";
import {NgConfig} from "@ng/models";
import {ConfigService} from "@ng/api";
import {Global} from "@core/config";

@Directive({
  selector: '[configChange]',
  standalone: true
})
export class ConfigHandler implements OnInit, OnChanges, OnDestroy {
  @Output() configChange = new EventEmitter();

  stopConfigSubscription$: Subject<any>;
  destroy$ = new Subject<boolean>();
  configService: ConfigService;

  protected constructor() {
    this.configService = Global.Injector.get(ConfigService);
  }

  ngOnInit() {
    // add initial configService value to above Inputs and then emit them to apply to components.
    this.applyConfig(this.configService.getConfig(), this.configService.getConfig())
    if (this['disableConfigChangeEffect']) {
      return
    }
    this.startSubscription();
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

  ngOnDestroy() {
    this.stopSubscription();
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  startSubscription() {
    this.stopConfigSubscription$ = new Subject<boolean>();
    this.configService.configChange$.pipe(takeUntil(this.stopConfigSubscription$))
      .subscribe(({modifiedConfig, currentConfig}) => {
        this.applyConfig(modifiedConfig, currentConfig);
        this.configChange.emit({modifiedConfig, currentConfig});
        if (currentConfig.disableConfigChangeEffect) {
          this.stopSubscription();
        }
      })
  }

  stopSubscription() {
    if (this.stopConfigSubscription$) {
      this.stopConfigSubscription$.next(true);
      this.stopConfigSubscription$.complete();
    }
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
      this[config] = this[config] && currentConfig[config];
      // if (modifiedConfig[config] != undefined) {
      //   this[`${config}Change`]?.emit(this[config]);
      // }
    })
  }
}

import {
  ChangeDetectorRef,
  Directive,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';
import {Subject, takeUntil} from "rxjs";
import {NgFixLabelPosition, NgLabelPosition, NgSize, NgTheme} from "@ng/models";
import {ConfigService} from "@ng/api";
import {PrimeOverlayOptions} from "@ng/primeng/api";

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
  @Input() theme: NgTheme;
  @Output() themeChange = new EventEmitter();
  @Input() ripple: boolean;
  @Output() rippleChange = new EventEmitter();
  @Input() overlayOptions: PrimeOverlayOptions;
  @Output() overlayOptionsChange = new EventEmitter();
  @Input() disableConfigChangeEffect: boolean;
  @Output() disableConfigChangeEffectChange = new EventEmitter();

  @Output() configChange = new EventEmitter();

  destroy$: Subject<any>;

  constructor(private configService: ConfigService, private cd: ChangeDetectorRef) {
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
    this.destroy$ = new Subject<boolean>();
    this.configService.configChange$.pipe(takeUntil(this.destroy$)).subscribe(({modifiedConfig, currentConfig}) => {
      this.applyConfig(modifiedConfig, currentConfig);
      this.configChange.emit({modifiedConfig, currentConfig});
      if (currentConfig.disableConfigChangeEffect) {
        this.stopSubscription();
      }
    })
  }

  applyConfig(modifiedConfig, currentConfig) {
    const configs: string[] = [
      'disableConfigChangeEffect',
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
    this.cd.detectChanges();
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
    if (this.destroy$) {
      this.destroy$.next(true);
      this.destroy$.complete();
    }
  }

  ngOnDestroy() {
    this.stopSubscription();
  }
}

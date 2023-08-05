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
import {NgConfig, NgFixLabelPosition, NgLabelPosition, NgSize, NgTheme} from "@powell/models";
import {ConfigService} from "@powell/api";
import {PrimeOverlayOptions} from "@powell/primeng/api";

@Directive({
  selector: '[ngConfigHandler]'
})
export class ConfigHandlerDirective implements OnInit, OnChanges, OnDestroy {
  @Input() rtl: boolean;
  @Output() rtlChange = new EventEmitter<boolean>();
  @Input() fixLabelPos: NgFixLabelPosition;
  @Output() fixLabelPosChange = new EventEmitter<NgFixLabelPosition>();
  @Input() labelPos: NgLabelPosition;
  @Output() labelPosChange = new EventEmitter<NgLabelPosition>();
  @Input() filled: boolean;
  @Output() filledChange = new EventEmitter<boolean>();
  @Input() inputSize: NgSize;
  @Output() inputSizeChange = new EventEmitter<NgSize>();
  @Input() showRequiredStar: boolean;
  @Output() showRequiredStarChange = new EventEmitter<boolean>();
  @Input() theme: NgTheme;
  @Output() themeChange = new EventEmitter<NgTheme>();
  @Input() ripple: boolean;
  @Output() rippleChange = new EventEmitter<boolean>();
  @Input() overlayOptions: PrimeOverlayOptions;
  @Output() overlayOptionsChange = new EventEmitter<PrimeOverlayOptions>();
  @Input() disableConfigChangeEffect: boolean;
  @Output() disableConfigChangeEffectChange = new EventEmitter<boolean>();

  @Output() configChange = new EventEmitter<{ modifiedConfig: NgConfig, currentConfig:NgConfig }>();

  destroy$: Subject<any>;

  constructor(private configService: ConfigService, private cd: ChangeDetectorRef) {
  }

  ngOnInit() {
    // add initial configService value to above Inputs and then emit them to apply to components.
    if (this.disableConfigChangeEffect) {
      return
    }
    this.applyConfig(this.configService.getConfig(), this.configService.getConfig())
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

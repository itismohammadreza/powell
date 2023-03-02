import {Directive, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges} from '@angular/core';
import {ConfigService} from "@ng/services";
import {Subject, takeUntil} from "rxjs";
import {NgFixLabelPosition, NgLabelPosition} from "@ng/models/forms";
import {NgTheme} from "@ng/models/config";
import {NgSize} from "@ng/models/offset";
import {OverlayOptions} from "primeng/api";

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
  @Input() overlayOptions: OverlayOptions;
  @Output() overlayOptionsChange = new EventEmitter();
  @Input() disableConfigChangeEffect: boolean = this.configService.getConfig().disableConfigChangeEffect;
  @Output() disableConfigChangeEffectChange = new EventEmitter();

  @Output() configChange = new EventEmitter();

  destroy$: Subject<any>;

  constructor(private configService: ConfigService) {
  }

  ngOnInit() {
    if (this.disableConfigChangeEffect) {
      return
    }
    this.startSubscription();
  }

  startSubscription() {
    this.destroy$ = new Subject<any>();
    this.configService.configChange$.pipe(takeUntil(this.destroy$)).subscribe(({modifiedConfig, currentConfig}) => {
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
      this.configChange.emit({modifiedConfig, currentConfig})
      if (currentConfig.disableConfigChangeEffect) {
        this.stopSubscription();
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
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  ngOnDestroy() {
    this.stopSubscription();
  }
}

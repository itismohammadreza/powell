import {
  Component,
  ComponentRef,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
  Type,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {SelectComponent} from '@powell/components/select';
import {InputTextComponent} from '@powell/components/input-text';
import {CheckboxComponent} from '@powell/components/checkbox';
import {DestroyService, TranslationService} from "@core/utils";
import {takeUntil} from "rxjs";
import {ConfigService} from "@powell/api";
import {$DividerModule} from "@powell/primeng";
import {NgAddon} from "@powell/models";

export type OptionType =
  'iconPositions'
  | 'displayTypes'
  | 'appearances'
  | 'buttonLayouts'
  | 'keyFilters'
  | 'currencies'
  | 'currencyDisplays'
  | 'labelPositions'
  | 'orientations'
  | 'dropdownModes'
  | 'severities'
  | 'hourFormats'
  | 'views'
  | 'statuses'
  | 'imageTypes'
  | 'addons'
  | 'sizes'
  | 'colorFormats'
  | 'modes'
  | 'selectionModes'
  | 'datepickerSelectionModes'
  | 'numberModes'
  | 'fixLabelPositions'
  | 'defaultFocusTypes'
  | 'toastPositions'
  | 'toastSeverities'
  | 'dialogPositions'
  | 'pinchLimitZoomLevels'
  | 'pinchOverflows'
  | 'pinchDisableZoomControls'
  | 'pinchListeners'
  | 'variants'

export interface PreviewOption {
  field: string;
  value: boolean | string | number | RegExp | NgAddon;
  options?: OptionType;
}

@Component({
  selector: 'ng-preview-options',
  templateUrl: './preview-options.component.html',
  styleUrls: ['./preview-options.component.scss'],
  providers: [DestroyService],
  imports: [$DividerModule]
})
export class PreviewOptionsComponent implements OnInit {
  private translationService = inject(TranslationService);
  private configService = inject(ConfigService);
  private destroy$ = inject(DestroyService);

  @Input() options: PreviewOption[];
  @Output() optionChange = new EventEmitter<PreviewOption>();
  @ViewChild('firstRow', {static: true, read: ViewContainerRef}) firstRow: ViewContainerRef;
  @ViewChild('secondRow', {static: true, read: ViewContainerRef}) secondRow: ViewContainerRef;

  cmpRefs: ComponentRef<any>[] = [];

  ngOnInit() {
    const dropdownOptionsMap: Record<OptionType, any[]> = {
      iconPositions: ['left', 'right'],
      displayTypes: ['comma', 'chip'],
      appearances: ['basic', 'text', 'outlined', 'link'],
      buttonLayouts: ['stacked', 'horizontal', 'vertical'],
      keyFilters: [/.*/g, 'pint', 'int', 'pnum', 'num', 'hex', 'email', 'alpha', 'alphanum'],
      currencies: ['USD', 'EUR', 'IRR'],
      currencyDisplays: ['symbol', 'code', 'name'],
      labelPositions: ['fix-side', 'fix-top', 'float'],
      orientations: ['horizontal', 'vertical'],
      dropdownModes: ['blank', 'current'],
      severities: ['primary', 'secondary', 'success', 'info', 'warning', 'danger', 'help', 'contrast'],
      hourFormats: ['12', '24'],
      views: ['date', 'month', 'year'],
      statuses: ['none', 'success', 'info', 'warning', 'error', '403', '404', '500'],
      imageTypes: ['none', 'box1', 'box2', 'magnifier'],
      addons: ['none', 'before', 'after', 'both'],
      sizes: ['none', 'small', 'large'],
      colorFormats: ['hex', 'rgb', 'hsb'],
      modes: ['basic', 'advanced'],
      selectionModes: ['none', 'single', 'multiple', 'checkbox'],
      datepickerSelectionModes: ['single', 'multiple', 'range'],
      numberModes: ['decimal', 'currency'],
      fixLabelPositions: ['fix-side', 'fix-top'],
      defaultFocusTypes: ['none', 'accept', 'reject'],
      toastPositions: ['top-right', 'top-left', 'bottom-right', 'bottom-left', 'top-center', 'bottom-center', 'center'],
      toastSeverities: ["secondary", "success", "info", "warn", "error", "contrast"],
      dialogPositions: ['top', 'bottom', 'left', 'right', 'topleft', 'topright', 'bottomleft', 'bottomright', 'center'],
      pinchLimitZoomLevels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 20, 30, 40, 'original image size'],
      pinchOverflows: ['hidden', 'visible'],
      pinchDisableZoomControls: ['disable', 'never', 'auto'],
      pinchListeners: ['auto', 'mouse and touch'],
      variants: ['outlined', 'filled'],
    }
    for (const item of this.options) {
      const {options, value} = item;
      if (options) {
        const cmpRef = this.createComponent(SelectComponent, item, 'firstRow');
        cmpRef.instance.options = dropdownOptionsMap[options].map(v => ({label: v, value: v}));
      } else if (typeof value === 'string' || typeof value === 'number') {
        this.createComponent(InputTextComponent, item, 'firstRow');
      } else if (typeof value === 'boolean') {
        this.createComponent(CheckboxComponent, item, 'secondRow');
      }
    }

    this.configService.configChange$.subscribe(({modifiedConfig, currentConfig}) => {
      const followConfig = this.options.find(item => item.field === 'followConfig').value;
      if (!followConfig) {
        return
      }
      Object.entries(modifiedConfig).forEach(([key, value]) => {
        const ref = this.cmpRefs.find(({instance}) => instance.key == key);
        if (ref) {
          ref.instance.value = value;
        }
      })
    })
  }

  createComponent(cmp: Type<any>, previewOption: PreviewOption, row: 'firstRow' | 'secondRow') {
    const globalConfig = this.configService.get();
    const {field, value} = previewOption;
    const cmpRef = this[row].createComponent(cmp);
    cmpRef.instance.label = this.translationService.instant(field);
    cmpRef.instance.labelWidth = 130;
    cmpRef.instance.value = value;
    cmpRef.instance.labelPos = globalConfig.labelPos;
    cmpRef.instance.rtl = globalConfig.rtl;
    cmpRef.instance.variant = globalConfig.inputStyle;
    cmpRef.instance.size = globalConfig.inputSize;
    this.translationService.stream(field).pipe(takeUntil(this.destroy$)).subscribe(res => {
      cmpRef.instance.label = res;
    })
    switch (cmp) {
      case SelectComponent:
        if (field === 'addon') {
          cmpRef.instance.onChange.pipe(takeUntil(this.destroy$)).subscribe(event => {
            switch (event.value) {
              case 'none':
                this.optionChange.emit({field: 'addon', value: null})
                break;
              case 'before':
                this.optionChange.emit({
                  field: 'addon',
                  value: {
                    before: {
                      type: 'icon',
                      icon: 'pi pi-home',
                      onClick: () => alert('icon clicked!')
                    }
                  }
                })
                break;
              case 'after':
                this.optionChange.emit({
                  field: 'addon',
                  value: {
                    after: {
                      type: 'button',
                      label: 'home',
                      onClick: () => alert('button clicked!')
                    }
                  }
                })
                break;
              case 'both':
                this.optionChange.emit({
                  field: 'addon',
                  value: {
                    before: {type: 'icon', icon: 'pi pi-home', onClick: () => alert('icon clicked!')},
                    after: {type: 'button', label: 'home', onClick: () => alert('button clicked!')},
                  }
                })
                break;
            }
          });
          cmpRef.instance.value = 'none';
          break;
        }
        cmpRef.instance.onChange.pipe(takeUntil(this.destroy$)).subscribe(event => {
          this.optionChange.emit({field, value: event.value == 'none' ? null : event.value});
        });
        break;
      case InputTextComponent:
        cmpRef.instance.onInput.pipe(takeUntil(this.destroy$)).subscribe(event => {
          this.optionChange.emit({field, value: event.target.value});
        });
        break;
      case CheckboxComponent:
        cmpRef.instance.onChange.pipe(takeUntil(this.destroy$)).subscribe(event => {
          this.optionChange.emit({field, value: event.checked});
        });
        break;
    }
    this.cmpRefs.push(cmpRef);
    return cmpRef;
  }
}

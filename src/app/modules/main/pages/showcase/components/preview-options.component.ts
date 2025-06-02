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

export type OptionType =
  'positions'
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
  | 'iconDisplayTypes'
  | 'additions'
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
  value: any;
  selectOptions?: OptionType;
}

@Component({
  selector: 'preview-options',
  template: `
    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
      <ng-container #firstRow/>
      <p-divider class="md:col-span-2 lg:col-span-3"/>
      <ng-container #secondRow/>
    </div>
  `,
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
      positions: ['top', 'bottom', 'left', 'right'],
      displayTypes: ['comma', 'chip'],
      appearances: ['basic', 'text', 'outlined', 'link'],
      buttonLayouts: ['stacked', 'horizontal', 'vertical'],
      keyFilters: [/.*/g, 'pint', 'int', 'pnum', 'num', 'hex', 'email', 'alpha', 'alphanum'],
      currencies: ['USD', 'EUR', 'IRR'],
      currencyDisplays: ['symbol', 'code', 'name'],
      labelPositions: ['ifta', 'float-in', 'float-on', 'float-over', 'side', 'top'],
      orientations: ['horizontal', 'vertical'],
      dropdownModes: ['blank', 'current'],
      severities: ['primary', 'secondary', 'success', 'info', 'warning', 'danger', 'help', 'contrast'],
      hourFormats: ['12', '24'],
      views: ['date', 'month', 'year'],
      statuses: ['none', 'success', 'info', 'warning', 'error', '403', '404', '500'],
      imageTypes: ['none', 'box1', 'box2', 'magnifier'],
      iconDisplayTypes: ['input', 'button'],
      additions: ['none', 'iconStart', 'iconEnd', 'iconBoth', 'addonStart', 'addonEnd', 'addonBoth'],
      sizes: ['none', 'small', 'large'],
      colorFormats: ['hex', 'rgb', 'hsb'],
      modes: ['basic', 'advanced'],
      selectionModes: ['none', 'single', 'multiple', 'checkbox'],
      datepickerSelectionModes: ['single', 'multiple', 'range'],
      numberModes: ['decimal', 'currency'],
      fixLabelPositions: ['side', 'top'],
      defaultFocusTypes: ['none', 'accept', 'reject', 'close'],
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
      const {selectOptions, value} = item;
      if (selectOptions) {
        const cmpRef = this.createComponent(SelectComponent, item, 'firstRow');
        cmpRef.instance.options = dropdownOptionsMap[selectOptions].map(v => ({label: v, value: v}));
      } else if (typeof value === 'string' || typeof value === 'number') {
        this.createComponent(InputTextComponent, item, 'firstRow');
      } else if (typeof value === 'boolean') {
        this.createComponent(CheckboxComponent, item, 'secondRow');
      }
    }

    this.configService.configChange$.subscribe(({modifiedConfig, currentConfig}) => {
      const followConfig = this.options.find(item => item.field === 'followConfig')?.value;
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
    cmpRef.instance.fluid = true;
    cmpRef.instance.value = value;
    cmpRef.instance.labelPosition = globalConfig.labelPosition;
    cmpRef.instance.rtl = globalConfig.rtl;
    cmpRef.instance.variant = globalConfig.inputStyle;
    cmpRef.instance.size = globalConfig.inputSize;
    this.translationService.stream(field).pipe(takeUntil(this.destroy$)).subscribe(res => {
      cmpRef.instance.label = res;
    })
    switch (cmp) {
      case SelectComponent:
        cmpRef.instance.onChange.pipe(takeUntil(this.destroy$)).subscribe(event => {
          this.optionChange.emit({field, value: event.value == 'none' ? null : event.value});
        });
        if (value === undefined || value === null) {
          cmpRef.instance.value = 'none';
        }
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

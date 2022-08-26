import {Component, EventEmitter, Input, OnInit, Output, Type, ViewChild, ViewContainerRef} from '@angular/core';
import {
  NgAddon,
  NgColorFormat,
  NgCurrency,
  NgCurrencyDisplay,
  NgInputFileMode,
  NgInputTypes,
  NgKeyFilter,
  NgLabelPosition,
  NgNumberButtonLayout,
  NgNumberMode
} from '@ng/models/forms';
import {NgOrientation, NgPosition, NgSize} from '@ng/models/offset';
import {NgColor} from '@ng/models/color';
import {DropdownComponent} from '@ng/components/dropdown/dropdown.component';
import {InputTextComponent} from '@ng/components/input-text/input-text.component';
import {SingleCheckboxComponent} from '@ng/components/single-checkbox/single-checkbox.component';
import {NgButtonAppearance} from '@ng/models/button';

type PreviewItem =
  | 'label'
  | 'filled'
  | 'labelWidth'
  | 'hint'
  | 'rtl'
  | 'icon'
  | 'labelPos'
  | 'iconPos'
  | 'scrollHeight'
  | 'dropdown'
  | 'multiple'
  | 'minlength'
  | 'placeholder'
  | 'readonly'
  | 'disabled'
  | 'maxlength'
  | 'showEmptyMessage'
  | 'emptyMessage'
  | 'forceSelection'
  | 'unique'
  | 'showClear'
  | 'full'
  | 'badge'
  | 'rounded'
  | 'raised'
  | 'appearance'
  | 'color'
  | 'newLabel'
  | 'newColor'
  | 'badgeColor'
  | 'max'
  | 'allowDuplicate'
  | 'addOnTab'
  | 'addOnBlur'
  | 'inline'
  | 'filter'
  | 'emptyFilterMessage'
  | 'editable'
  | 'autofocusFilter'
  | 'resetFilterOnHide'
  | 'autoDisplayFirst'
  | 'accept'
  | 'auto'
  | 'maxFileSize'
  | 'fileLimit'
  | 'previewWidth'
  | 'chooseLabel'
  | 'uploadLabel'
  | 'cancelLabel'
  | 'chooseIcon'
  | 'uploadIcon'
  | 'cancelIcon'
  | 'showUploadButton'
  | 'showCancelButton'
  | 'numVisible'
  | 'showItemNavigators'
  | 'showThumbnailNavigators'
  | 'showItemNavigatorsOnHover'
  | 'changeItemOnIndicatorHover'
  | 'circular'
  | 'autoPlay'
  | 'transitionInterval'
  | 'showThumbnails'
  | 'thumbnailsPosition'
  | 'verticalThumbnailViewPortHeight'
  | 'showIndicators'
  | 'showIndicatorsOnItem'
  | 'indicatorsPosition'
  | 'mask'
  | 'slotChar'
  | 'autoClear'
  | 'unmask'
  | 'characterPattern'
  | 'showButtons'
  | 'buttonLayout'
  | 'prefix'
  | 'suffix'
  | 'currency'
  | 'currencyDisplay'
  | 'useGrouping'
  | 'min'
  | 'step'
  | 'allowEmpty'
  | 'promptLabel'
  | 'weakLabel'
  | 'mediumLabel'
  | 'strongLabel'
  | 'feedback'
  | 'toggleMask'
  | 'type'
  | 'keyFilter'
  | 'rows'
  | 'cols'
  | 'autoResize'
  | 'valueColor'
  | 'rangeColor'
  | 'textColor'
  | 'strokeWidth'
  | 'showValue'
  | 'valueTemplate'
  | 'checkbox'
  | 'filterPlaceHolder'
  | 'showToggleAll'
  | 'orientation'
  | 'defaultLabel'
  | 'displaySelectedLabel'
  | 'maxSelectedLabels'
  | 'options'
  | 'overlayVisible'
  | 'selectedItemsLabel'
  | 'selectionLimit'
  | 'showHeader'
  | 'display'
  | 'stars'
  | 'cancel'
  | 'iconOnClass'
  | 'iconOffClass'
  | 'iconCancelClass'
  | 'animate'
  | 'range'
  | 'onLabel'
  | 'offLabel'
  | 'onIcon'
  | 'offIcon'
  | 'selectiveSize'
  | 'numericSize'
  | 'colorFormat'
  | 'enableFormat'
  | 'inputFileMode'
  | 'numberMode'
  | 'addon';

@Component({
  selector: 'ng-preview-options',
  templateUrl: './preview-options.component.html',
  styleUrls: ['./preview-options.component.scss']
})

export class PreviewOptionsComponent implements OnInit {
  @Input() label: string;
  @Output() labelChange = new EventEmitter()
  @Input() filled: boolean;
  @Output() filledChange = new EventEmitter()
  @Input() labelWidth: number;
  @Output() labelWidthChange = new EventEmitter()
  @Input() hint: string;
  @Output() hintChange = new EventEmitter()
  @Input() rtl: boolean;
  @Output() rtlChange = new EventEmitter()
  @Input() icon: string;
  @Output() iconChange = new EventEmitter()
  @Input() labelPos: NgLabelPosition;
  @Output() labelPosChange = new EventEmitter()
  @Input() iconPos: NgPosition;
  @Output() iconPosChange = new EventEmitter()
  @Input() scrollHeight: string;
  @Output() scrollHeightChange = new EventEmitter()
  @Input() dropdown: boolean;
  @Output() dropdownChange = new EventEmitter()
  @Input() multiple: boolean;
  @Output() multipleChange = new EventEmitter()
  @Input() minlength: number;
  @Output() minlengthChange = new EventEmitter()
  @Input() placeholder: string;
  @Output() placeholderChange = new EventEmitter()
  @Input() readonly: boolean;
  @Output() readonlyChange = new EventEmitter()
  @Input() disabled: boolean;
  @Output() disabledChange = new EventEmitter()
  @Input() maxlength: number;
  @Output() maxlengthChange = new EventEmitter()
  @Input() showEmptyMessage: boolean;
  @Output() showEmptyMessageChange = new EventEmitter()
  @Input() emptyMessage: string;
  @Output() emptyMessageChange = new EventEmitter()
  @Input() forceSelection: boolean;
  @Output() forceSelectionChange = new EventEmitter()
  @Input() unique: boolean;
  @Output() uniqueChange = new EventEmitter()
  @Input() showClear: boolean;
  @Output() showClearChange = new EventEmitter()
  @Input() full: boolean;
  @Output() fullChange = new EventEmitter()
  @Input() badge: string;
  @Output() badgeChange = new EventEmitter()
  @Input() rounded: boolean;
  @Output() roundedChange = new EventEmitter()
  @Input() raised: boolean;
  @Output() raisedChange = new EventEmitter()
  @Input() appearance: NgButtonAppearance;
  @Output() appearanceChange = new EventEmitter()
  @Input() color: NgColor;
  @Output() colorChange = new EventEmitter()
  @Input() newLabel: string;
  @Output() newLabelChange = new EventEmitter()
  @Input() newColor: string;
  @Output() newColorChange = new EventEmitter()
  @Input() badgeColor: NgColor;
  @Output() badgeColorChange = new EventEmitter()
  @Input() max: number;
  @Output() maxChange = new EventEmitter()
  @Input() allowDuplicate: boolean;
  @Output() allowDuplicateChange = new EventEmitter()
  @Input() addOnTab: boolean;
  @Output() addOnTabChange = new EventEmitter()
  @Input() addOnBlur: boolean;
  @Output() addOnBlurChange = new EventEmitter()
  @Input() inline: boolean;
  @Output() inlineChange = new EventEmitter()
  @Input() filter: boolean;
  @Output() filterChange = new EventEmitter()
  @Input() emptyFilterMessage: string;
  @Output() emptyFilterMessageChange = new EventEmitter()
  @Input() editable: boolean;
  @Output() editableChange = new EventEmitter()
  @Input() autofocusFilter: boolean;
  @Output() autofocusFilterChange = new EventEmitter()
  @Input() resetFilterOnHide: boolean;
  @Output() resetFilterOnHideChange = new EventEmitter()
  @Input() autoDisplayFirst: boolean;
  @Output() autoDisplayFirstChange = new EventEmitter()
  @Input() accept: string;
  @Output() acceptChange = new EventEmitter()
  @Input() auto: boolean;
  @Output() autoChange = new EventEmitter()
  @Input() maxFileSize: number;
  @Output() maxFileSizeChange = new EventEmitter()
  @Input() fileLimit: number;
  @Output() fileLimitChange = new EventEmitter()
  @Input() previewWidth: number;
  @Output() previewWidthChange = new EventEmitter()
  @Input() chooseLabel: string;
  @Output() chooseLabelChange = new EventEmitter()
  @Input() uploadLabel: string;
  @Output() uploadLabelChange = new EventEmitter()
  @Input() cancelLabel: string;
  @Output() cancelLabelChange = new EventEmitter()
  @Input() chooseIcon: string;
  @Output() chooseIconChange = new EventEmitter()
  @Input() uploadIcon: string;
  @Output() uploadIconChange = new EventEmitter()
  @Input() cancelIcon: string;
  @Output() cancelIconChange = new EventEmitter()
  @Input() showUploadButton: boolean;
  @Output() showUploadButtonChange = new EventEmitter()
  @Input() showCancelButton: boolean;
  @Output() showCancelButtonChange = new EventEmitter()
  @Input() numVisible: number;
  @Output() numVisibleChange = new EventEmitter()
  @Input() showItemNavigators: boolean;
  @Output() showItemNavigatorsChange = new EventEmitter()
  @Input() showThumbnailNavigators: boolean;
  @Output() showThumbnailNavigatorsChange = new EventEmitter()
  @Input() showItemNavigatorsOnHover: boolean;
  @Output() showItemNavigatorsOnHoverChange = new EventEmitter()
  @Input() changeItemOnIndicatorHover: boolean;
  @Output() changeItemOnIndicatorHoverChange = new EventEmitter()
  @Input() circular: boolean;
  @Output() circularChange = new EventEmitter()
  @Input() autoPlay: boolean;
  @Output() autoPlayChange = new EventEmitter()
  @Input() transitionInterval: number;
  @Output() transitionIntervalChange = new EventEmitter()
  @Input() showThumbnails: boolean;
  @Output() showThumbnailsChange = new EventEmitter()
  @Input() thumbnailsPosition: string;
  @Output() thumbnailsPositionChange = new EventEmitter()
  @Input() verticalThumbnailViewPortHeight: string;
  @Output() verticalThumbnailViewPortHeightChange = new EventEmitter()
  @Input() showIndicators: boolean;
  @Output() showIndicatorsChange = new EventEmitter()
  @Input() showIndicatorsOnItem: boolean;
  @Output() showIndicatorsOnItemChange = new EventEmitter()
  @Input() indicatorsPosition: string;
  @Output() indicatorsPositionChange = new EventEmitter()
  @Input() mask: string;
  @Output() maskChange = new EventEmitter()
  @Input() slotChar: string;
  @Output() slotCharChange = new EventEmitter()
  @Input() autoClear: boolean;
  @Output() autoClearChange = new EventEmitter()
  @Input() unmask: boolean;
  @Output() unmaskChange = new EventEmitter()
  @Input() characterPattern: string;
  @Output() characterPatternChange = new EventEmitter()
  @Input() showButtons: boolean;
  @Output() showButtonsChange = new EventEmitter()
  @Input() buttonLayout: NgNumberButtonLayout;
  @Output() buttonLayoutChange = new EventEmitter()
  @Input() prefix: string;
  @Output() prefixChange = new EventEmitter()
  @Input() suffix: string;
  @Output() suffixChange = new EventEmitter()
  @Input() currency: NgCurrency;
  @Output() currencyChange = new EventEmitter()
  @Input() currencyDisplay: NgCurrencyDisplay;
  @Output() currencyDisplayChange = new EventEmitter()
  @Input() useGrouping: boolean;
  @Output() useGroupingChange = new EventEmitter()
  @Input() min: number;
  @Output() minChange = new EventEmitter()
  @Input() step: number;
  @Output() stepChange = new EventEmitter()
  @Input() allowEmpty: boolean;
  @Output() allowEmptyChange = new EventEmitter()
  @Input() promptLabel: string;
  @Output() promptLabelChange = new EventEmitter()
  @Input() weakLabel: string;
  @Output() weakLabelChange = new EventEmitter()
  @Input() mediumLabel: string;
  @Output() mediumLabelChange = new EventEmitter()
  @Input() strongLabel: string;
  @Output() strongLabelChange = new EventEmitter()
  @Input() feedback: boolean;
  @Output() feedbackChange = new EventEmitter()
  @Input() toggleMask: boolean;
  @Output() toggleMaskChange = new EventEmitter()
  @Input() type: NgInputTypes;
  @Output() typeChange = new EventEmitter()
  @Input() keyFilter: NgKeyFilter;
  @Output() keyFilterChange = new EventEmitter()
  @Input() rows: number;
  @Output() rowsChange = new EventEmitter()
  @Input() cols: number;
  @Output() colsChange = new EventEmitter()
  @Input() autoResize: boolean;
  @Output() autoResizeChange = new EventEmitter()
  @Input() valueColor: string;
  @Output() valueColorChange = new EventEmitter()
  @Input() rangeColor: string;
  @Output() rangeColorChange = new EventEmitter()
  @Input() textColor: string;
  @Output() textColorChange = new EventEmitter()
  @Input() strokeWidth: number;
  @Output() strokeWidthChange = new EventEmitter()
  @Input() showValue: boolean;
  @Output() showValueChange = new EventEmitter()
  @Input() valueTemplate: string;
  @Output() valueTemplateChange = new EventEmitter()
  @Input() checkbox: boolean;
  @Output() checkboxChange = new EventEmitter()
  @Input() filterPlaceHolder: string;
  @Output() filterPlaceHolderChange = new EventEmitter()
  @Input() showToggleAll: boolean;
  @Output() showToggleAllChange = new EventEmitter()
  @Input() orientation: NgOrientation;
  @Output() orientationChange = new EventEmitter()
  @Input() defaultLabel: string;
  @Output() defaultLabelChange = new EventEmitter()
  @Input() displaySelectedLabel: boolean;
  @Output() displaySelectedLabelChange = new EventEmitter()
  @Input() maxSelectedLabels: number;
  @Output() maxSelectedLabelsChange = new EventEmitter()
  @Input() overlayVisible: boolean;
  @Output() overlayVisibleChange = new EventEmitter()
  @Input() selectedItemsLabel: string;
  @Output() selectedItemsLabelChange = new EventEmitter()
  @Input() selectionLimit: number;
  @Output() selectionLimitChange = new EventEmitter()
  @Input() showHeader: boolean;
  @Output() showHeaderChange = new EventEmitter()
  @Input() display: string;
  @Output() displayChange = new EventEmitter()
  @Input() stars: number;
  @Output() starsChange = new EventEmitter()
  @Input() cancel: boolean;
  @Output() cancelChange = new EventEmitter()
  @Input() iconOnClass: string;
  @Output() iconOnClassChange = new EventEmitter()
  @Input() iconOffClass: string;
  @Output() iconOffClassChange = new EventEmitter()
  @Input() iconCancelClass: string;
  @Output() iconCancelClassChange = new EventEmitter()
  @Input() animate: boolean;
  @Output() animateChange = new EventEmitter()
  @Input() range: boolean;
  @Output() rangeChange = new EventEmitter()
  @Input() onLabel: string;
  @Output() onLabelChange = new EventEmitter()
  @Input() offLabel: string;
  @Output() offLabelChange = new EventEmitter()
  @Input() onIcon: string;
  @Output() onIconChange = new EventEmitter()
  @Input() offIcon: string;
  @Output() offIconChange = new EventEmitter()
  @Input() addon: NgAddon;
  @Output() addonChange = new EventEmitter()
  // instead of 'size' & 'inputSize'
  @Input() selectiveSize: NgSize;
  @Output() selectiveSizeChange = new EventEmitter()
  // instead of 'size'
  @Input() numericSize: number;
  @Output() numericSizeChange = new EventEmitter()
  // instead of 'format'
  @Input() colorFormat: NgColorFormat;
  @Output() colorFormatChange = new EventEmitter()
  // instead of 'format'
  @Input() enableFormat: boolean;
  @Output() enableFormatChange = new EventEmitter()
  // instead of 'mode'
  @Input() inputFileMode: NgInputFileMode;
  @Output() inputFileModeChange = new EventEmitter()
  // instead of 'mode'
  @Input() numberMode: NgNumberMode;
  @Output() numberModeChange = new EventEmitter()

  @ViewChild('firstRow', {static: true, read: ViewContainerRef}) firstRow: ViewContainerRef;
  @ViewChild('secondRow', {static: true, read: ViewContainerRef}) secondRow: ViewContainerRef;

  @Input() previewItems: PreviewItem[]

  ngOnInit(): void {
    const dropdownData = {
      iconPos: ['left', 'right', 'top', 'bottom', 'top-right', 'top-left', 'bottom-right', 'bottom-left', 'top-center', 'bottom-center', 'center'],
      appearance: ['basic', 'text', 'outlined', 'link'],
      resultType: ['base64', 'file'],
      datePickerMode: ['day', 'month', 'time', 'daytime'],
      buttonLayout: ['stacked', 'horizontal', 'vertical'],
      keyFilter: ['pint', 'int', 'pnum', 'num', 'hex', 'email', 'alpha', 'alphanum'],
      currency: ['USD', 'EUR', 'IRR'],
      currencyDisplay: ['symbol', 'code', 'name'],
      tooltipPosition: ['left', 'right', 'top', 'bottom', 'top-right', 'top-left', 'bottom-right', 'bottom-left', 'top-center', 'bottom-center', 'center'],
      orientation: ['horizontal', 'vertical'],
      labelPos: ['fix-side', 'fix-top', 'float'],
      selectionMode: ['single', 'multiple', 'checkbox'],
      layout: ['horizontal', 'vertical'],
      dropdownMode: ['blank', 'current'],
      color: ['secondary', 'success', 'info', 'warning', 'danger', 'help', 'primary'],
      badgeColor: ['secondary', 'success', 'info', 'warning', 'danger', 'help', 'primary'],
      inputFileMode: ['basic', 'advanced'],
      selectiveSize: ['sm', 'md', 'lg'],
      colorFormat: ['hex', 'rgb', 'hsb'],
      numberMode: ['decimal', 'currency'],
      addon: ['none', 'before', 'after', 'both'],
    };
    for (const item of this.previewItems) {
      if (Object.keys(dropdownData).includes(item)) {
        const cmpRef = this.createComponent(DropdownComponent, item, 'firstRow');
        cmpRef.instance.options = dropdownData[item].map(v => ({label: v, value: v}));
      } else if (typeof this[item] === 'string' || typeof this[item] === 'number') {
        this.createComponent(InputTextComponent, item, 'firstRow');
      } else if (typeof this[item] === 'boolean') {
        this.createComponent(SingleCheckboxComponent, item, 'secondRow');
      }
    }
  }

  private createComponent(cmp: Type<any>, previewItem: string, row: 'firstRow' | 'secondRow') {
    const cmpRef = this[row].createComponent(cmp);
    cmpRef.location.nativeElement.classList.add('col-md-3');
    cmpRef.instance.label = previewItem;
    cmpRef.instance.value = this[previewItem];
    switch (cmp) {
      case DropdownComponent:
        cmpRef.location.nativeElement.classList.add('mb-3');
        if (previewItem == 'addon') {
          cmpRef.instance.onChange.subscribe(val => {
            switch (val.value) {
              case 'none':
                this.addonChange.emit(null)
                break;
              case 'before':
                this.addonChange.emit({before: {type: 'icon', icon: 'pi pi-home'}})
                break;
              case 'after':
                this.addonChange.emit({after: {type: 'button', label: 'home'}})
                break;
              case 'both':
                this.addonChange.emit({
                  before: {type: 'icon', icon: 'pi pi-home'},
                  after: {type: 'button', label: 'home'}
                })
                break;
            }
          });
          break;
        }
        cmpRef.instance.onChange.subscribe(val => {
          this[`${previewItem}Change`].next(val.value);
        });
        break;
      case InputTextComponent:
        cmpRef.location.nativeElement.classList.add('mb-3');
        cmpRef.instance.onInput.subscribe(val => {
          this[`${previewItem}Change`].next(val.target.value);
        });
        break;
      case SingleCheckboxComponent:
        cmpRef.instance.onChange.subscribe(val => {
          this[`${previewItem}Change`].next(val.checked);
        });
        break;
    }
    return cmpRef;
  }
}

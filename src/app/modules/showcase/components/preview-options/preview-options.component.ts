import {Component, EventEmitter, Input, OnInit, Output, Type, ViewChild, ViewContainerRef} from '@angular/core';
import {
  NgColorFormat,
  NgCurrency,
  NgCurrencyDisplay,
  NgDatePickerMode,
  NgInputFileMode,
  NgKeyFilter,
  NgLabelPosition,
  NgNumberButtonLayout,
  NgNumberMode
} from '@ng/models/forms';
import {NgOrientation, NgPosition, NgSelectionMode, NgSize} from '@ng/models/offset';
import {NgColor} from '@ng/models/color';
import {DropdownComponent} from '@ng/components/dropdown/dropdown.component';
import {InputTextComponent} from '@ng/components/input-text/input-text.component';
import {SingleCheckboxComponent} from '@ng/components/single-checkbox/single-checkbox.component';
import {NgButtonAppearance} from '@ng/models/button';

type PreviewItem =
  'badge' |
  'chooseLabel' |
  'uploadLabel' |
  'cancelLabel' |
  'invalidFileSizeMessageSummary' |
  'invalidFileSizeMessageDetail' |
  'invalidFileTypeMessageSummary' |
  'invalidFileLimitMessageDetail' |
  'invalidFileLimitMessageSummary' |
  'invalidFileTypeMessageDetail' |
  'mask' |
  'slotChar' |
  'characterPattern' |
  'incrementButtonIcon' |
  'decrementButtonIcon' |
  'prefix' |
  'suffix' |
  'promptLabel' |
  'weakLabel' |
  'mediumLabel' |
  'strongLabel' |
  'icon' |
  'defaultLabel' |
  'emptyFilterMessage' |
  'filterPlaceHolder' |
  'placeholder' |
  'selectedItemsLabel' |
  'tooltip' |
  'iconOnClass' |
  'iconOffClass' |
  'iconCancelClass' |
  'onLabel' |
  'offLabel' |
  'onIcon' |
  'offIcon' |
  'label' |
  'hint' |
  'emptyMessage' |
  'filterPlaceholder' |
  'scrollHeight' |
  'minlength' |
  'maxFileSize' |
  'previewWidth' |
  'fileLimit' |
  'minFractionDigits' |
  'maxFractionDigits' |
  'rows' |
  'cols' |
  'maxlength' |
  'maxSelectedLabels' |
  'selectionLimit' |
  'stars' |
  'min' |
  'max' |
  'step' |
  'labelWidth' |
  'indentation' |
  'size' |
  'rounded' |
  'raised' |
  'full' |
  'dropdown' |
  'unique' |
  'allowDuplicate' |
  'addOnTab' |
  'addOnBlur' |
  'inline' |
  'clearable' |
  'editable' |
  'autoDisplayFirst' |
  'showClear' |
  'auto' |
  'showUploadButton' |
  'showCancelButton' |
  'displaySelectedLabel' |
  'autoClear' |
  'unmask' |
  'showButtons' |
  'feedback' |
  'toggleMask' |
  'autoResize' |
  'checkbox' |
  'filled' |
  'overlayVisible' |
  'resetFilterOnHide' |
  'showHeader' |
  'showToggleAll' |
  'cancel' |
  'multiple' |
  'binary' |
  'range' |
  'disabled' |
  'readonly' |
  'rtl' |
  'showRequiredStar' |
  'propagateSelectionUp' |
  'propagateSelectionDown' |
  'filter' |
  'showImagePreview' |
  'dropdownMode' |
  'resultType' |
  'datePickerMode' |
  'format' |
  'buttonLayout' |
  'numberMode' |
  'filePickerMode' |
  'currency' |
  'currencyDisplay' |
  'tooltipPosition' |
  'orientation' |
  'iconPos' |
  'labelPos' |
  'selectionMode' |
  'layout' |
  'keyFilter' |
  'color' |
  'appearance' |
  'newColor' |
  'newLabel' |
  'selectiveSize' |
  'badgeColor';

@Component({
  selector: 'ng-preview-options',
  templateUrl: './preview-options.component.html',
  styleUrls: ['./preview-options.component.scss']
})

export class PreviewOptionsComponent implements OnInit {

  @ViewChild('firstRow', {static: true, read: ViewContainerRef}) firstRow: ViewContainerRef;
  @ViewChild('secondRow', {static: true, read: ViewContainerRef}) secondRow: ViewContainerRef;

  @Input() badge: string;
  @Output() badgeChange = new EventEmitter();
  @Input() chooseLabel: string;
  @Output() chooseLabelChange = new EventEmitter();
  @Input() uploadLabel: string;
  @Output() uploadLabelChange = new EventEmitter();
  @Input() cancelLabel: string;
  @Output() cancelLabelChange = new EventEmitter();
  @Input() invalidFileSizeMessageSummary: string;
  @Output() invalidFileSizeMessageSummaryChange = new EventEmitter();
  @Input() invalidFileSizeMessageDetail: string;
  @Output() invalidFileSizeMessageDetailChange = new EventEmitter();
  @Input() invalidFileTypeMessageSummary: string;
  @Output() invalidFileTypeMessageSummaryChange = new EventEmitter();
  @Input() invalidFileLimitMessageDetail: string;
  @Output() invalidFileLimitMessageDetailChange = new EventEmitter();
  @Input() invalidFileLimitMessageSummary: string;
  @Output() invalidFileLimitMessageSummaryChange = new EventEmitter();
  @Input() invalidFileTypeMessageDetail: string;
  @Output() invalidFileTypeMessageDetailChange = new EventEmitter();
  @Input() mask: string;
  @Output() maskChange = new EventEmitter();
  @Input() slotChar: string;
  @Output() slotCharChange = new EventEmitter();
  @Input() characterPattern: string;
  @Output() characterPatternChange = new EventEmitter();
  @Input() incrementButtonIcon: string;
  @Output() incrementButtonIconChange = new EventEmitter();
  @Input() decrementButtonIcon: string;
  @Output() decrementButtonIconChange = new EventEmitter();
  @Input() prefix: string;
  @Output() prefixChange = new EventEmitter();
  @Input() suffix: string;
  @Output() suffixChange = new EventEmitter();
  @Input() promptLabel: string;
  @Output() promptLabelChange = new EventEmitter();
  @Input() weakLabel: string;
  @Output() weakLabelChange = new EventEmitter();
  @Input() mediumLabel: string;
  @Output() mediumLabelChange = new EventEmitter();
  @Input() strongLabel: string;
  @Output() strongLabelChange = new EventEmitter();
  @Input() icon: string;
  @Output() iconChange = new EventEmitter();
  @Input() defaultLabel: string;
  @Output() defaultLabelChange = new EventEmitter();
  @Input() emptyFilterMessage: string;
  @Output() emptyFilterMessageChange = new EventEmitter();
  @Input() filterPlaceHolder: string;
  @Output() filterPlaceHolderChange = new EventEmitter();
  @Input() placeholder: string;
  @Output() placeholderChange = new EventEmitter();
  @Input() selectedItemsLabel: string;
  @Output() selectedItemsLabelChange = new EventEmitter();
  @Input() tooltip: string;
  @Output() tooltipChange = new EventEmitter();
  @Input() iconOnClass: string;
  @Output() iconOnClassChange = new EventEmitter();
  @Input() iconOffClass: string;
  @Output() iconOffClassChange = new EventEmitter();
  @Input() iconCancelClass: string;
  @Output() iconCancelClassChange = new EventEmitter();
  @Input() onLabel: string;
  @Output() onLabelChange = new EventEmitter();
  @Input() offLabel: string;
  @Output() offLabelChange = new EventEmitter();
  @Input() onIcon: string;
  @Output() onIconChange = new EventEmitter();
  @Input() offIcon: string;
  @Output() offIconChange = new EventEmitter();
  @Input() label: string;
  @Output() labelChange = new EventEmitter();
  @Input() hint: string;
  @Output() hintChange = new EventEmitter();
  @Input() emptyMessage: string;
  @Output() emptyMessageChange = new EventEmitter();
  @Input() filterPlaceholder: string;
  @Output() filterPlaceholderChange = new EventEmitter();
  @Input() scrollHeight: string;
  @Output() scrollHeightChange = new EventEmitter();
  @Input() newLabel: string;
  @Output() newLabelChange = new EventEmitter();

  @Input() minlength: number;
  @Output() minlengthChange = new EventEmitter();
  @Input() maxFileSize: number;
  @Output() maxFileSizeChange = new EventEmitter();
  @Input() previewWidth: number;
  @Output() previewWidthChange = new EventEmitter();
  @Input() fileLimit: number;
  @Output() fileLimitChange = new EventEmitter();
  @Input() minFractionDigits: number;
  @Output() minFractionDigitsChange = new EventEmitter();
  @Input() maxFractionDigits: number;
  @Output() maxFractionDigitsChange = new EventEmitter();
  @Input() rows: number;
  @Output() rowsChange = new EventEmitter();
  @Input() cols: number;
  @Output() colsChange = new EventEmitter();
  @Input() maxlength: number;
  @Output() maxlengthChange = new EventEmitter();
  @Input() maxSelectedLabels: number;
  @Output() maxSelectedLabelsChange = new EventEmitter();
  @Input() selectionLimit: number;
  @Output() selectionLimitChange = new EventEmitter();
  @Input() stars: number;
  @Output() starsChange = new EventEmitter();
  @Input() min: number;
  @Output() minChange = new EventEmitter();
  @Input() max: number;
  @Output() maxChange = new EventEmitter();
  @Input() step: number;
  @Output() stepChange = new EventEmitter();
  @Input() labelWidth: number;
  @Output() labelWidthChange = new EventEmitter();
  @Input() indentation: number;
  @Output() indentationChange = new EventEmitter();

  @Input() rounded: boolean;
  @Output() roundedChange = new EventEmitter();
  @Input() raised: boolean;
  @Output() raisedChange = new EventEmitter();
  @Input() full: boolean;
  @Output() fullChange = new EventEmitter();
  @Input() dropdown: boolean;
  @Output() dropdownChange = new EventEmitter();
  @Input() unique: boolean;
  @Output() uniqueChange = new EventEmitter();
  @Input() allowDuplicate: boolean;
  @Output() allowDuplicateChange = new EventEmitter();
  @Input() addOnTab: boolean;
  @Output() addOnTabChange = new EventEmitter();
  @Input() addOnBlur: boolean;
  @Output() addOnBlurChange = new EventEmitter();
  @Input() inline: boolean;
  @Output() inlineChange = new EventEmitter();
  @Input() clearable: boolean;
  @Output() clearableChange = new EventEmitter();
  @Input() editable: boolean;
  @Output() editableChange = new EventEmitter();
  @Input() autoDisplayFirst: boolean;
  @Output() autoDisplayFirstChange = new EventEmitter();
  @Input() showClear: boolean;
  @Output() showClearChange = new EventEmitter();
  @Input() auto: boolean;
  @Output() autoChange = new EventEmitter();
  @Input() showUploadButton: boolean;
  @Output() showUploadButtonChange = new EventEmitter();
  @Input() showCancelButton: boolean;
  @Output() showCancelButtonChange = new EventEmitter();
  @Input() displaySelectedLabel: boolean;
  @Output() displaySelectedLabelChange = new EventEmitter();
  @Input() autoClear: boolean;
  @Output() autoClearChange = new EventEmitter();
  @Input() unmask: boolean;
  @Output() unmaskChange = new EventEmitter();
  @Input() showButtons: boolean;
  @Output() showButtonsChange = new EventEmitter();
  @Input() feedback: boolean;
  @Output() feedbackChange = new EventEmitter();
  @Input() toggleMask: boolean;
  @Output() toggleMaskChange = new EventEmitter();
  @Input() autoResize: boolean;
  @Output() autoResizeChange = new EventEmitter();
  @Input() checkbox: boolean;
  @Output() checkboxChange = new EventEmitter();
  @Input() filled: boolean;
  @Output() filledChange = new EventEmitter();
  @Input() overlayVisible: boolean;
  @Output() overlayVisibleChange = new EventEmitter();
  @Input() resetFilterOnHide: boolean;
  @Output() resetFilterOnHideChange = new EventEmitter();
  @Input() showHeader: boolean;
  @Output() showHeaderChange = new EventEmitter();
  @Input() showToggleAll: boolean;
  @Output() showToggleAllChange = new EventEmitter();
  @Input() cancel: boolean;
  @Output() cancelChange = new EventEmitter();
  @Input() multiple: boolean;
  @Output() multipleChange = new EventEmitter();
  @Input() binary: boolean;
  @Output() binaryChange = new EventEmitter();
  @Input() range: boolean;
  @Output() rangeChange = new EventEmitter();
  @Input() disabled: boolean;
  @Output() disabledChange = new EventEmitter();
  @Input() readonly: boolean;
  @Output() readonlyChange = new EventEmitter();
  @Input() rtl: boolean;
  @Output() rtlChange = new EventEmitter();
  @Input() showRequiredStar: boolean;
  @Output() showRequiredStarChange = new EventEmitter();
  @Input() propagateSelectionUp: boolean;
  @Output() propagateSelectionUpChange = new EventEmitter();
  @Input() propagateSelectionDown: boolean;
  @Output() propagateSelectionDownChange = new EventEmitter();
  @Input() filter: boolean;
  @Output() filterChange = new EventEmitter();
  @Input() showImagePreview: boolean;
  @Output() showImagePreviewChange = new EventEmitter();

  @Input() dropdownMode: 'blank' | 'current';
  @Output() dropdownModeChange = new EventEmitter();
  @Input() resultType: 'base64' | 'file';
  @Output() resultTypeChange = new EventEmitter();
  @Input() datePickerMode: NgDatePickerMode;
  @Output() datePickerModeChange = new EventEmitter();
  @Input() size: number; // size to show as number (used for autocomplete)
  @Output() sizeChange = new EventEmitter();
  @Input() selectiveSize: NgSize; // size to show as dropdown (used for input and button)
  @Output() selectiveSizeChange = new EventEmitter();
  @Input() format: NgColorFormat | boolean | any;
  @Output() formatChange = new EventEmitter();
  @Input() buttonLayout: NgNumberButtonLayout;
  @Output() buttonLayoutChange = new EventEmitter();
  @Input() numberMode: NgNumberMode;
  @Output() modeChange = new EventEmitter();
  @Input() filePickerMode: NgInputFileMode;
  @Output() filePickerModeChange = new EventEmitter();
  @Input() currency: NgCurrency;
  @Output() currencyChange = new EventEmitter();
  @Input() currencyDisplay: NgCurrencyDisplay;
  @Output() currencyDisplayChange = new EventEmitter();
  @Input() tooltipPosition: NgPosition;
  @Output() tooltipPositionChange = new EventEmitter();
  @Input() orientation: NgOrientation;
  @Output() orientationChange = new EventEmitter();
  @Input() iconPos: NgPosition;
  @Output() iconPosChange = new EventEmitter();
  @Input() labelPos: NgLabelPosition;
  @Output() labelPosChange = new EventEmitter();
  @Input() selectionMode: NgSelectionMode;
  @Output() selectionModeChange = new EventEmitter();
  @Input() layout: NgOrientation;
  @Output() layoutChange = new EventEmitter();
  @Input() keyFilter: NgKeyFilter | RegExp;
  @Output() keyFilterChange = new EventEmitter();
  @Input() color: NgColor;
  @Output() colorChange = new EventEmitter();
  @Input() appearance: NgButtonAppearance;
  @Output() appearanceChange = new EventEmitter();
  @Input() newColor: NgColor;
  @Output() newColorChange = new EventEmitter();
  @Input() badgeColor: NgColor;
  @Output() badgeColorChange = new EventEmitter();

  @Input() previewItems: PreviewItem[]

  ngOnInit(): void {
    const dropdownData = {
      iconPos: ['left', 'right', 'top', 'bottom', 'top-right', 'top-left', 'bottom-right', 'bottom-left', 'top-center', 'bottom-center', 'center'],
      appearance: ['basic', 'text', 'outlined', 'link'],
      resultType: ['base64', 'file'],
      datePickerMode: ['day', 'month', 'time', 'daytime'],
      format: ['hex', 'rgb', 'hsb'],
      buttonLayout: ['stacked', 'horizontal', 'vertical'],
      filePickerMode: ['basic', 'advanced'],
      keyFilter: ['pint', 'int', 'pnum', 'num', 'hex', 'email', 'alpha', 'alphanum'],
      numberMode: ['decimal', 'currency'],
      currency: ['USD', 'EUR', 'IRR'],
      currencyDisplay: ['symbol', 'code', 'name'],
      tooltipPosition: ['left', 'right', 'top', 'bottom', 'top-right', 'top-left', 'bottom-right', 'bottom-left', 'top-center', 'bottom-center', 'center'],
      orientation: ['horizontal', 'vertical'],
      labelPos: ['fix-side', 'fix-top', 'float'],
      selectionMode: ['single', 'multiple', 'checkbox'],
      layout: ['horizontal', 'vertical'],
      dropdownMode: ['blank', 'current'],
      selectiveSize: ['sm', 'md', 'lg'],
      color: ['secondary', 'success', 'info', 'warning', 'danger', 'help', 'primary'],
      badgeColor: ['secondary', 'success', 'info', 'warning', 'danger', 'help', 'primary']
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
        cmpRef.instance.onChange.subscribe(val => {
          this[`${previewItem}Change`].next(val.value);
        });
        break;
      case InputTextComponent:
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

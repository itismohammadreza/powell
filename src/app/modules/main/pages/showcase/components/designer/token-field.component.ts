import {Component, EventEmitter, inject, Input, Output} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {AutoCompleteModule} from "@powell/components/auto-complete";
import {$dt, $TooltipModule} from "@powell/primeng";
import {DesignerService} from "@modules/main/pages/showcase/components";

@Component({
  selector: 'ng-token-field',
  imports: [
    FormsModule,
    $TooltipModule,
    AutoCompleteModule
  ],
  template: `
    <div class="relative">
      <ng-auto-complete
        labelPosition="top"
        [fluid]="true"
        [label]="label"
        [(ngModel)]="value"
        [suggestions]="suggestions"
        (onSelect)="onOptionSelect($event)"
        optionLabel="label"
        [showEmptyMessage]="false"
        (completeMethod)="search($event)"
        (onKeyUp)="onInput($event)">
        <ng-template ngTemplate="item" let-option>
          <div [pTooltip]="getTooltipData(option)" tooltipPosition="left"
               class="w-full flex items-center justify-between gap-4 px-2">
            <span>{{ option.token }}</span>
            @if (option.isColor) {
              <div class="border border-surface-200 dark:border-surface-700 w-4 h-4 rounded-full"
                   [style.backgroundColor]="option.variable"></div>
            } @else {
              <div class="text-xs max-w-16 text-ellipsis whitespace-nowrap overflow-hidden">
                {{ option.value }}
              </div>
            }
          </div>
        </ng-template>
      </ng-auto-complete>
      @if (type === 'color') {
        <div
          class="absolute right-[4px] bottom-[0.45rem] size-6 rounded-md border border-surface-300 dark:border-surface-600"
          [style.backgroundColor]="previewColor"></div>
      }
    </div>
  `
})
export class TokenFieldComponent {
  @Input() label: string | undefined;
  @Input() type: string | undefined;
  @Input() value: any;
  @Output() valueChange = new EventEmitter<any>();

  private designerService = inject(DesignerService);
  suggestions: any[];

  getTooltipData(option: any) {
    return typeof option !== 'object' && option.value;
  }

  get previewColor() {
    const tokenValue = typeof this.value === 'object' ? this.value.label : this.value;
    return tokenValue && tokenValue.trim().length && tokenValue.startsWith('{') && tokenValue.endsWith('}') ? $dt(tokenValue).variable : tokenValue;
  }

  onOptionSelect(event: any) {
    this.value = event.value.label;
    this.valueChange.emit(this.value);
    event.originalEvent.stopPropagation();
  }

  onInput(event: any) {
    this.value = event.target.value;
    this.valueChange.emit(this.value);
  }

  search(event: any) {
    const query = event.query;
    if (query.startsWith('{')) {
      this.suggestions = this.designerService.acTokens().filter((t) => t.label.startsWith(query));
    } else {
      this.suggestions = [];
    }
  }
}

import {Component, Input} from '@angular/core';

@Component({
  selector: 'ng-color-palette',
  template: `
    <div class="flex border border-surface rounded-l-lg rounded-r-lg overflow-hidden">
      @for (value of objectValues(value); track value) {
        <div class="size-8" [style.backgroundColor]="value" [title]="value"></div>
      }
    </div>
  `
})
export class ColorPaletteComponent {
  @Input() value: any;

  objectValues = Object.values;
}

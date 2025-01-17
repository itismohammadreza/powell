import {Component, Input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DesignTokenField} from '../../app.designtokenfield.component';
import {$FieldsetModule} from '@powell/primeng/fieldset';
import {FormsModule} from '@angular/forms';
import {$palette} from '@powell/primeng/api';
import {DesignColorPalette} from '../../app.designcolorpalette.component';

@Component({
  selector: 'design-cs-common',
  standalone: true,
  imports: [CommonModule, DesignColorPalette, DesignTokenField, FormsModule, $FieldsetModule],
  template: `
    <p-fieldset legend="Common" [toggleable]="true">
      <section class="flex justify-between items-center mb-4">
        <div class="flex gap-2 items-center">
          <span class="text-sm">Surface</span>
          <input [value]="colorScheme.surface['500']" (input)="onSurfaceColorChange($event)" [type]="'color'"/>
        </div>
        <design-color-palette [value]="colorScheme.surface"/>
      </section>
      <div class="text-sm mb-1 font-semibold text-surface-950 dark:text-surface-0">Typography</div>
      <section class="grid grid-cols-4 mb-3 gap-2">
        <div class="flex flex-col gap-1">
          <design-token-field [(value)]="colorScheme.text.color" label="Text" [type]="'color'"/>
        </div>
        <div class="flex flex-col gap-1">
          <design-token-field [(value)]="colorScheme.text.hoverColor" label="Text Hover" [type]="'color'"/>
        </div>
        <div class="flex flex-col gap-1">
          <design-token-field [(value)]="colorScheme.text.mutedColor" label="Text Muted" [type]="'color'"/>
        </div>
        <div class="flex flex-col gap-1">
          <design-token-field [(value)]="colorScheme.text.hoverMutedColor" label="Text Hover Muted" [type]="'color'"/>
        </div>
      </section>
      <section class="grid grid-cols-4 mb-3 gap-2">
        <div class="flex flex-col gap-1">
          <design-token-field [(value)]="colorScheme.content.background" label="Content BG" [type]="'color'"/>
        </div>
        <div class="flex flex-col gap-1">
          <design-token-field [(value)]="colorScheme.content.hoverBackground" label="Content Hover BG"
                              [type]="'color'"/>
        </div>
        <div class="flex flex-col gap-1">
          <design-token-field [(value)]="colorScheme.content.borderColor" label="Content Border Color"
                              [type]="'color'"/>
        </div>
        <div class="flex flex-col gap-1">
          <design-token-field [(value)]="colorScheme.content.color" label="Content Color" [type]="'color'"/>
        </div>
        <div class="flex flex-col gap-1">
          <design-token-field [(value)]="colorScheme.content.hoverColor" label="Content Hover Color" [type]="'color'"/>
        </div>
        <div class="flex flex-col gap-1">
          <design-token-field [(value)]="colorScheme.mask.background" label="Mask BG" [type]="'color'"/>
        </div>
        <div class="flex flex-col gap-1">
          <design-token-field [(value)]="colorScheme.mask.color" label="Mask Color" [type]="'color'"/>
        </div>
      </section>

      <div class="text-sm mb-1 font-semibold text-surface-950 dark:text-surface-0">Accent</div>
      <section class="grid grid-cols-4 mb-3 gap-2">
        <div class="flex flex-col gap-1">
          <design-token-field [(value)]="colorScheme.primary.color" label="Primary" [type]="'color'"/>
        </div>
        <div class="flex flex-col gap-1">
          <design-token-field [(value)]="colorScheme.primary.contrastColor" label="Primary Contrast" [type]="'color'"/>
        </div>
        <div class="flex flex-col gap-1">
          <design-token-field [(value)]="colorScheme.primary.hoverColor" label="Primary Hover" [type]="'color'"/>
        </div>
        <div class="flex flex-col gap-1">
          <design-token-field [(value)]="colorScheme.primary.activeColor" label="Primary Active" [type]="'color'"/>
        </div>
      </section>
      <section class="grid grid-cols-4 gap-2">
        <div class="flex flex-col gap-1">
          <design-token-field [(value)]="colorScheme.highlight.background" label="Highlight BG" [type]="'color'"/>
        </div>
        <div class="flex flex-col gap-1">
          <design-token-field [(value)]="colorScheme.highlight.color" label="Highlight Color" [type]="'color'"/>
        </div>
        <div class="flex flex-col gap-1">
          <design-token-field [(value)]="colorScheme.highlight.focusBackground" label="Highlight Focus BG"
                              [type]="'color'"/>
        </div>
        <div class="flex flex-col gap-1">
          <design-token-field [(value)]="colorScheme.highlight.focusColor" label="Highlight Focus Color"
                              [type]="'color'"/>
        </div>
      </section>
    </p-fieldset>
  `
})
export class DesignCSCommon {
  @Input() colorScheme: any;

  onSurfaceColorChange(event) {
    this.colorScheme.surface = {...{0: '#ffffff'}, ...$palette(event.target.value)};
  }
}

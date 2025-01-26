import {Component, Input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {$FieldsetModule} from '@powell/primeng/fieldset';
import {FormsModule} from '@angular/forms';
import {TokenFieldComponent} from "@modules/main/pages/showcase/components";

@Component({
  selector: 'ng-semantic-cs-overlay',
  standalone: true,
  imports: [CommonModule, TokenFieldComponent, FormsModule, $FieldsetModule],
  template: `
    <p-fieldset legend="Overlay" [toggleable]="true">
      <div class="text-sm mb-1 font-semibold text-surface-950 dark:text-surface-0">Select</div>
      <section class="grid grid-cols-4 mb-3 gap-2">
        <div class="flex flex-col gap-1">
          <ng-token-field [(value)]="colorScheme.overlay.select.background" label="BG" [type]="'color'"/>
        </div>
        <div class="flex flex-col gap-1">
          <ng-token-field [(value)]="colorScheme.overlay.select.borderColor" label="Border Color" [type]="'color'"/>
        </div>
        <div class="flex flex-col gap-1">
          <ng-token-field [(value)]="colorScheme.overlay.select.color" label="Color" [type]="'color'"/>
        </div>
        <div class="flex flex-col gap-1"></div>
      </section>

      <div class="text-sm mb-1 font-semibold text-surface-950 dark:text-surface-0">Popover</div>
      <section class="grid grid-cols-4 mb-3 gap-2">
        <div class="flex flex-col gap-1">
          <ng-token-field [(value)]="colorScheme.overlay.popover.background" label="BG" [type]="'color'"/>
        </div>
        <div class="flex flex-col gap-1">
          <ng-token-field [(value)]="colorScheme.overlay.popover.borderColor" label="Border Color"
                          [type]="'color'"/>
        </div>
        <div class="flex flex-col gap-1">
          <ng-token-field [(value)]="colorScheme.overlay.popover.color" label="Color" [type]="'color'"/>
        </div>
        <div class="flex flex-col gap-1"></div>
      </section>

      <div class="text-sm mb-1 font-semibold text-surface-950 dark:text-surface-0">Modal</div>
      <section class="grid grid-cols-4 gap-2">
        <div class="flex flex-col gap-1">
          <ng-token-field [(value)]="colorScheme.overlay.modal.background" label="BG" [type]="'color'"/>
        </div>
        <div class="flex flex-col gap-1">
          <ng-token-field [(value)]="colorScheme.overlay.modal.borderColor" label="Border Color" [type]="'color'"/>
        </div>
        <div class="flex flex-col gap-1">
          <ng-token-field [(value)]="colorScheme.overlay.modal.color" label="Color" [type]="'color'"/>
        </div>
        <div class="flex flex-col gap-1"></div>
      </section>
    </p-fieldset>
  `
})
export class SemanticCsOverlayComponent {
  @Input() colorScheme: any;
}

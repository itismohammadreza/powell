import {Component, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {$FieldsetModule} from '@powell/primeng/fieldset';
import {FormsModule} from '@angular/forms';
import {DesignerService, TokenFieldComponent} from "@modules/main/pages/showcase/components";

@Component({
  selector: 'ng-semantic-common-list',
  standalone: true,
  imports: [CommonModule, TokenFieldComponent, FormsModule, $FieldsetModule],
  template: `
    <p-fieldset legend="List" [toggleable]="true">
      <div class="text-sm mb-1 font-semibold text-surface-950 dark:text-surface-0">Container</div>
      <section class="grid grid-cols-4 mb-3 gap-2">
        <div class="flex flex-col gap-1">
          <ng-token-field [(value)]="designerService.preset().semantic.list.padding" label="Padding"/>
        </div>
        <div class="flex flex-col gap-1">
          <ng-token-field [(value)]="designerService.preset().semantic.list.gap" label="Gap"/>
        </div>
        <div class="flex flex-col gap-1">
          <ng-token-field [(value)]="designerService.preset().semantic.list.header.padding" label="Header Padding"/>
        </div>
        <div class="flex flex-col gap-1"></div>
      </section>

      <div class="text-sm mb-1 font-semibold text-surface-950 dark:text-surface-0">Option</div>
      <section class="grid grid-cols-4 mb-3 gap-2">
        <div class="flex flex-col gap-1">
          <ng-token-field [(value)]="designerService.preset().semantic.list.option.padding" label="Padding"/>
        </div>
        <div class="flex flex-col gap-1">
          <ng-token-field [(value)]="designerService.preset().semantic.list.option.borderRadius"
                          label="Border Radius"/>
        </div>
      </section>

      <div class="text-sm mb-1 font-semibold text-surface-950 dark:text-surface-0">Option Group</div>
      <section class="grid grid-cols-4 gap-2">
        <div class="flex flex-col gap-1">
          <ng-token-field [(value)]="designerService.preset().semantic.list.optionGroup.padding" label="Padding"/>
        </div>
        <div class="flex flex-col gap-1">
          <ng-token-field [(value)]="designerService.preset().semantic.list.optionGroup.fontWeight"
                          label="Font Weight"/>
        </div>
      </section>
    </p-fieldset>
  `
})
export class SemanticCommonListComponent {
  designerService = inject(DesignerService);
}

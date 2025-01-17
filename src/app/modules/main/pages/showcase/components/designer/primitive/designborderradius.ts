import {Component, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DesignTokenField} from '../app.designtokenfield.component';
import {$FieldsetModule} from '@powell/primeng/fieldset';
import {FormsModule} from '@angular/forms';
import {DesignerService} from "@modules/main/pages/showcase/components/designer/designerservice";

@Component({
    selector: 'design-border-radius',
    imports: [CommonModule, DesignTokenField, $FieldsetModule, FormsModule],
    template: `
      <p-fieldset legend="Rounded" [toggleable]="true">
        <section class="grid grid-cols-4 gap-2">
          <div class="flex flex-col gap-1">
            <design-token-field [(value)]="designerService.preset().primitive.borderRadius.none" label="None"/>
          </div>
          <div class="flex flex-col gap-1">
            <design-token-field [(value)]="designerService.preset().primitive.borderRadius.xs" label="Extra Small"/>
          </div>
          <div class="flex flex-col gap-1">
            <design-token-field [(value)]="designerService.preset().primitive.borderRadius.sm" label="Small"/>
          </div>
          <div class="flex flex-col gap-1">
            <design-token-field [(value)]="designerService.preset().primitive.borderRadius.md" label="Medium"/>
          </div>
          <div class="flex flex-col gap-1">
            <design-token-field [(value)]="designerService.preset().primitive.borderRadius.lg" label="Large"/>
          </div>
          <div class="flex flex-col gap-1">
            <design-token-field [(value)]="designerService.preset().primitive.borderRadius.xl" label="Extra Large"/>
          </div>
        </section>
      </p-fieldset>
    `
})
export class DesignBorderRadius {
    designerService = inject(DesignerService);
}

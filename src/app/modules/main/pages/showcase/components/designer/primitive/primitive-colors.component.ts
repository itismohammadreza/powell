import {Component, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {$FieldsetModule} from '@powell/primeng/fieldset';
import {FormsModule} from '@angular/forms';
import {$palette} from "@powell/primeng";
import {ColorPaletteComponent} from "@modules/main/pages/showcase/components/designer/color-palette.component";
import {DesignerService} from "@modules/main/pages/showcase/components/designer/designer.service";

@Component({
  selector: 'ng-primitive-colors',
  imports: [CommonModule, $FieldsetModule, FormsModule, ColorPaletteComponent],
  template: `
    <p-fieldset legend="Colors" [toggleable]="true">
      @for (key of objectKeys(designerService.preset()?.primitive); track key) {
        @if (key !== 'borderRadius') {
          <section class="flex justify-between items-center mb-4">
            <div class="flex gap-2 items-center">
              <span class="text-sm capitalize block w-20">{{ key }}</span>
              <input
                [value]="designerService.preset()?.primitive[key]['500']"
                (input)="onColorChange($event, key)"
                type="color"/>
            </div>
            <ng-color-palette [value]="designerService.preset()?.primitive[key]"/>
          </section>
        }
      }
    </p-fieldset>
  `
})
export class PrimitiveColorsComponent {
  designerService = inject(DesignerService);
  objectKeys = Object.keys;

  onColorChange(event, color) {
    this.designerService.preset().primitive[color] = $palette(event.target.value);
  }
}

import {Component, Input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SemanticCsCommonComponent} from "@modules/main/pages/showcase/components/designer/semantic/color-scheme/semantic-cs-common.component";
import {SemanticCsFormFieldComponent} from "@modules/main/pages/showcase/components/designer/semantic/color-scheme/semantic-cs-form-field.component";
import {SemanticCsListComponent} from "@modules/main/pages/showcase/components/designer/semantic/color-scheme/semantic-cs-list.component";
import {SemanticCsNavigationComponent} from "@modules/main/pages/showcase/components/designer/semantic/color-scheme/semantic-cs-navigation.component";
import {SemanticCsOverlayComponent} from "@modules/main/pages/showcase/components/designer/semantic/color-scheme/semantic-cs-overlay.component";

@Component({
  selector: 'ng-semantic-cs',
  standalone: true,
  imports: [CommonModule, SemanticCsCommonComponent, SemanticCsOverlayComponent, SemanticCsListComponent, SemanticCsFormFieldComponent, SemanticCsNavigationComponent],
  template: `
    <div class="flex flex-col gap-3">
      <ng-semantic-cs-common [colorScheme]="value"/>
      <ng-semantic-cs-form-field [colorScheme]="value"/>
      <ng-semantic-cs-overlay [colorScheme]="value"/>
      <ng-semantic-cs-list [colorScheme]="value"/>
      <ng-semantic-cs-navigation [colorScheme]="value"/>
    </div>
  `
})
export class SemanticCsComponent {
  @Input() value: any;
}

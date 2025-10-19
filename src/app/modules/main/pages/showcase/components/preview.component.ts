import {Component, EventEmitter, Input, Output} from '@angular/core';
import {PreviewOption, PreviewOptionsComponent} from "@modules/main/pages/showcase/components/index";
import {$CardModule, $DividerModule, $PanelModule} from "@powell/primeng";
import {TranslateModule} from "@ngx-translate/core";

@Component({
  selector: 'app-preview',
  template: `
    <div class="container py-6 [&_.p-card-content]:hidden [&>*]:block [&>*:not(:last-child)]:mb-4">
      <p-card>
        <ng-template #title> {{ component }}</ng-template>
        <ng-template #subtitle> {{ description }}</ng-template>
      </p-card>

      @if (previewOptions?.length) {
        <p-panel [header]="'options' | translate">
          <app-preview-options [options]="previewOptions" (optionChange)="onOptionChange.emit($event)"/>
        </p-panel>
      }

      <p-panel [style]="{minHeight:'110px'}" [header]="'preview' | translate">
        <ng-content></ng-content>
      </p-panel>
    </div>
  `,
  imports: [
    $CardModule,
    $PanelModule,
    $DividerModule,
    TranslateModule,
    PreviewOptionsComponent
  ]
})
export class PreviewComponent {
  @Input() previewOptions: PreviewOption[] = [];
  @Input() component: string;
  @Input() description: string;
  @Output() onOptionChange = new EventEmitter<PreviewOption>();
}

import {Component, EventEmitter, Input, Output} from '@angular/core';
import {PreviewOption, PreviewOptionsComponent} from "@modules/main/pages/showcase/components";
import {$CardModule, $DividerModule, $PanelModule} from "@powell/primeng";
import {TranslateModule} from "@ngx-translate/core";

@Component({
  selector: 'ng-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss'],
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

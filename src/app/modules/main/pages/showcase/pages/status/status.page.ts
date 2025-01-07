import {Component, ViewChild} from '@angular/core';
import {StatusComponent, StatusModule} from "@powell/components/status";
import {PreviewBase, PreviewComponent, PreviewOption} from "@modules/main/pages/showcase/components";

@Component({
  selector: 'ng-status-page',
  templateUrl: './status.page.html',
  styleUrls: ['./status.page.scss'],
  imports: [
    StatusModule,
    PreviewComponent
  ]
})
export class StatusPage extends PreviewBase {
  @ViewChild(StatusComponent) declare cmpRef: StatusComponent;

  override previewOptions: PreviewOption[] = [
    {field: 'status', value: 'info'},
    {field: 'text', value: ''},
    {field: 'subText', value: ''},
    {field: 'rtl', value: this.config.rtl},
    {field: 'followConfig', value: this.config.followConfig},
  ];
}

import {Component, ViewChild} from '@angular/core';
import {EmptyComponent, EmptyModule} from "@powell/components/empty";
import {PreviewBase, PreviewComponent, PreviewOption} from "@modules/main/pages/showcase/components";

@Component({
  selector: 'ng-empty-page',
  templateUrl: './empty.page.html',
  styleUrls: ['./empty.page.scss'],
  imports: [
    EmptyModule,
    PreviewComponent
  ]
})
export class EmptyPage extends PreviewBase {
  @ViewChild(EmptyComponent, {static: true}) declare cmpRef: EmptyComponent;

  override previewOptions: PreviewOption[] = [
    {field: 'imageType', value: 'box1'},
    {field: 'icon', value: ''},
    {field: 'text', value: ''},
    {field: 'rtl', value: this.config.rtl},
    {field: 'followConfig', value: this.config.followConfig},
  ];
}

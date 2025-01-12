import {Component, ViewChild} from '@angular/core';
import {ButtonComponent, ButtonModule} from "@powell/components/button";
import {PreviewBase, PreviewComponent, PreviewOption} from "@modules/main/pages/showcase/components";

@Component({
  selector: 'ng-button-page',
  templateUrl: './button.page.html',
  styleUrls: ['./button.page.scss'],
  imports: [
    ButtonModule,
    PreviewComponent
  ]
})
export class ButtonPage extends PreviewBase {
  @ViewChild(ButtonComponent) declare cmpRef: ButtonComponent;

  override previewOptions: PreviewOption[] = [
    {field: 'appearance', value: 'basic'},
    {field: 'async', value: false},
    {field: 'newLabel', value: 'New Label'},
    {field: 'newAppearance', value: 'outlined'},
    {field: 'newSeverity', value: 'secondary'},
    {field: 'iconPos', value: 'left'},
    {field: 'icon', value: 'pi pi-user'},
    {field: 'badge', value: '2'},
    {field: 'label', value: 'Sample'},
    {field: 'disabled', value: false},
    {field: 'raised', value: false},
    {field: 'rounded', value: false},
    {field: 'severity', value: 'primary'},
    {field: 'size', options: 'sizes', value: 'none'},
    {field: 'badgeSeverity', value: 'secondary'},
    {field: 'fluid', value: false}
  ];
}

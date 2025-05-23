import {Component, ViewChild} from '@angular/core';
import {ButtonComponent, ButtonModule} from "@powell/components/button";
import {PreviewBase, PreviewComponent, PreviewOption} from "@modules/main/pages/showcase/components";

@Component({
  selector: 'ng-button-page',
  templateUrl: './button.page.html',
  imports: [
    ButtonModule,
    PreviewComponent
  ]
})
export class ButtonPage extends PreviewBase {
  @ViewChild(ButtonComponent) declare cmpRef: ButtonComponent;

  override previewOptions: PreviewOption[] = [
    {field: 'appearance', options: 'appearances', value: 'basic'},
    {field: 'async', value: false},
    {field: 'newLabel', value: 'new label'},
    {field: 'newAppearance', options: 'appearances', value: 'outlined'},
    {field: 'newSeverity', options: 'severities', value: 'secondary'},
    {field: 'iconPos', options: 'positions', value: 'left'},
    {field: 'icon', value: 'pi pi-user'},
    {field: 'badge', value: '2'},
    {field: 'label', value: 'label'},
    {field: 'disabled', value: false},
    {field: 'raised', value: false},
    {field: 'rounded', value: false},
    {field: 'severity', options: 'severities', value: 'primary'},
    {field: 'size', options: 'sizes', value: 'none'},
    {field: 'badgeSeverity', options: 'severities', value: 'secondary'},
    {field: 'fluid', value: false}
  ];
}

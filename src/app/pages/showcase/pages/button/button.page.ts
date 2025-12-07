import {Component, ViewChild} from '@angular/core';
import {ButtonComponent, ButtonModule} from "@powell/components/button";
import {PreviewBase, PreviewComponent, PreviewOption} from "@pages/showcase/components";

@Component({
  selector: 'app-button-page',
  templateUrl: './button.page.html',
  imports: [
    ButtonModule,
    PreviewComponent
  ]
})
export class ButtonPage extends PreviewBase {
  @ViewChild(ButtonComponent) declare cmpRef: ButtonComponent;

  override previewOptions: PreviewOption[] = [
    {field: 'appearance', selectOptions: 'appearances', value: 'basic'},
    {field: 'async', value: false},
    {field: 'newLabel', value: 'new label'},
    {field: 'newAppearance', selectOptions: 'appearances', value: 'outlined'},
    {field: 'newSeverity', selectOptions: 'severities', value: 'secondary'},
    {field: 'iconPos', selectOptions: 'positions', value: 'left'},
    {field: 'icon', value: 'pi pi-user'},
    {field: 'badge', value: '2'},
    {field: 'label', value: 'label'},
    {field: 'disabled', value: false},
    {field: 'raised', value: false},
    {field: 'rounded', value: false},
    {field: 'severity', selectOptions: 'severities', value: 'primary'},
    {field: 'size', selectOptions: 'sizes', value: 'none'},
    {field: 'badgeSeverity', selectOptions: 'severities', value: 'secondary'},
    {field: 'fluid', value: false}
  ];
}

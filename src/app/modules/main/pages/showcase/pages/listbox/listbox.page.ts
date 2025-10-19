import {Component, ViewChild} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {ListboxComponent, ListboxModule} from "@powell/components/listbox";
import {PreviewBase, PreviewComponent, PreviewOption} from "@modules/main/pages/showcase/components";

@Component({
  selector: 'app-listbox-page',
  templateUrl: './listbox.page.html',
  imports: [
    ListboxModule,
    ReactiveFormsModule,
    PreviewComponent
  ]
})
export class ListboxPage extends PreviewBase {
  @ViewChild(ListboxComponent) declare cmpRef: ListboxComponent;

  override previewOptions: PreviewOption[] = [
    {field: 'label', value: 'label'},
    {field: 'labelWidth', value: 100},
    {field: 'hint', value: ''},
    {field: 'rtl', value: this.config.rtl},
    {field: 'showRequiredStar', value: this.config.showRequiredStar},
    {field: 'labelPosition', selectOptions: 'fixLabelPositions', value: this.config.fixLabelPosition},
    {field: 'followConfig', value: this.config.followConfig},
    {field: 'multiple', value: false},
    {field: 'readonly', value: false},
    {field: 'disabled', value: false},
    {field: 'checkbox', value: false},
    {field: 'filter', value: false},
    {field: 'showToggleAll', value: true},
    {field: 'filterPlaceHolder', value: ''},
    {field: 'striped', value: false},
    {field: 'checkmark', value: true},
  ];
}

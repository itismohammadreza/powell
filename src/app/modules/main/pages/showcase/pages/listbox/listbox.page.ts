import {Component, ViewChild} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {ListboxComponent, ListboxModule} from "@powell/components/listbox";
import {PreviewBase, PreviewComponent, PreviewOption} from "@modules/main/pages/showcase/components";

@Component({
  selector: 'ng-listbox-page',
  templateUrl: './listbox.page.html',
  styleUrls: ['./listbox.page.scss'],
  imports: [
    ListboxModule,
    ReactiveFormsModule,
    PreviewComponent
  ]
})
export class ListboxPage extends PreviewBase {
  @ViewChild(ListboxComponent, {static: true}) declare cmpRef: ListboxComponent;

  override previewOptions: PreviewOption[] = [
    {field: 'label', value: 'label'},
    {field: 'labelWidth', value: 100},
    {field: 'hint', value: ''},
    {field: 'rtl', value: this.config.rtl},
    {field: 'showRequiredStar', value: this.config.showRequiredStar},
    {field: 'labelPos', value: this.config.fixLabelPos},
    {field: 'addon', value: ''},
    {field: 'followConfig', value: this.config.followConfig},
    {field: 'multiple', value: false},
    {field: 'readonly', value: false},
    {field: 'disabled', value: false},
    {field: 'checkbox', value: false},
    {field: 'filter', value: false},
    {field: 'showToggleAll', value: true},
    {field: 'filterPlaceHolder', value: ''},
    {field: 'striped', value: true},
    {field: 'checkmark', value: true},
  ];
}

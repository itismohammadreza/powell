import {Component, ViewChild} from '@angular/core';
import {ReactiveFormsModule} from "@angular/forms";
import {TreeSelectComponent, TreeSelectModule} from "@powell/components/tree-select";
import {PreviewBase, PreviewComponent, PreviewOption} from "@pages/showcase/components";

@Component({
  selector: 'app-tree-select-page',
  templateUrl: './tree-select.page.html',
  imports: [
    TreeSelectModule,
    ReactiveFormsModule,
    PreviewComponent
  ]
})
export class TreeSelectPage extends PreviewBase {
  @ViewChild(TreeSelectComponent) declare cmpRef: TreeSelectComponent;

  override previewOptions: PreviewOption[] = [
    {field: 'label', value: 'label'},
    {field: 'labelWidth', value: 100},
    {field: 'hint', value: ''},
    {field: 'rtl', value: this.config.rtl},
    {field: 'showRequiredStar', value: this.config.showRequiredStar},
    {field: 'labelPosition', selectOptions: 'labelPositions', value: this.config.labelPosition},
    {field: 'additions', selectOptions: 'additions', value: 'none'},
    {field: 'followConfig', value: this.config.followConfig},
    {field: 'disabled', value: false},
    {field: 'variant', selectOptions: 'variants', value: this.config.inputVariant},
    {field: 'display', selectOptions: 'displayTypes', value: 'comma'},
    {field: 'selectionMode', selectOptions: 'selectionModes', value: 'single'},
    {field: 'placeholder', value: ''},
    {field: 'fluid', value: false},
    {field: 'filter', value: false},
    {field: 'propagateSelectionDown', value: true},
    {field: 'propagateSelectionUp', value: true},
    {field: 'showClear', value: false},
    {field: 'resetFilterOnHide', value: true},
    {field: 'size', selectOptions: 'sizes', value: this.config.inputSize},
  ];

  override options: SafeAny[] = [
    {
      key: "0",
      label: "Documents",
      data: "Documents Folder",
      icon: "pi pi-fw pi-inbox",
      children: [
        {
          key: "0-0",
          label: "Work",
          data: "Work Folder",
          icon: "pi pi-fw pi-cog",
          children: [
            {key: "0-0-0", label: "Expenses.doc", icon: "pi pi-fw pi-file", data: "Expenses Document"},
            {key: "0-0-1", label: "Resume.doc", icon: "pi pi-fw pi-file", data: "Resume Document"}
          ]
        },
        {
          key: "0-1",
          label: "Home",
          data: "Home Folder",
          icon: "pi pi-fw pi-home",
          children: [
            {key: "0-1-0", label: "Invoices.txt", icon: "pi pi-fw pi-file", data: "Invoices for this month"}
          ]
        }
      ]
    },
    {
      key: "1",
      label: "Events",
      data: "Events Folder",
      icon: "pi pi-fw pi-calendar",
      children: [
        {key: "1-0", label: "Meeting", icon: "pi pi-fw pi-calendar-plus", data: "Meeting"},
        {key: "1-1", label: "Product Launch", icon: "pi pi-fw pi-calendar-plus", data: "Product Launch"},
        {key: "1-2", label: "Report Review", icon: "pi pi-fw pi-calendar-plus", data: "Report Review"}
      ]
    },
    {
      key: "2",
      label: "Movies",
      data: "Movies Folder",
      icon: "pi pi-fw pi-star-fill",
      children: [
        {
          key: "2-0",
          icon: "pi pi-fw pi-star-fill",
          label: "Al Pacino",
          data: "Pacino Movies",
          children: [
            {key: "2-0-0", label: "Scarface", icon: "pi pi-fw pi-video", data: "Scarface Movie"},
            {key: "2-0-1", label: "Serpico", icon: "pi pi-fw pi-video", data: "Serpico Movie"}
          ]
        },
        {
          key: "2-1",
          label: "Robert De Niro",
          icon: "pi pi-fw pi-star-fill",
          data: "De Niro Movies",
          children: [
            {key: "2-1-0", label: "Goodfellas", icon: "pi pi-fw pi-video", data: "Goodfellas Movie"},
            {key: "2-1-1", label: "Untouchables", icon: "pi pi-fw pi-video", data: "Untouchables Movie"}
          ]
        }
      ]
    }
  ]
}

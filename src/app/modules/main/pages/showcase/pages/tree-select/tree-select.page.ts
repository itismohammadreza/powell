import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {NgAddon, NgChipDisplayMode, NgIconPosition, NgLabelPosition, NgSize, NgTreeSelectionMode} from "@powell/models";
import {ConfigService} from "@powell/api";

@Component({
  selector: 'ng-tree-select-page',
  templateUrl: './tree-select.page.html',
  styleUrls: ['./tree-select.page.scss']
})
export class TreeSelectPage {
  form = new FormGroup({
    c1: new FormControl(null, [Validators.required]),
  });
  binding;

  label: string = 'label';
  filled: boolean = this.configService.getConfig().filled;
  labelWidth: number = 100;
  hint: string = '';
  rtl: boolean = this.configService.getConfig().rtl;
  showRequiredStar: boolean = this.configService.getConfig().showRequiredStar;
  icon: string = '';
  labelPos: NgLabelPosition = this.configService.getConfig().labelPos;
  iconPos: NgIconPosition = 'left';
  addon: NgAddon;
  inputSize: NgSize = this.configService.getConfig().inputSize;
  disableConfigChangeEffect: boolean = this.configService.getConfig().disableConfigChangeEffect;
  // native properties
  scrollHeight: string = '400px';
  placeholder: string;
  disabled: boolean;
  selectionMode: NgTreeSelectionMode = 'single';
  emptyMessage: string = '';
  display: NgChipDisplayMode = 'comma';
  propagateSelectionUp: boolean = true;
  propagateSelectionDown: boolean = true;
  filter: boolean = false;
  filterPlaceHolder: string;
  resetFilterOnHide: boolean = true;
  showClear: boolean = false;

  options: any[] = [
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

  constructor(private configService: ConfigService) {
  }
}

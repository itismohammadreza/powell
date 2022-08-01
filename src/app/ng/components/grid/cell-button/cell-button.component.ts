import {Component} from '@angular/core';
import {NgButtonAppearance} from '@ng/models/button';
import {NgPosition} from '@ng/models/offset';
import {ICellRendererAngularComp} from 'ag-grid-angular';
import {NgColor} from '@ng/models/color';

@Component({
  selector: 'ng-cell-button',
  templateUrl: './cell-button.component.html',
  styleUrls: ['./cell-button.component.scss'],
})
export class CellButtonComponent implements ICellRendererAngularComp {
  params: any;
  label: string;
  action: string;
  color: NgColor;
  icon: string;
  appearance: NgButtonAppearance;
  disabled: boolean;
  iconPos: NgPosition;
  rounded: boolean;

  agInit(params): void {
    this.params = params;
    this.label = params.label || null;
    this.action = params.action || null;
    this.color = params.color || 'primary';
    this.icon = params.icon || null;
    this.appearance = params.appearance || 'basic';
    this.disabled = params.disabled || false;
    this.iconPos = params.iconPos || 'left';
    this.rounded = params.rounded || false;
  }

  refresh(params?: any): boolean {
    return true;
  }

  onClick($event) {
    if (this.params.onClick instanceof Function) {
      const params = {
        event: $event,
        rowData: this.params.node.data,
        action: this.action,
      };
      this.params.onClick(params);
    }
  }
}

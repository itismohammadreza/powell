import {Component} from '@angular/core';
import {UntypedFormControl, UntypedFormGroup, Validators} from '@angular/forms';
import {NgFixLabelPosition} from '@ng/models/forms';
import {NgOrientation, NgSelectionMode} from '@ng/models/offset';
import {NgTree, NgTreeFilterMode} from '@ng/models/tree';
import {ContextMenu} from 'primeng/contextmenu';

@Component({
  selector: 'ng-tree-page',
  templateUrl: './tree.page.html',
  styleUrls: ['./tree.page.scss'],
})
export class TreePage {
  form = new UntypedFormGroup({
    c1: new UntypedFormControl(null, [Validators.required]),
  });
  binding;

  label: string = '';
  labelWidth: number;
  hint: string = '';
  rtl: boolean = false;
  labelPos: NgFixLabelPosition = 'fix-top';
  items: NgTree[];
  selectionMode: NgSelectionMode = 'checkbox';
  selection: NgTree | NgTree[];
  style: string = '';
  styleClass: string = '';
  contextMenu: ContextMenu;
  layout: NgOrientation = 'vertical';
  draggableScope: string = '';
  droppableScope: string = '';
  draggableNodes: boolean = false;
  droppableNodes: boolean = false;
  metaKeySelection: boolean = true;
  propagateSelectionUp: boolean = true;
  propagateSelectionDown: boolean = true;
  loading: boolean = false;
  loadingIcon: string = 'pi pi-spinner';
  emptyMessage: string = 'No records found';
  validateDrop: boolean = false;
  filter: boolean = false;
  filterBy: string = 'label';
  filterMode: NgTreeFilterMode = 'lenient';
  filterPlaceholder: string = '';
  filterLocale: string = undefined;
  scrollHeight: string = '';
  virtualScroll: boolean = false;
  virtualNodeHeight: number;
  minBufferPx: number;
  maxBufferPx: number;
  trackBy: any;
  indentation: number = 1.5;
}

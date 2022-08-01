import {Component, OnInit} from '@angular/core';
import {UntypedFormGroup, UntypedFormControl, Validators} from '@angular/forms';
import {NgLabelPosition} from '@ng/models/forms';
import {NgSelectionMode, NgOrientation} from '@ng/models/offset';
import {NgTree, NgTreeFilterMode} from '@ng/models/tree';
import {LanguageChecker} from '@core/utils';
import {ContextMenu} from 'primeng/contextmenu';

@Component({
  selector: 'ng-tree-page',
  templateUrl: './tree.page.html',
  styleUrls: ['./tree.page.scss'],
})
export class TreePage implements OnInit {
  form = new UntypedFormGroup({
    c1: new UntypedFormControl(null, [Validators.required]),
  });
  binding;

  submit() {
  }

  ngOnInit(): void {
  }

  label: string;
  labelWidth: number;
  hint: string;
  rtl: boolean = false;
  showRequiredStar: boolean = true;
  labelPos: NgLabelPosition = 'fix-top';
  items: NgTree[];
  selectionMode: NgSelectionMode = 'checkbox';
  selection: NgTree | NgTree[];
  style: string;
  styleClass: string;
  contextMenu: ContextMenu;
  layout: NgOrientation = 'vertical';
  draggableScope: string;
  droppableScope: string;
  draggableNodes: boolean;
  droppableNodes: boolean;
  metaKeySelection: boolean = true;
  propagateSelectionUp: boolean = true;
  propagateSelectionDown: boolean = true;
  loading: boolean = false;
  loadingIcon: string = 'pi pi-spinner';
  emptyMessage: string = 'No records found';
  ariaLabel: string;
  ariaLabelledBy: string;
  togglerAriaLabel: string;
  validateDrop: boolean = false;
  filter: boolean = false;
  filterBy: string = 'label';
  filterMode: NgTreeFilterMode = 'lenient';
  filterPlaceholder: string;
  filterLocale: string = undefined;
  scrollHeight: string;
  virtualScroll: boolean = false;
  virtualNodeHeight: number;
  minBufferPx: number;
  maxBufferPx: number;
  trackBy: any;
  indentation: number = 1.5;
}

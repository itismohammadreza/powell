import {
  AfterContentInit,
  Component,
  ContentChildren,
  EventEmitter,
  Input,
  OnInit,
  Output,
  QueryList,
  TemplateRef
} from '@angular/core';
import {NgSelectionMode} from '@ng/models/offset';
import {TemplateDirective} from '@ng/directives/template.directive';

@Component({
  selector: 'ng-tree-select',
  templateUrl: './tree-select.component.html',
  styleUrls: ['./tree-select.component.scss']
})
export class TreeSelectComponent implements OnInit, AfterContentInit {
  // native properties
  @Input() selection: any;
  @Input() options: any[];
  @Input() scrollHeight: string = '400px';
  @Input() placeholder: string;
  @Input() disabled: boolean;
  @Input() tabindex: string;
  @Input() ariaLabelledBy: string;
  @Input() selectionMode: NgSelectionMode;
  @Input() panelClass: string;
  @Input() appendTo: any;
  @Input() emptyMessage: string = 'No records found';
  @Input() display: 'comma' | 'chip' = 'comma';
  @Input() propagateSelectionUp: boolean = true;
  @Input() propagateSelectionDown: boolean = true;
  @Input() metaKeySelection: boolean = true;
  @Output() onShow = new EventEmitter();
  @Output() onHide = new EventEmitter();
  @Output() onNodeSelect = new EventEmitter();
  @Output() onNodeUnselect = new EventEmitter();
  @Output() onNodeExpand = new EventEmitter();
  @Output() onNodeCollapse = new EventEmitter();
  @ContentChildren(TemplateDirective) templates: QueryList<TemplateDirective>;

  valueTemplate: TemplateRef<any>;
  headerTemplate: TemplateRef<any>;
  emptyTemplate: TemplateRef<any>;
  footerTemplate: TemplateRef<any>;

  ngOnInit(): void {
  }

  ngAfterContentInit() {
    this.templates.forEach((item: TemplateDirective) => {
      switch (item.getType()) {
        case 'value':
          this.valueTemplate = item.templateRef;
          break;

        case 'header':
          this.headerTemplate = item.templateRef;
          break;

        case 'empty':
          this.emptyTemplate = item.templateRef;
          break;

        case 'footer':
          this.footerTemplate = item.templateRef;
          break;
      }
    });
  }

}

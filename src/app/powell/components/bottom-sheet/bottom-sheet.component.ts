import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  EventEmitter,
  Input,
  OnInit,
  Output,
  QueryList,
  TemplateRef
} from '@angular/core';
import {TemplateDirective} from "@powell/directives/template";
import {OverlayService} from "@powell/api";
import {NgCssObject, NgHistoryState} from "@powell/models";
import {Subject, takeUntil} from "rxjs";
import {PrimeUniqueComponentId} from "@powell/primeng/api";

@Component({
  selector: 'ng-bottom-sheet',
  templateUrl: './bottom-sheet.component.html',
  styleUrls: ['./bottom-sheet.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BottomSheetComponent implements OnInit, AfterContentInit {
  @Input() header: string;
  @Input() gutter: boolean = true;
  // native properties
  @Input() appendTo: any;
  @Input() blockScroll: boolean;
  @Input() style: NgCssObject;
  @Input() styleClass: string;
  @Input() ariaCloseLabel: string;
  @Input() autoZIndex: boolean = true;
  @Input() baseZIndex: number;
  @Input() modal: boolean = true;
  @Input() dismissible: boolean = true;
  @Input() showCloseIcon: boolean = true;
  @Input() closeOnEscape: boolean = true;
  @Input() transitionOptions: string = '270ms cubic-bezier(0, 0, 0.2, 1)';
  @Input() visible: boolean;
  @Output() onShow = new EventEmitter<any>();
  @Output() onHide = new EventEmitter<any>();
  @Output() visibleChange = new EventEmitter<boolean>();
  @ContentChildren(TemplateDirective) templates: QueryList<TemplateDirective>;

  destroy$ = new Subject<boolean>();
  templateMap: Record<string, TemplateRef<any>> = {};
  state: NgHistoryState = {
    component: 'bottomSheet',
    key: PrimeUniqueComponentId()
  }

  constructor(private overlayService: OverlayService) {
  }

  ngOnInit() {
    this.style = {height: '50vh', ...this.style};
    this.styleClass = `p-bottom-sheet ${this.styleClass}`;
  }

  ngAfterContentInit() {
    this.templates.forEach(item => {
      const name = item.getType();
      this.templateMap[name] = item.templateRef;
    });
  }

  _onShow() {
    this.visible = true;
    this.visibleChange.emit(this.visible);
    this.overlayService.stateChange().pipe(takeUntil(this.destroy$)).subscribe(res => {
      if (this.state.key === res.key) {
        this._onHide()
      }
    })
    this.overlayService.pushState(this.state);
  }

  _onHide() {
    this.visible = false;
    this.visibleChange.emit(this.visible);
    this.destroy$?.next(true);
    this.destroy$.complete();
    if (!this.overlayService.isPopped(this.state)) {
      this.overlayService.popState()
    }
  }
}

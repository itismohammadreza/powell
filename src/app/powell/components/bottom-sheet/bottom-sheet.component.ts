import {
  AfterContentInit,
  Component,
  ContentChildren,
  EventEmitter,
  inject,
  Input,
  OnChanges,
  OnInit,
  Output,
  QueryList,
  SimpleChanges,
  TemplateRef
} from '@angular/core';
import {TemplateDirective} from "@powell/directives/template";
import {ConfigService, OverlayService} from "@powell/api";
import {NgButtonProps, NgCssObject, NgHistoryState} from "@powell/models";
import {Subject, takeUntil} from "rxjs";
import {$uuid} from "@powell/primeng";
import {DestroyService} from "@core/utils";

@Component({
  selector: 'ng-bottom-sheet',
  templateUrl: './bottom-sheet.component.html',
  styleUrls: ['./bottom-sheet.component.scss'],
  providers: [DestroyService],
  standalone: false
})
export class BottomSheetComponent implements OnInit, AfterContentInit, OnChanges {
  private overlayService = inject(OverlayService);
  private configService = inject(ConfigService);
  // used in `applyConfigToComponent` method
  private destroy$ = inject(DestroyService);

  @Input() rtl: boolean;
  @Input() followConfig: boolean;
  // native properties
  @Input() appendTo: any;
  @Input() blockScroll: boolean;
  @Input() style: NgCssObject;
  @Input() styleClass: string;
  @Input() ariaCloseLabel: string;
  @Input() autoZIndex: boolean = true;
  @Input() baseZIndex: number;
  @Input() modal: boolean = true;
  @Input() closeButtonProps: NgButtonProps;
  @Input() dismissible: boolean = true;
  @Input() closeOnEscape: boolean = true;
  @Input() transitionOptions: string = '270ms cubic-bezier(0, 0, 0.2, 1)';
  @Input() visible: boolean;
  @Input() fullScreen: boolean;
  @Input() header: string;
  @Input() maskStyle: NgCssObject;
  @Input() closable: boolean = true;
  @Output() onShow = new EventEmitter<any>();
  @Output() onHide = new EventEmitter<any>();
  @Output() visibleChange = new EventEmitter<boolean>();
  @ContentChildren(TemplateDirective) templates: QueryList<TemplateDirective>;

  hided$ = new Subject<boolean>();
  templateMap: Record<string, TemplateRef<any>> = {};
  state: NgHistoryState = {
    component: 'bottomSheet',
    key: $uuid()
  }

  ngOnInit() {
    this.style = {...(!this.fullScreen && {maxHeight: '50vh', height: 'auto'}), ...this.style};
    this.styleClass = `p-bottom-sheet ${this.styleClass}`;
    this.configService.applyConfigToComponent(this);
  }

  ngOnChanges(changes: SimpleChanges) {
    const {closeButtonProps} = changes;
    if (closeButtonProps) {
      const props = closeButtonProps.currentValue;
      this.closeButtonProps = this.mapToButtonProps(props);
    }
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
    this.overlayService.stateChange().pipe(takeUntil(this.hided$)).subscribe(res => {
      if (this.state.key === res.key) {
        this._onHide()
      }
    })
    this.overlayService.pushState(this.state);
  }

  _onHide() {
    this.visible = false;
    this.visibleChange.emit(this.visible);
    this.hided$?.next(true);
    this.hided$.complete();
    if (!this.overlayService.isPopped(this.state)) {
      this.overlayService.popState()
    }
  }

  mapToButtonProps(props: NgButtonProps) {
    return {
      ...props,
      link: props.appearance === 'link',
      outlined: props.appearance === 'outlined',
      text: props.appearance === 'text',
    } as any;
  }
}

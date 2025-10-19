import {
  AfterContentInit,
  ChangeDetectorRef,
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
import {ButtonProps, CssObject, HistoryState} from "@powell/models";
import {Subject, takeUntil} from "rxjs";
import {$uuid} from "@powell/primeng";
import {DestroyService} from "@powell/utils";

@Component({
  selector: 'pw-bottom-sheet',
  templateUrl: './bottom-sheet.component.html',
  providers: [DestroyService],
  standalone: false
})
export class BottomSheetComponent implements OnInit, AfterContentInit, OnChanges {
  private overlayService = inject(OverlayService);
  private configService = inject(ConfigService);
  private cd = inject(ChangeDetectorRef);
  // used in `configureComponent` method
  private destroy$ = inject(DestroyService);

  @Input() rtl: Optional<boolean>;
  @Input() followConfig: Optional<boolean>;
  // native properties
  @Input() appendTo: Optional<SafeAny>;
  @Input() blockScroll: boolean = false;
  @Input() style: Optional<CssObject>;
  @Input() ariaCloseLabel: Optional<string>;
  @Input() autoZIndex: boolean = true;
  @Input() baseZIndex: Optional<number>;
  @Input() modal: boolean = true;
  @Input() closeButtonProps: Optional<ButtonProps>;
  @Input() dismissible: boolean = true;
  @Input() closeOnEscape: boolean = true;
  @Input() transitionOptions: string = '270ms cubic-bezier(0, 0, 0.2, 1)';
  @Input() visible: boolean = false;
  @Input() fullScreen: boolean = false;
  @Input() header: Optional<string>;
  @Input() maskStyle: Optional<CssObject>;
  @Input() closable: boolean = true;
  @Output() onShow = new EventEmitter<SafeAny>();
  @Output() onHide = new EventEmitter<SafeAny>();
  @Output() visibleChange = new EventEmitter<boolean>();
  @ContentChildren(TemplateDirective) templates: Optional<QueryList<TemplateDirective>>;

  computedStyle: CssObject = {};
  hided$ = new Subject<boolean>();
  templateMap: Record<string, TemplateRef<SafeAny>> = {};
  state: HistoryState = {
    component: 'bottomSheet',
    key: $uuid()
  }

  ngOnInit() {
    this.configService.configureComponent(this);
  }

  ngOnChanges(changes: SimpleChanges) {
    const {closeButtonProps} = changes;
    if (closeButtonProps) {
      const props = closeButtonProps.currentValue;
      this.closeButtonProps = this.mapToButtonProps(props);
    }
  }

  ngAfterContentInit() {
    this.templates?.forEach(item => {
      const name = item.type;
      this.templateMap[name] = item.templateRef;
    });
  }

  _onShow() {
    this.updateStyle();
    this.visible = true;
    this.visibleChange.emit(this.visible);
    this.overlayService.stateChange().pipe(takeUntil(this.hided$)).subscribe(res => {
      if (this.state.key === res.key) {
        this._onHide()
      }
    })
    this.overlayService.pushState(this.state);
    this.cd.markForCheck();
  }

  _onHide() {
    this.visible = false;
    this.visibleChange.emit(this.visible);
    this.hided$?.next(true);
    this.hided$.complete();
    this.cd.markForCheck();
    if (!this.overlayService.isPopped(this.state)) {
      this.overlayService.popState()
    }
  }

  mapToButtonProps(props: ButtonProps) {
    if (!props) {
      return {};
    }
    return {
      ...props,
      link: props.appearance === 'link',
      outlined: props.appearance === 'outlined',
      text: props.appearance === 'text',
    } as SafeAny;
  }

  updateStyle() {
    if (this.fullScreen) {
      this.computedStyle = {...this.style};
      delete this.computedStyle['maxHeight'];
      delete this.computedStyle['height'];
    } else {
      this.computedStyle = {
        ...this.style,
        maxHeight: '50vh',
        height: 'auto',
      };
    }
  }
}

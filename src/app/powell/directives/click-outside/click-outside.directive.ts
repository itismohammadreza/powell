import {
  Directive,
  ElementRef,
  EventEmitter,
  inject,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  PLATFORM_ID,
  SimpleChanges
} from '@angular/core';
import {DOCUMENT, isPlatformBrowser} from '@angular/common';

@Directive({
  selector: '[pwClickOutside]',
  standalone: false
})
export class ClickOutsideDirective implements OnInit, OnChanges, OnDestroy {
  private document = inject(DOCUMENT);
  private platformId = inject(PLATFORM_ID);
  private _el = inject(ElementRef);

  @Input() attachOutsideOnClick: boolean = false;
  @Input() delayClickOutsideInit: boolean = false;
  @Input() exclude: string = '';
  @Input() excludeBeforeClick: boolean = false;
  @Input() clickOutsideEvents: string = '';
  @Output() pwClickOutside: EventEmitter<Event> = new EventEmitter<Event>();

  _nodesExcluded: Array<HTMLElement> = [];
  _events: Array<string> = ['click'];

  constructor() {
    this._initOnClickBody = this._initOnClickBody.bind(this);
    this._onClickBody = this._onClickBody.bind(this);
  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this._init();
    }
  }

  ngOnDestroy() {
    if (isPlatformBrowser(this.platformId)) {

      if (this.attachOutsideOnClick) {
        this._events.forEach(e => this._el.nativeElement.removeEventListener(e, this._initOnClickBody));
      }

      this._events.forEach(e => this.document.body.removeEventListener(e, this._onClickBody));
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (isPlatformBrowser(this.platformId)) {

      if (changes['attachOutsideOnClick'] || changes['exclude']) {
        this._init();
      }
    }
  }

  _init() {
    if (this.clickOutsideEvents !== '') {
      this._events = this.clickOutsideEvents.split(' ');
    }

    this._excludeCheck();

    if (this.attachOutsideOnClick) {
      this._events.forEach(e => this._el.nativeElement.addEventListener(e, this._initOnClickBody));
    } else {
      this._initOnClickBody();
    }
  }

  _initOnClickBody() {
    if (this.delayClickOutsideInit) {
      setTimeout(this._initClickListeners.bind(this));
    } else {
      this._initClickListeners();
    }
  }

  _initClickListeners() {
    this._events.forEach(e => this.document.body.addEventListener(e, this._onClickBody));
  }

  _excludeCheck() {
    if (this.exclude) {
      try {
        const nodes = Array.from(this.document.querySelectorAll(this.exclude)) as Array<HTMLElement>;
        if (nodes) {
          this._nodesExcluded = nodes;
        }
      } catch (err) {
        console.error('[pw-click-outside] Check your exclude selector syntax.', err);
      }
    }
  }

  _onClickBody(ev: Event) {
    if (this.excludeBeforeClick) {
      this._excludeCheck();
    }

    if (!this._el.nativeElement.contains(ev.target) && !this._shouldExclude(ev.target)) {
      this.pwClickOutside.emit(ev);

      if (this.attachOutsideOnClick) {
        this._events.forEach(e => this.document.body.removeEventListener(e, this._onClickBody));
      }
    }
  }

  _shouldExclude(target) {
    for (let excludedNode of this._nodesExcluded) {
      if (excludedNode.contains(target)) {
        return true;
      }
    }

    return false;
  }
}

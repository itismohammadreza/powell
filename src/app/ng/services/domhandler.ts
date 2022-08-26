import {Element} from "@angular/compiler";

export class DomHandler {
  static zindex: number = 1000;

  private static calculatedScrollbarWidth: number = null;

  private static calculatedScrollbarHeight: number = null;

  private static browser: any;

  static addClass(element: HTMLElement, className: string): void {
    if (element.classList) {
      element.classList.add(className);
    } else {
      element.className += ' ' + className;
    }
  }

  static addMultipleClasses(element: HTMLElement, className: string): void {
    if (element.classList) {
      const styles: string[] = className.trim().split(' ');
      for (let i = 0; i < styles.length; i++) {
        element.classList.add(styles[i]);
      }
    } else {
      const styles: string[] = className.split(' ');
      for (let i = 0; i < styles.length; i++) {
        element.className += ' ' + styles[i];
      }
    }
  }

  static removeClass(element: HTMLElement, className: string): void {
    if (element.classList) {
      element.classList.remove(className);
    } else {
      element.className = element.className.replace(
        new RegExp(
          '(^|\\b)' + className.split(' ').join('|') + '(\\b|$)',
          'gi'
        ), ' ');
    }
  }

  static hasClass(element: HTMLElement, className: string): boolean {
    if (element.classList) {
      return element.classList.contains(className);
    } else {
      return new RegExp('(^| )' + className + '( |$)', 'gi').test(
        element.className
      );
    }
  }

  static siblings(element: HTMLElement): any {
    return Array.prototype.filter.call(
      element.parentNode.children,
      function (child) {
        return child !== element;
      }
    );
  }

  static find(element: HTMLElement, selector: string): any[] {
    return Array.from(element.querySelectorAll(selector));
  }

  static findSingle(element: HTMLElement, selector: string): any {
    if (element) {
      return element.querySelector(selector);
    }
    return null;
  }

  static index(element: HTMLElement): number {
    const children = element.parentNode.childNodes;
    let num = 0;
    for (let i = 0; i < children.length; i++) {
      if (children[i] == element) return num;
      if (children[i].nodeType == 1) num++;
    }
    return -1;
  }

  static indexWithinGroup(element: HTMLElement, attributeName: string): number {
    const children = element.parentNode ? element.parentNode.childNodes : [];
    let num = 0;
    for (let i = 0; i < children.length; i++) {
      if (children[i] == element) return num;
      if (
        children[i].attributes &&
        children[i].attributes[attributeName] &&
        children[i].nodeType == 1
      )
        num++;
    }
    return -1;
  }

  static relativePosition(element: HTMLElement, target: HTMLElement): void {
    const elementDimensions = element.offsetParent
      ? {width: element.offsetWidth, height: element.offsetHeight}
      : this.getHiddenElementDimensions(element);
    const targetHeight = target.offsetHeight;
    const targetOffset = target.getBoundingClientRect();
    const viewport = this.getViewport();
    let top: number;
    let left: number;

    if (
      targetOffset.top + targetHeight + elementDimensions.height >
      viewport.height
    ) {
      top = -1 * elementDimensions.height;
      element.style.transformOrigin = 'bottom';
      if (targetOffset.top + top < 0) {
        top = -1 * targetOffset.top;
      }
    } else {
      top = targetHeight;
      element.style.transformOrigin = 'top';
    }

    if (elementDimensions.width > viewport.width) {
      // element wider then viewport and cannot fit on screen (align at left side of viewport)
      left = targetOffset.left * -1;
    } else if (targetOffset.left + elementDimensions.width > viewport.width) {
      // element wider then viewport but can be fit on screen (align at right side of viewport)
      left =
        (targetOffset.left + elementDimensions.width - viewport.width) * -1;
    } else {
      // element fits on screen (align with target)
      left = 0;
    }

    element.style.top = top + 'px';
    element.style.left = left + 'px';
  }

  static absolutePosition(element: HTMLElement, target: HTMLElement): void {
    const elementDimensions = element.offsetParent
      ? {width: element.offsetWidth, height: element.offsetHeight}
      : this.getHiddenElementDimensions(element);
    const elementOuterHeight = elementDimensions.height;
    const elementOuterWidth = elementDimensions.width;
    const targetOuterHeight = target.offsetHeight;
    const targetOuterWidth = target.offsetWidth;
    const targetOffset = target.getBoundingClientRect();
    const windowScrollTop = this.getWindowScrollTop();
    const windowScrollLeft = this.getWindowScrollLeft();
    const viewport = this.getViewport();
    let top;
    let left;

    if (
      targetOffset.top + targetOuterHeight + elementOuterHeight >
      viewport.height
    ) {
      top = targetOffset.top + windowScrollTop - elementOuterHeight;
      element.style.transformOrigin = 'bottom';

      if (top < 0) {
        top = windowScrollTop;
      }
    } else {
      top = targetOuterHeight + targetOffset.top + windowScrollTop;
      element.style.transformOrigin = 'top';
    }

    if (targetOffset.left + elementOuterWidth > viewport.width)
      left = Math.max(
        0,
        targetOffset.left +
        windowScrollLeft +
        targetOuterWidth -
        elementOuterWidth
      );
    else left = targetOffset.left + windowScrollLeft;

    element.style.top = top + 'px';
    element.style.left = left + 'px';
  }

  static getParents(element: any, parents: any[] = []): any {
    return element['parentNode'] === null
      ? parents
      : this.getParents(
        element.parentNode,
        parents.concat([element.parentNode])
      );
  }

  static getScrollableParents(element: HTMLElement) {
    const scrollableParents = [];

    if (element) {
      const parents = this.getParents(element);
      const overflowRegex = /(auto|scroll)/;
      const overflowCheck = (node: any) => {
        const styleDeclaration = window['getComputedStyle'](node, null);
        return (
          overflowRegex.test(styleDeclaration.getPropertyValue('overflow')) ||
          overflowRegex.test(styleDeclaration.getPropertyValue('overflowX')) ||
          overflowRegex.test(styleDeclaration.getPropertyValue('overflowY'))
        );
      };

      for (const parent of parents) {
        const scrollSelectors =
          parent.nodeType === 1 && parent.dataset['scrollselectors'];
        if (scrollSelectors) {
          const selectors = scrollSelectors.split(',');
          for (const selector of selectors) {
            const el = this.findSingle(parent, selector);
            if (el && overflowCheck(el)) {
              scrollableParents.push(el);
            }
          }
        }
      }
    }

    return scrollableParents;
  }

  static getHiddenElementOuterHeight(element: HTMLElement): number {
    element.style.visibility = 'hidden';
    element.style.display = 'block';
    const elementHeight = element.offsetHeight;
    element.style.display = 'none';
    element.style.visibility = 'visible';

    return elementHeight;
  }

  static getHiddenElementOuterWidth(element: HTMLElement): number {
    element.style.visibility = 'hidden';
    element.style.display = 'block';
    const elementWidth = element.offsetWidth;
    element.style.display = 'none';
    element.style.visibility = 'visible';

    return elementWidth;
  }

  static getHiddenElementDimensions(element: HTMLElement): any {
    const dimensions: any = {};
    element.style.visibility = 'hidden';
    element.style.display = 'block';
    dimensions.width = element.offsetWidth;
    dimensions.height = element.offsetHeight;
    element.style.display = 'none';
    element.style.visibility = 'visible';

    return dimensions;
  }

  static scrollInView(container: HTMLElement, item: HTMLElement) {
    const borderTopValue: string = getComputedStyle(container).getPropertyValue(
      'borderTopWidth'
    );
    const borderTop: number = borderTopValue ? parseFloat(borderTopValue) : 0;
    const paddingTopValue: string = getComputedStyle(container).getPropertyValue(
      'paddingTop'
    );
    const paddingTop: number = paddingTopValue ? parseFloat(paddingTopValue) : 0;
    const containerRect = container.getBoundingClientRect();
    const itemRect = item.getBoundingClientRect();
    const offset =
      itemRect.top +
      document.body.scrollTop -
      (containerRect.top + document.body.scrollTop) -
      borderTop -
      paddingTop;
    const scroll = container.scrollTop;
    const elementHeight = container.clientHeight;
    const itemHeight = this.getOuterHeight(item);

    if (offset < 0) {
      container.scrollTop = scroll + offset;
    } else if (offset + itemHeight > elementHeight) {
      container.scrollTop = scroll + offset - elementHeight + itemHeight;
    }
  }

  static fadeIn(element: any, duration: number): void {
    element.style.opacity = 0;

    let last = +new Date();
    let opacity = 0;
    const tick = function () {
      opacity =
        +element.style.opacity.replace(',', '.') +
        (new Date().getTime() - last) / duration;
      element.style.opacity = opacity;
      last = +new Date();

      if (+opacity < 1) {
        (window.requestAnimationFrame && requestAnimationFrame(tick)) ||
        setTimeout(tick, 16);
      }
    };

    tick();
  }

  static fadeOut(element: HTMLElement, ms: number) {
    let opacity = 1;
    const interval = 50;
    const gap = interval / ms;

    let fading = setInterval(() => {
      opacity = opacity - gap;

      if (opacity <= 0) {
        opacity = 0;
        clearInterval(fading);
      }

      element.style.opacity = opacity.toString();
    }, interval);
  }

  static getWindowScrollTop(): number {
    const doc = document.documentElement;
    return (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
  }

  static getWindowScrollLeft(): number {
    const doc = document.documentElement;
    return (window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0);
  }

  static matches(element, selector: string): boolean {
    const p = Element.prototype;
    const f =
      p['matches'] ||
      p['webkitMatchesSelector'] ||
      p['mozMatchesSelector'] ||
      p['msMatchesSelector'] ||
      function (s) {
        return [].indexOf.call(document.querySelectorAll(s), this) !== -1;
      };
    return f.call(element, selector);
  }

  static getOuterWidth(element: HTMLElement, margin?: boolean) {
    let width = element.offsetWidth;

    if (margin) {
      const style = getComputedStyle(element);
      width += parseFloat(style.marginLeft) + parseFloat(style.marginRight);
    }

    return width;
  }

  static getHorizontalPadding(element: HTMLElement) {
    const style = getComputedStyle(element);
    return parseFloat(style.paddingLeft) + parseFloat(style.paddingRight);
  }

  static getHorizontalMargin(element: HTMLElement) {
    const style = getComputedStyle(element);
    return parseFloat(style.marginLeft) + parseFloat(style.marginRight);
  }

  static innerWidth(element: HTMLElement) {
    let width = element.offsetWidth;
    const style = getComputedStyle(element);

    width += parseFloat(style.paddingLeft) + parseFloat(style.paddingRight);
    return width;
  }

  static width(element: HTMLElement) {
    let width = element.offsetWidth;
    const style = getComputedStyle(element);

    width -= parseFloat(style.paddingLeft) + parseFloat(style.paddingRight);
    return width;
  }

  static getInnerHeight(element: HTMLElement) {
    let height = element.offsetHeight;
    const style = getComputedStyle(element);

    height += parseFloat(style.paddingTop) + parseFloat(style.paddingBottom);
    return height;
  }

  static getOuterHeight(element, margin?: boolean) {
    let height = element.offsetHeight;

    if (margin) {
      const style = getComputedStyle(element);
      height += parseFloat(style.marginTop) + parseFloat(style.marginBottom);
    }

    return height;
  }

  static getHeight(element: HTMLElement): number {
    let height = element.offsetHeight;
    const style = getComputedStyle(element);

    height -=
      parseFloat(style.paddingTop) +
      parseFloat(style.paddingBottom) +
      parseFloat(style.borderTopWidth) +
      parseFloat(style.borderBottomWidth);

    return height;
  }

  static getWidth(element: HTMLElement): number {
    let width = element.offsetWidth;
    const style = getComputedStyle(element);

    width -=
      parseFloat(style.paddingLeft) +
      parseFloat(style.paddingRight) +
      parseFloat(style.borderLeftWidth) +
      parseFloat(style.borderRightWidth);

    return width;
  }

  static getViewport(): any {
    const win = window;
    const d = document;
    const e = d.documentElement;
    const g = d.getElementsByTagName('body')[0];
    const w = win.innerWidth || e.clientWidth || g.clientWidth;
    const h = win.innerHeight || e.clientHeight || g.clientHeight;

    return {width: w, height: h};
  }

  static getOffset(element: HTMLElement) {
    const rect = element.getBoundingClientRect();

    return {
      top:
        rect.top +
        (window.pageYOffset ||
          document.documentElement.scrollTop ||
          document.body.scrollTop ||
          0),
      left:
        rect.left +
        (window.pageXOffset ||
          document.documentElement.scrollLeft ||
          document.body.scrollLeft ||
          0),
    };
  }

  static replaceElementWith(element: HTMLElement, replacementElement: HTMLElement): any {
    const parentNode = element.parentNode;
    if (!parentNode) {
      throw `Can't replace element`;
    }
    return parentNode.replaceChild(replacementElement, element);
  }

  static getUserAgent(): string {
    return navigator.userAgent;
  }

  static isIE() {
    const ua = window.navigator.userAgent;

    const msie = ua.indexOf('MSIE ');
    if (msie > 0) {
      // IE 10 or older => return version number
      return true;
    }

    const trident = ua.indexOf('Trident/');
    if (trident > 0) {
      // IE 11 => return version number
      const rv = ua.indexOf('rv:');
      return true;
    }

    const edge = ua.indexOf('Edge/');
    if (edge > 0) {
      // Edge (IE 12+) => return version number
      return true;
    }

    // other browser
    return false;
  }

  static isIOS() {
    return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window['MSStream'];
  }

  static isAndroid() {
    return /(android)/i.test(navigator.userAgent);
  }

  static appendChild(element: HTMLElement, target: any) {
    if (this.isElement(target)) {
      target.appendChild(element);
    } else if (target.el && target.el.nativeElement) {
      target.el.nativeElement.appendChild(element);
    } else {
      throw 'Cannot append ' + target + ' to ' + element;
    }
  }

  static removeChild(element: HTMLElement, target: any) {
    if (this.isElement(target)) {
      target.removeChild(element);
    } else if (target.el && target.el.nativeElement) {
      target.el.nativeElement.removeChild(element);
    } else {
      throw 'Cannot remove ' + element + ' from ' + target;
    }
  }

  static removeElement(element: HTMLElement) {
    if (!('remove' in Element.prototype)) {
      element.parentNode.removeChild(element);
    } else {
      element.remove();
    }
  }

  static isElement(element: HTMLElement) {
    return typeof HTMLElement === 'object'
      ? element instanceof HTMLElement
      : element &&
      typeof element === 'object' &&
      element !== null &&
      element.nodeType === 1 &&
      typeof element.nodeName === 'string';
  }

  static calculateScrollbarWidth(element?: HTMLElement): number {
    if (element) {
      const style = getComputedStyle(element);
      return (
        element.offsetWidth -
        element.clientWidth -
        parseFloat(style.borderLeftWidth) -
        parseFloat(style.borderRightWidth)
      );
    } else {
      if (this.calculatedScrollbarWidth !== null) {
        return this.calculatedScrollbarWidth;
      }

      const scrollDiv = document.createElement('div');
      scrollDiv.className = 'p-scrollbar-measure';
      document.body.appendChild(scrollDiv);

      const scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
      document.body.removeChild(scrollDiv);

      this.calculatedScrollbarWidth = scrollbarWidth;

      return scrollbarWidth;
    }
  }

  static calculateScrollbarHeight(): number {
    if (this.calculatedScrollbarHeight !== null) {
      return this.calculatedScrollbarHeight;
    }

    const scrollDiv = document.createElement('div');
    scrollDiv.className = 'p-scrollbar-measure';
    document.body.appendChild(scrollDiv);

    const scrollbarHeight = scrollDiv.offsetHeight - scrollDiv.clientHeight;
    document.body.removeChild(scrollDiv);

    this.calculatedScrollbarWidth = scrollbarHeight;

    return scrollbarHeight;
  }

  static invokeElementMethod(
    element: HTMLElement,
    methodName: string,
    args?: any[]
  ): void {
    (element as any)[methodName].apply(element, args);
  }

  static clearSelection(): void {
    if (window.getSelection) {
      if (window.getSelection().empty) {
        window.getSelection().empty();
      } else if (
        window.getSelection().removeAllRanges &&
        window.getSelection().rangeCount > 0 &&
        window.getSelection().getRangeAt(0).getClientRects().length > 0
      ) {
        window.getSelection().removeAllRanges();
      }
    } else if (document['selection'] && document['selection'].empty) {
      try {
        document['selection'].empty();
      } catch (error) {
        //ignore IE bug
      }
    }
  }

  static getBrowser() {
    if (!this.browser) {
      const matched = this.resolveUserAgent();
      this.browser = {};

      if (matched.browser) {
        this.browser[matched.browser] = true;
        this.browser['version'] = matched.version;
      }

      if (this.browser['chrome']) {
        this.browser['webkit'] = true;
      } else if (this.browser['webkit']) {
        this.browser['safari'] = true;
      }
    }

    return this.browser;
  }

  static resolveUserAgent() {
    const ua = navigator.userAgent.toLowerCase();
    const match =
      /(chrome)[ \/]([\w.]+)/.exec(ua) ||
      /(webkit)[ \/]([\w.]+)/.exec(ua) ||
      /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(ua) ||
      /(msie) ([\w.]+)/.exec(ua) ||
      (ua.indexOf('compatible') < 0 &&
        /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(ua)) ||
      [];

    return {
      browser: match[1] || '',
      version: match[2] || '0',
    };
  }

  static isInteger(value: any): boolean {
    if (Number.isInteger) {
      return Number.isInteger(value);
    } else {
      return (
        typeof value === 'number' &&
        isFinite(value) &&
        Math.floor(value) === value
      );
    }
  }

  static isHidden(element: HTMLElement): boolean {
    return element.offsetParent === null;
  }

  static getFocusableElements(element: HTMLElement) {
    const focusableElements = DomHandler.find(
      element,
      `button:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden]),
                [href][clientHeight][clientWidth]:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden]),
                input:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden]), select:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden]),
                textarea:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden]), [tabIndex]:not([tabIndex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden]),
                [contenteditable]:not([tabIndex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])`
    );

    const visibleFocusableElements = [];
    for (const focusableElement of focusableElements) {
      if (
        getComputedStyle(focusableElement).display != 'none' &&
        getComputedStyle(focusableElement).visibility != 'hidden'
      ) {
        visibleFocusableElements.push(focusableElement);
      }
    }
    return visibleFocusableElements;
  }

  static generateZIndex() {
    this.zindex = this.zindex || 999;
    return ++this.zindex;
  }
}

import {Injectable, OnDestroy} from "@angular/core";
import {fromEvent} from "rxjs";

@Injectable({providedIn: 'root'})
export class ScrollService {
  fullNameRe = /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i;
  prefixRe = /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i;
  fullNameMobileRe = /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i;
  prefixMobileRe = /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i;
  aosElements = [];
  initialized = false;
  options = {
    offset: 120,
    delay: 0,
    easing: 'ease',
    duration: 400,
    disable: false,
    once: false,
    startEvent: 'DOMContentLoaded',
    throttleDelay: 99,
    debounceDelay: 50,
    disableMutationObserver: false,
  };
  callback = () => {
  };

  ua() {
    return navigator.userAgent || navigator.vendor || '';
  }

  phone() {
    const a = this.ua();
    return !!(this.fullNameRe.test(a) || this.prefixRe.test(a.substr(0, 4)));
  }

  mobile() {
    const a = this.ua();
    return !!(this.fullNameMobileRe.test(a) || this.prefixMobileRe.test(a.substr(0, 4)));
  }

  tablet() {
    return this.mobile() && !this.phone();
  }

  offset(el) {
    let _x = 0;
    let _y = 0;

    while (el && !isNaN(el.offsetLeft) && !isNaN(el.offsetTop)) {
      _x += el.offsetLeft - (el.tagName != 'BODY' ? el.scrollLeft : 0);
      _y += el.offsetTop - (el.tagName != 'BODY' ? el.scrollTop : 0);
      el = el.offsetParent;
    }

    return {
      top: _y,
      left: _x
    };
  };

  calculateOffset(el, optionalOffset) {
    let elementOffsetTop = 0;
    let additionalOffset = 0;
    const windowHeight = window.innerHeight;
    const attrs = {
      offset: el.getAttribute('data-aos-offset'),
      anchor: el.getAttribute('data-aos-anchor'),
      anchorPlacement: el.getAttribute('data-aos-anchor-placement')
    };

    if (attrs.offset && !isNaN(attrs.offset)) {
      additionalOffset = parseInt(attrs.offset);
    }

    if (attrs.anchor && document.querySelectorAll(attrs.anchor)) {
      el = document.querySelectorAll(attrs.anchor)[0];
    }

    elementOffsetTop = this.offset(el).top;

    switch (attrs.anchorPlacement) {
      case 'top-bottom':
        break;
      case 'center-bottom':
        elementOffsetTop += el.offsetHeight / 2;
        break;
      case 'bottom-bottom':
        elementOffsetTop += el.offsetHeight;
        break;
      case 'top-center':
        elementOffsetTop += windowHeight / 2;
        break;
      case 'bottom-center':
        elementOffsetTop += windowHeight / 2 + el.offsetHeight;
        break;
      case 'center-center':
        elementOffsetTop += windowHeight / 2 + el.offsetHeight / 2;
        break;
      case 'top-top':
        elementOffsetTop += windowHeight;
        break;
      case 'bottom-top':
        elementOffsetTop += el.offsetHeight + windowHeight;
        break;
      case 'center-top':
        elementOffsetTop += el.offsetHeight / 2 + windowHeight;
        break;
    }
    if (!attrs.anchorPlacement && !attrs.offset && !isNaN(optionalOffset)) {
      additionalOffset = optionalOffset;
    }
    return elementOffsetTop + additionalOffset;
  }

  createArrayWithElements(elements = null) {
    elements = elements || document.querySelectorAll('[data-aos]');
    return Array.prototype.map.call(elements, node => ({node}));
  }

  setState(el, top, once) {
    const attrOnce = el.node.getAttribute('data-aos-once');

    if (top > el.position) {
      el.node.classList.add('aos-animate');
    } else if (typeof attrOnce !== 'undefined') {
      if (attrOnce === 'false' || (!once && attrOnce !== 'true')) {
        el.node.classList.remove('aos-animate');
      }
    }
  }

  handleScroll(elements, once) {
    const scrollTop = window.pageYOffset;
    const windowHeight = window.innerHeight;
    elements.forEach((el, i) => {
      this.setState(el, windowHeight + scrollTop, once);
    });
  }

  prepare(elements, options) {
    elements.forEach((el, i) => {
      el.node.classList.add('aos-init');
      el.position = this.calculateOffset(el.node, options.offset);
    });
    return elements;
  }

  ready(selector, fn) {
    const doc = window.document;
    const MutationObserver =
      window.MutationObserver ||
      (window as any).WebKitMutationObserver ||
      (window as any).MozMutationObserver;

    const observer = new MutationObserver(this.check);
    this.callback = fn;

    observer.observe(doc.documentElement, {
      childList: true,
      subtree: true,
      removedNodes: true
    });
  }

  check(mutations) {
    if (!mutations) return;

    mutations.forEach(mutation => {
      const addedNodes = Array.prototype.slice.call(mutation.addedNodes);
      const removedNodes = Array.prototype.slice.call(mutation.removedNodes);

      const anyAOSElementAdded = addedNodes
        .concat(removedNodes)
        .filter(el => el.hasAttribute && el.hasAttribute('data-aos'))
        .length;

      if (anyAOSElementAdded) {
        this.callback();
      }
    });
  }

  throttle(func, timeFrame) {
    let lastTime = 0;
    return (...args) => {
      let now = new Date().valueOf();
      if (now - lastTime >= timeFrame) {
        func(...args);
        lastTime = now;
      }
    };
  }

  debounce(func, wait, immediate) {
    let timeout;
    return () => {
      let context = this, args = arguments;
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        timeout = null;
        if (!immediate) func.apply(context, args);
      }, wait);
      if (immediate && !timeout) func.apply(context, args);
    };
  }

  refresh(initialize = false) {
    if (initialize) this.initialized = true;
    if (this.initialized) {
      this.aosElements = this.prepare(this.aosElements, this.options);
      this.handleScroll(this.aosElements, this.options.once);
      return this.aosElements;
    }
  }

  refreshHard() {
    this.aosElements = this.createArrayWithElements();
    this.refresh();
  }

  disable() {
    this.aosElements.forEach((el, i) => {
      el.node.removeAttribute('data-aos');
      el.node.removeAttribute('data-aos-easing');
      el.node.removeAttribute('data-aos-duration');
      el.node.removeAttribute('data-aos-delay');
    });
  }

  isDisabled(optionDisable) {
    return optionDisable === true ||
      (optionDisable === 'mobile' && this.mobile()) ||
      (optionDisable === 'phone' && this.phone()) ||
      (optionDisable === 'tablet' && this.tablet()) ||
      (typeof optionDisable === 'function' && optionDisable() === true);
  }

  init(settings) {
    this.options = Object.assign(this.options, settings);
    this.aosElements = this.createArrayWithElements();
    const browserNotSupported = document.all && !window.atob;

    if (this.isDisabled(this.options.disable) || browserNotSupported) {
      return this.disable();
    }

    document.querySelector('body').setAttribute('data-aos-easing', this.options.easing);
    document.querySelector('body').setAttribute('data-aos-duration', this.options.duration.toString());
    document.querySelector('body').setAttribute('data-aos-delay', this.options.delay.toString());

    if (this.options.startEvent === 'DOMContentLoaded' &&
      ['complete', 'interactive'].indexOf(document.readyState) > -1) {
      this.refresh(true);
    } else if (this.options.startEvent === 'load') {
      window.addEventListener(this.options.startEvent, () => {
        this.refresh(true);
      });
    } else {
      document.addEventListener(this.options.startEvent, () => {
        this.refresh(true);
      });
    }

    window.addEventListener('resize', this.debounce(this.refresh, this.options.debounceDelay, true));
    window.addEventListener('orientationchange', this.debounce(this.refresh, this.options.debounceDelay, true));
    window.addEventListener('scroll', this.throttle(() => {
      this.handleScroll(this.aosElements, this.options.once);
    }, this.options.throttleDelay));

    if (!this.options.disableMutationObserver) {
      this.ready('[data-aos]', this.refreshHard);
    }
  }
}

// export class ScrollService {
//   scrollObs: Observable<any>;
//   resizeObs: Observable<any>;
//   pos: number;
//
//   constructor() {
//     this.manageScrollPos();
//     this.scrollObs = typeof window !== "undefined" ? fromEvent(window, "scroll") : EMPTY;
//     this.scrollObs.subscribe(() => this.manageScrollPos());
//     this.resizeObs = typeof window !== "undefined" ? fromEvent(window, "resize") : EMPTY;
//     this.resizeObs.subscribe(() => this.manageScrollPos());
//   }
//
//   private manageScrollPos(): void {
//     this.pos = typeof window !== "undefined" ? window.pageYOffset : 0;
//   }
// }

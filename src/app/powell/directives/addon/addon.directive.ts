import {Directive, ElementRef, Input, OnChanges, Renderer2, SimpleChanges} from '@angular/core';
import {NgAddon, NgAddonConfig, NgSize} from '@powell/models';

@Directive({
  selector: '[ngAddon]'
})
export class AddonDirective implements OnChanges {
  @Input() ngAddon: NgAddon;
  @Input() addonDisabled: boolean;
  @Input() addonSize: NgSize = 'md';

  constructor(private renderer: Renderer2,
              private el: ElementRef) {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.destroy();
    for (const side in this.ngAddon) {
      const config = this.ngAddon[side] as NgAddonConfig;
      switch (config.type) {
        case 'button':
          this.applyButton(config, side);
          break;
        case 'icon':
          this.applyIcon(config, side);
          break;
        case 'text':
          this.applyText(config, side);
          break;
      }
    }
  }

  applyButton(config: NgAddonConfig, side: string) {
    const _btnColor = config.color;
    const _btnAppearance = config.appearance;
    const _btnIcon = config.icon;
    const _btnLabel = config.label;
    const _btnIconPos = config.iconPos || 'left';
    const BTN = this.renderer.createElement('button') as HTMLButtonElement;
    this.renderer.setAttribute(BTN, 'type', 'button');
    this.renderer.addClass(BTN, 'p-button');
    this.renderer.addClass(BTN, 'p-component');
    this.renderer.addClass(BTN, `p-button-${_btnColor}`);
    this.renderer.addClass(BTN, `p-button-${_btnAppearance}`);
    this.renderer.addClass(BTN, `p-button-${this.addonSize}`);
    this.renderer.setStyle(BTN, 'white-space', 'nowrap');
    if (_btnLabel) {
      const BTN_TEXT_SPAN = this.renderer.createElement('span') as HTMLSpanElement;
      const BTN_TEXT = this.renderer.createText(config.label) as HTMLElement;
      this.renderer.addClass(BTN_TEXT_SPAN, 'p-button-label');
      this.renderer.appendChild(BTN_TEXT_SPAN, BTN_TEXT || 'p-btn');
      this.renderer.appendChild(BTN, BTN_TEXT_SPAN);
    }
    if (_btnIcon) {
      const BTN_ICON_SPAN = this.renderer.createElement('span') as HTMLSpanElement;
      this.renderer.appendChild(BTN, BTN_ICON_SPAN);
      this.setIconClasses(BTN_ICON_SPAN, _btnIcon);
      this.renderer.addClass(BTN_ICON_SPAN, 'p-button-icon');
      if (_btnLabel) {
        // has icon & text
        this.renderer.addClass(
          BTN_ICON_SPAN,
          `p-button-icon-${_btnIconPos}`
        );
        if (_btnIconPos == 'right') {
          this.renderer.setStyle(BTN_ICON_SPAN, 'order', 1);
        }
      } else {
        // has icon only
        this.renderer.addClass(BTN, 'p-button-icon-only');
      }
    }
    this.addToDOM(BTN, side);
    this.renderer.listen(BTN, 'click', (event) => {
      config.onClick?.(event)
    });
  }

  applyIcon(config: NgAddonConfig, side: string) {
    const ICON = this.renderer.createElement('i') as HTMLElement;
    const ICON_SPAN = this.renderer.createElement('span');
    const _icon = config.icon;
    this.setIconClasses(ICON, _icon);
    this.renderer.addClass(ICON_SPAN, 'p-inputgroup-addon');
    this.renderer.appendChild(ICON_SPAN, ICON);
    this.renderer.listen(ICON_SPAN, 'click', (event) => {
      config.onClick?.(event)
    });
    this.addToDOM(ICON_SPAN, side);
  }

  applyText(config: NgAddonConfig, side: string) {
    const TEXT = this.renderer.createText(config.text || null);
    const TEXT_SPAN = this.renderer.createElement('span');
    this.renderer.addClass(TEXT_SPAN, 'p-inputgroup-addon');
    this.renderer.appendChild(TEXT_SPAN, TEXT);
    this.renderer.listen(TEXT_SPAN, 'click', (event) => {
      config.onClick?.(event)
    });
    this.addToDOM(TEXT_SPAN, side);
  }

  setIconClasses(el: HTMLElement, iconClass: string) {
    iconClass.split(' ').forEach(className => {
      this.renderer.addClass(el, className);
    });
  }

  destroy() {
    let target = this.el.nativeElement;
    let targetClasses = target.classList;
    if (!targetClasses.contains('has-before') && !targetClasses.contains('has-after')) {
      return;
    }
    if (target.parentNode.classList.contains('p-float-label')) {
      target = target.parentNode;
    }
    this.renderer.removeClass(target.parentNode, 'p-inputgroup');
    this.renderer.removeClass(this.el.nativeElement, `has-before`);
    this.renderer.removeClass(this.el.nativeElement, `has-after`);
    target.parentNode.querySelector(`.addon-before`)?.remove();
    target.parentNode.querySelector(`.addon-after`)?.remove();
  }

  addToDOM(addonEl: any, pos: string) {
    const targetEl = this.el.nativeElement;
    this.renderer.addClass(targetEl, 'p-inputgroup');
    const fieldEl = targetEl.parentNode.querySelector('.p-inputgroup > div');
    this.renderer.addClass(addonEl, `addon-${pos}`);
    this.renderer.addClass(this.el.nativeElement, `has-${pos}`);
    if (this.addonDisabled) {
      this.renderer.addClass(addonEl, `p-disabled`);
    }
    if (pos === 'after') {
      this.renderer.appendChild(targetEl, addonEl);
    } else if (pos === 'before') {
      this.renderer.insertBefore(targetEl, addonEl, fieldEl)
    }
    setTimeout(() => {
      const floatLabelWrapper = targetEl.querySelector('.p-float-label');
      if (floatLabelWrapper) {
        floatLabelWrapper.style.width = 'auto';
      }
    })
  }
}

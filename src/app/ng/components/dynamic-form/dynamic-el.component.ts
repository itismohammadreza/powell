import {
  Component,
  ComponentFactoryResolver,
  forwardRef,
  Host,
  Input,
  OnInit,
  Optional,
  SkipSelf,
  ViewContainerRef
} from '@angular/core';
import {InputTextComponent} from '@ng/components/input-text/input-text.component';
import {InputNumberComponent} from '@ng/components/input-number/input-number.component';
import {ControlContainer, ControlValueAccessor, NG_VALUE_ACCESSOR, NgControl} from '@angular/forms';

@Component({
  selector: 'ng-dynamic-el',
  template: ``,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DynamicElComponent),
      multi: true
    }
  ]
})
export class DynamicElComponent implements OnInit, ControlValueAccessor {

  @Input() config;
  elements = {
    text: InputTextComponent,
    number: InputNumberComponent
  };

  constructor(
    @Optional() @Host() @SkipSelf() private parent: ControlContainer,
    private ngControl: NgControl,
    private resolver: ComponentFactoryResolver,
    private vcRef: ViewContainerRef
  ) {
  }

  ngOnInit() {
    const factory = this.resolver.resolveComponentFactory<any>(this.elements[this.config.type]);
    const cmpRef = this.vcRef.createComponent(factory);
    cmpRef.instance.ngControl = this.ngControl;
    this.ngControl.valueAccessor = cmpRef.instance;
    cmpRef.instance.errors = {required: 'req'};
  }

  registerOnChange(fn: any): void {
  }

  registerOnTouched(fn: any): void {
  }

  writeValue(obj: any): void {
  }
}
